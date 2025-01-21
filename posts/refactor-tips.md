---
title: Refactoring - The only way forward is going back. 
published_at: 2023-11-13T14:08:00.000Z
snippet: "Let's deep dive into something we all love to do - touching other peoples stale old code."
image: "blog-images/smell.webp"
---


<img alt="Code smell. Yuck." height="1024" src="../blog-images/smell.webp" width="400"/>

# Why Refactor?

Refactoring is essential in software development for adapting to evolving requirements and enhancing application performance. Consider a typical software development example: initially, you might have a function with multiple responsibilities. 

As the application grows, this approach becomes a bottleneck. By refactoring, you can split this function into smaller, more focused functions, enhancing readability and maintainability. This process doesn't change the software's behavior but makes the codebase more adaptable and efficient.

## Common signs it might be time to refactor
Recognizing when to refactor is as crucial as knowing how to do it. One clear sign is escalating code complexity, where methods become overextended and classes take on too many responsibilities, making the codebase unwieldy and bug-prone. This complexity often manifests through 'code smells' such as duplicate code, indicating a need for consolidation, or long methods that can be broken down for clarity and efficiency. 

Another red flag is the increasing difficulty in adding new features, a sign of rigid code that resists adaptation. Additionally, if certain areas of your codebase consistently harbor bugs or suffer performance issues, it's a strong indication that these sections need a closer look and possible refactoring

## How to refactor: Some guidelines and best approaches


So you think you have what it takes to get started on your refactoring, I want to offer you a piece of advice - You are probably not. Touching code that has been stale or is complex should not be done without understanding why and what you are doing. How do you gain that confidence? You write tests. Before you do any refactorings you write _tests_.

It's not about doubting your skills; it's about respecting the complexity of code and acknowledging that no one, not even the best developer in the world, can predict every outcome of tweaking that code.

The next thing to keep in mind, would be that you need the right tools. I don't know how many times I have seen people sitting on notepad thinking they have what it takes. Use an IDE (IntelliJ, Eclipse, Visual Studio - It's well worth the license fee), it's as simple as that. They have created and optimised for it. It helps remove human error, if not automate the task away for you.


## Example

Imagine you're part of a team developing an application for a quirky, intergalactic travel agency, "Galactic Getaways." Your task is to refactor a method in the VacationPlanner class. This method, planTrip, is responsible for processing traveler data for a custom space vacation. It's currently a bit of a black hole in terms of code complexity. Let's refactor it to make it as sleek as a spaceship!

```typescript
class VacationPlanner {
    public async planTrip(travelerId: number): void {
        let travelerData = await this.getTravelerDataAsync(travelerId);

        let travelerName = travelerData.name;
        let destination = travelerData.desiredDestination;

        if (!this.isValidDestination(destination)) {
            console.error("Unknown destination. Are you sure this is in this galaxy?");
            return;
        }

        let travelCost = this.calculateTravelCost(destination, travelerData.luxuryLevel);

        console.log(`Traveler: ${travelerName}, 
        Destination: ${destination}, 
        Total Cost: ${travelCost} Galactic Credits`);
    }
}

```

This method is trying to do too much: fetching data, processing it, validating, and outputting results. Let's refactor it by breaking it down into smaller, more focused functions, each with a clear responsibility.


*Step 0:* Defining tests, updating them, and making sure they cover what you're about to change.
This is absolutely the most important step, as without it, youre not gonna be able to get the result you want. Make sure you have a good suite of tests before you start, this safeguards against any unintentional changes.

Step 1: Time to extract methods. We'll separate destination validation, travel cost calculation, and the logging of the trip plan into their own methods.

```typescript
class VacationPlanner {
    public planTrip(travelerId: number): void {
        const travelerData = this.getTravelerData(travelerId);
        this.validateDestination(travelerData.desiredDestination);
        const travelCost = this.calculateTravelCost(travelerData.desiredDestination, travelerData.luxuryLevel);
        this.logTripPlan(travelerData, travelCost);
    }

    private async getTravelerData(travelerId: number): Promise<Traveler> {
        return await this.getTravelerDataAsync(travelerId);
    }

    private validateDestination(destination: string): void {
        if (!this.isValidDestination(destination)) {
            throw new Error("Unknown destination. Are you sure this is in this galaxy?");
        }
    }

    private calculateTravelCost(destination: string, luxuryLevel: number): number {
        // Logic to calculate travel cost
    }

    private logTripPlan(travelerData: Traveler, travelCost: number): void {
        console.log(`Traveler: ${travelerData.name}, 
        Destination: ${travelerData.desiredDestination}, 
        Total Cost: ${travelCost} Galactic Credits`);
    }
}

```

*Step 2*: Refine and Test. After extracting the methods, it’s crucial to test each one to ensure they work as expected. This step validates that our refactoring hasn’t altered the functionality of the code.

*Step 3*: Review and Simplify. Finally, review the refactored code. Ensure that each method is clear and focused, and remove any unnecessary complexity. The goal is to make the code as intuitive and maintainable as possible.

By following these steps, we've transformed a cumbersome method into a streamlined, maintainable set of functions, each with a single responsibility. This not only makes our `VacationPlanner` class cleaner but also easier to understand and extend in the future.



