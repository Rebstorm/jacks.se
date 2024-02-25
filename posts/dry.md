---
title: Don't repeat yourself.
published_at: 2024-02-25T16:00:00.000Z
snippet: "Escape the copy-paste trap. Learn how to be DRY — because the only thing cornier than using 'DRY' as a pun is not using it in your code."
---

![That's me in the corner, losing my religion](../blog-images/dry.webp)

_"Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live. - [John F. Woods](https://groups.google.com/g/comp.lang.c++/c/rYCO5yn4lXw/m/oITtSkZOtoUJ)"_

# What is DRY

_Picture this_: You're on your third cup of coffee, and you start noticing patterns in the code you're trying to debug. 
Everywhere you look, the same lines of code stare back at you, duplicated all over the place, mocking your caffeine-fueled diligence. You're living in a copy-paste nightmare, a Groundhog Day of code, repeating the same mistakes in a loop.


This copy-paste nightmare, while seemingly harmless at first glance, is actually a ticking time bomb in your codebase. 
Each duplicate line of code not only adds to the clutter but also multiplies the potential for bugs and errors. 
It's like having too many cooks in the kitchen—except every cook is making the same dish, slightly differently. 
When one recipe changes, you have to find and update **every single copy** 😱. It's inefficient, prone to mistakes, and, frankly, a recipe for disaster.

This is where the "Don't Repeat Yourself" (DRY) principle comes to the rescue. 
Imagine replacing all those duplicate dishes with a single, master recipe that everyone follows. 
Suddenly, updating the menu becomes a breeze. DRY is about more than just cutting down on typing; it's about making your code smarter, leaner, and more maintainable.

## How

Imagine you're creating a simple interface for calculating the price of a pizza. You might have to display that price several times over. One for when you are on the checkout, and one for after the order has gone through. 

Your current code might look something like this:

```typescript
// In the Order Summary
function calculateOrderTotal(pizzas: number, isStudent: boolean, extraCheese: boolean): number {
    const basePrice = 10;
    const discount = isStudent ? 0.9 : 1;
    const cheesePrice = extraCheese ? 2 : 0;
    return (pizzas * basePrice + cheesePrice) * discount;
}

// In the Checkout
function calculateCheckoutTotal(pizzas: number, isStudent: boolean, glutenFreeCrust: boolean): number {
    const basePrice = 10;
    const discount = isStudent ? 0.9 : 1;
    const crustPrice = glutenFreeCrust ? 3 : 0;
    return (pizzas * basePrice + crustPrice) * discount;
}
 ```

Notice how they both look almost identical. And the only real difference is the arguments they take in. 

What if we centralize the calculation, and have them go through the same routine, no matter where the calculations are being called?

```typescript
interface PizzaCustomizations {
  extraCheese?: boolean;
  glutenFreeCrust?: boolean;
  // Add more customizations here as needed
}

export function calculatePizzaPrice(pizzas: number, isStudent: boolean, options: PizzaCustomizations = {}): number {
  const basePrice = 10; // Base price per pizza
  const discount = isStudent ? 0.9 : 1; // 10% discount for students
  const cheesePrice = options.extraCheese ? 2 * pizzas : 0; // Extra charge for cheese, per pizza
  const crustPrice = options.glutenFreeCrust ? 3 * pizzas : 0; // Extra charge for gluten-free crust, per pizza
  
  // Calculate total with possible customizations included
  return (pizzas * basePrice + cheesePrice + crustPrice) * discount;
}
```

By **centralizing** the pizza price calculation into a single, flexible function that handles various customizations through an options object, we achieve several significant benefits:
Simplified Code Maintenance

- _**Centralized Logic**_: All logic related to price calculation is in one place. This makes it easier to maintain and update the code since any changes to the pricing logic only need to be made once.
- **_Reduced Bugs_**: With only one function to manage, the risk of inconsistencies and bugs decreases. There's less chance of different parts of the application calculating prices differently due to outdated or duplicated code.
- **_Easy to Extend_**: Adding new customizations, like a new topping or a promotional discount, becomes straightforward. You simply update the PizzaCustomizations interface and adjust the calculation logic accordingly without needing to alter the function signature or the components that use it.
- **_Concise Code_**: Reducing duplication leads to a leaner codebase.
- **_Easier to test_**: This little util can very _easily_ be unit tested by itself, without polluting other test cases.

## In a nutshell 
Embracing DRY isn't just about dodging endless bug hunts; it's laying down the groundwork for sturdy, adaptable code. 
Think of it as decluttering your code. As you reach for that third cup of coffee, let the DRY principle be your compass, steering you away from the endless loop of copy-paste chaos towards smoother, smarter coding. It's a move that'll not just spare you headaches but also polish your code into something you, and anyone who follows, will appreciate working on.



