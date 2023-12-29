---
title: Concurrency and Parallelism in Rust.
published_at: 2023-12-28T19:00:00.000Z
snippet: "In a nutshell."
---

![Concurrency](../blog-images/concurrency.webp)

# Concurrency And Parallelism in Rust 🦀
Wow. You clicked it. You're in for a bit of fun, meanwhile I try to explain why Rust just kicks butt. But first some basics. 

## Concurrency != Parallelism
Devs, let's get real. Understanding the distinction between concurrency and parallelism is crucial. 

**Concurrency** in Rust can be likened to a single chef who multitasks in the kitchen, efficiently juggling different cooking activities like chopping, boiling, and frying to manage multiple recipes simultaneously. 

**Parallelism**, in contrast, resembles having several chefs, each dedicated to preparing their own dish concurrently, thus significantly accelerating the overall meal preparation.

For a deeper understanding of these concepts, I recommend reading [Iveta Vistorskyte's blog post](https://oxylabs.io/blog/concurrency-vs-parallelism) blog post on OxyLabs.

Why are these concepts important? Modern CPUs come with multiple cores, and by effectively utilizing these cores, we can significantly enhance the performance and speed of our applications. 


## Implementing Concurrency
### Threads
Rust creates and manages threads safely, leveraging the ownership and type system to prevent data races.

```rust
use std::thread;
use std::time::Duration;

fn main() {
    // Create a vector to hold our threads
    let mut threads = vec![];

    for i in 0..5 {
        // Spawn a new thread
        let handle = thread::spawn(move || {
            // Simulate some work in the thread
            println!("Thread number {} is running", i);
            thread::sleep(Duration::from_millis(1000));
            println!("Thread number {} has finished running", i);
        });

        // Add the thread handle to our vector
        threads.push(handle);
    }

    // Wait for all threads to complete
    for handle in threads {
        handle.join().unwrap();
    }

    println!("All threads have finished executing");
}
 ```
[Playground example](https://play.rust-lang.org/?version=stable&mode=debug&edition=2021&gist=20c3656cece53801732b6d3756a14c13)

In this example, we spawn five threads to perform tasks simultaneously, and then wait for all of them to complete, showcasing Rust's safe and efficient thread management.
### Shared State
Mutexes and atomic types in Rust help manage shared state between threads.

```rust
use std::sync::{Arc, Mutex};
use std::thread;

fn main() {
    // Shared counter between threads, wrapped in a Mutex and Arc for safe concurrent access
    let counter = Arc::new(Mutex::new(0));

    let mut handles = vec![];

    for _ in 0..10 {
        // Clone the Arc to get a new reference for the new thread
        let counter_clone = Arc::clone(&counter);

        // Spawn a new thread
        let handle = thread::spawn(move || {
            // Lock the Mutex to get access to the data
            let mut num = counter_clone.lock().unwrap();

            // Modify the data
            *num += 1;
        });

        handles.push(handle);
    }

    // Wait for all threads to complete
    for handle in handles {
        handle.join().unwrap();
    }

    // Print the result
    println!("Result: {}", *counter.lock().unwrap());
}
```
[Playground example](https://play.rust-lang.org/?version=stable&mode=debug&edition=2021&gist=f1c4e03af72a302c2463e8a66deac66c)

Alright. Bear with me, I don't want to scare you - but I need to tell you about [Mutex](https://doc.rust-lang.org/std/sync/struct.Mutex.html) and [Arc](https://doc.rust-lang.org/std/sync/struct.Arc.html).

Managing shared state across multiple threads in a safe and efficient manner is achieved using Mutex (mutual exclusion) and Arc (atomic reference count). You still here? Good. 

A **Mutex** is like a lock for data. It ensures that only one thread can access the protected data at any given time. When a thread wants to use the data, it must "lock" the Mutex. If the Mutex is already locked by another thread, it will have to wait. After the thread is done, it "unlocks" the Mutex, allowing others to use the data.

Rust's strict ownership rules mean a simple Mutex isn't enough for sharing across threads. Here, **Arc** helps. It's a smart pointer that allows multiple threads to own a piece of data. Arc keeps track of how many references exist to this data and makes sure it's only deleted when no references are left.


### Message Passing
```rust
use std::sync::mpsc; // Importing the multi-producer, single-consumer library
use std::thread;

fn main() {
    // Create a channel
    let (tx, rx) = mpsc::channel();

    // Spawn a new thread and move the transmitter into it
    thread::spawn(move || {
        let message = "Hello from the thread!";
        // Send a message through the channel
        tx.send(message).unwrap();
        println!("Sent message: {}", message);
    });

    // Receive the message in the main thread
    let received = rx.recv().unwrap();
    println!("Received message: {}", received);
}
```
[Playground example](https://play.rust-lang.org/?version=stable&mode=debug&edition=2021&gist=63476732a84ee6c9f96ceba666ce4fd7)

Channels allow different parts of a program to send and receive messages, ensuring safe data transfer between threads. 

A channel consists of two parts: a **transmitter** and a **receiver**. The transmitter (tx) is used to send messages, and the receiver (rx) is used to receive them. In practice, a thread can send a message through the channel using the transmitter, and this message can be received by another thread, typically the main thread, using the receiver. 

This mechanism is particularly effective in Rust due to its strong focus on safety and its ability to prevent data races, ensuring that messages are transferred reliably and efficiently between threads.

## Implementing Parallelism
Rust's approach to parallelism, especially with the aid of third-party libraries like Rayon, allows for efficient and concurrent processing of tasks and data. So grab this into your `Cargo.toml` now:

```rust
[dependencies]
rayon = "1.8"
```

Rayon simplifies parallel computing by automatically managing threads and dividing workloads. It enables tasks to run simultaneously, rather than sequentially, resulting in significant performance improvements. 

This is particularly effective for operations on large datasets or complex computations (looking at you, compilers 👀).

Here's a very basic implementation of how to use Rayon to create parallelism:

```rust
use rayon::prelude::*;

fn main() {
    let data = vec![1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    // Parallel iteration over the data
    data.par_iter().for_each(|&num| {
        println!("Processing number: {}", num);
        // Simulate some work
        std::thread::sleep(std::time::Duration::from_millis(100));
    });

    println!("All numbers processed in parallel");
}
```
[Playground example](https://play.rust-lang.org/?version=stable&mode=debug&edition=2021&gist=49f2d3b2c90fecde23d94ab5e249fb90)
## Are you still here?
Kudos for sticking with me through this deep dive into Rust's world of concurrency and parallelism (You get a gold star for your hard work today 🌟). 


It might have felt a bit dry and heavy on theory, but trust me, it's incredibly important. In an era where efficient data processing is key, understanding these concepts is a game changer. 
Understanding and mastering these terms will bring you and your team further then any almost any other optimization you can do.

## Still hungry for more?
The Rust Programming Language book will help you further along. I suggest looking over [Ownership](https://doc.rust-lang.org/book/ch04-01-what-is-ownership.html), [Arc](https://doc.rust-lang.org/std/sync/struct.Arc.html), [Mutex](https://doc.rust-lang.org/std/sync/struct.Mutex.html), [Channel](https://doc.rust-lang.org/std/sync/mpsc/fn.channel.html) & [Rayon](https://docs.rs/rayon/latest/rayon/) at your own pace.




_____
**Editors notes:** 

Thanks Jimmy for the idea of adding the examples to the rust playground. 