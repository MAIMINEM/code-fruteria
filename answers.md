# Technical Questions

> 1. How much time did you spend on the engineering task?

- Had spent aound 1 day to do the engineering taks.

> 2. What would you add to your solution if you’d had more time?

- a. completed styles for all pages and components
- b. components can be separated smaller
- c. adding more unit tesets
- d. first time loading enhancements

> 3. What do you think is the most useful feature added to the latest version of JS/TS? Include a code snippet that shows how you've used it.

- a. Iterator helpers are super useful for handling large or infinite data streams lazily.
  code sample:
  [Iterator
  .from(numbers())
  .filter(n => n % 2 === 0)
  .map(n => n \* n)
  .take(5)
  .toArray();}

> 4. How would you track down a performance issue in production? Have you ever had to do this?

Yes, first thing need to do is to find out where goes wrong and whats the bottleneck. We can use browser [Performance Tab], [Lighthouse] to check and anylyse, then try to analyse what caused the issue and to optimize accordingly.
