---
title: "Make Illegal States Unrepresentable (Or: Stop Letting Your Types Lie To You)"
published_at: 2026-09-21T10:00:00.000Z
snippet: "Your isLoading/isError/data triangle of lies, and the enum that ends it."
---

# Make Illegal States Unrepresentable

Let's play a little game. I'll show you a type, you tell me which of its states should never happen. Ready?

```typescript
interface RequestState {
  isLoading: boolean;
  isError: boolean;
  error?: string;
  data?: User;
}
```

Take your time. There's no rush, because the type system certainly isn't going to help you here. You're on your own, champ.

`isLoading: true, isError: true`? Sure, why not. `isLoading: true` with `data` already populated from the last successful fetch that nobody bothered to clear? Also legal. `isError: false` but `error` is set to `"Network timeout"` because someone forgot to unset it on retry? The compiler will shake your hand and wish you a pleasant afternoon.

Four boolean-ish fields, sixteen possible combinations, and roughly three of them are things that should actually occur in your running program. The other thirteen are just sitting there, loaded, waiting for a Tuesday.

## The comment-driven type system

Every codebase with a struct like this has a comment somewhere near it. You know the one:

```typescript
// Invariant: only one of isLoading, isError, or data should be set at a time.
```

This is what I like to call the comment-driven type system. It's a type system with a 100% compliance rate, right up until the first time someone under a deadline sets `isLoading = false` in a `finally` block and forgets that `isError` also needed to flip. Now you've got a spinner and an error banner sharing the screen, and the postmortem starts with "well, that shouldn't have been possible."

It shouldn't have been. And yet.

## The phrase, for the record

"Make illegal states unrepresentable" isn't mine. It's usually credited to Yaron Minsky, from his time evangelizing OCaml at Jane Street, and it's become something of a rallying cry in the Rust world because Rust's `enum` is unusually good at it. The idea is blunt: instead of writing an invariant down in a comment and hoping everyone reads it, you structure your types so the invalid combination physically cannot be constructed. Not "shouldn't be constructed." Cannot.

## The Rust version

```rust
enum RequestState<T> {
    Idle,
    Loading,
    Success(T),
    Error(String),
}
```

That's it. That's the whole fix. One value, one variant, one meaning. There is no field for "error message when not errored," because there is no field at all when you're not in the `Error` variant. The data literally does not exist in memory for that case. You cannot forget to clear `data` on error, because `Error(String)` doesn't have a `data` slot to forget.

Using it forces the issue too:

```rust
fn render(state: &RequestState<User>) -> String {
    match state {
        RequestState::Idle => "Waiting to fetch.".into(),
        RequestState::Loading => "Loading...".into(),
        RequestState::Success(user) => format!("Hello, {}!", user.name),
        RequestState::Error(msg) => format!("Something broke: {msg}"),
    }
}
```

Delete the `Error` arm and try to compile that. Go on. The compiler will stop you at the door, list the exact variant you forgot, and decline to produce a binary until you deal with it:

```
error[E0004]: non-exhaustive patterns: `RequestState::Error(_)` not covered
```

Compare that to the TypeScript version, where forgetting to handle the error case just means your UI quietly renders nothing and someone opens a support ticket in three weeks. One of these failure modes happens in your editor at 2pm. The other happens in production at 2am, to your on-call, who did not write this code and does not love you right now.

Yes, you can escape this with a `_ => {}` wildcard arm that swallows whatever you didn't feel like thinking about. I'm not going to pretend that button doesn't exist. I am going to judge you for pressing it. It's the "I turned off the smoke detector because it kept beeping" of pattern matching.

## It's not just about loading spinners

The same trick works anywhere you're currently expressing "this field only means something sometimes" through convention instead of structure. A classic:

```rust
struct UserId(u64);
struct OrderId(u64);

fn get_order(id: OrderId) -> Order { /* ... */ }
```

versus every function in your codebase happily accepting a raw `number` or `string` for every kind of ID you have, which means nothing stops you from passing a user's ID into `get_order` and getting back either a confusing 404 or, on a sufficiently unlucky day, somebody else's order. The compiler doesn't know a `UserId` and an `OrderId` are "both just numbers really," and that's the entire point. You're not adding type safety for the computer's benefit. The computer doesn't care. You're adding it so that six months from now, tired-you, mid-incident, can't make this particular mistake even if you try.

`Option<T>` is the same idea applied to null. Instead of every reference being secretly nullable and every function call being a tiny game of "will this NullPointerException happen today," the absence of a value is a real, distinct, compiler-tracked state (`None`) that you have to explicitly unwrap or handle. You can still write `.unwrap()` and blow up at runtime if you really want the NPE experience back. Rust just makes you type out the part where you chose that, instead of getting it for free by default.

## In a nutshell

None of this makes bugs disappear. What it does is relocate them, out of "will happen in production, discovered by a customer, diagnosed at 3am" and into "will happen at compile time, discovered by you, thirty seconds after you wrote it, with a message that tells you exactly which case you forgot." That is a strictly better place for a bug to live.

The next time you write a struct with three optional fields and a comment promising they'll behave, ask yourself what an `enum` would look like instead. Your on-call self will thank you. Grudgingly. At 2am. Assuming there's nothing left to page them about, because you made the impossible states impossible.

Signing out!

Paul
