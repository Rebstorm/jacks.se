---
title: Made a thing with deno. 
published_at: 2023-08-18T21:24:00.000Z
snippet: Deno deploy goes brr 🚀
---

# Made a thing with deno.
This page was written on one caffeine fueled weekend when I should probably have been out socializing. But instead, I really wanted to test Deno & Deno Deploy.

## What is Deno?

Developed by Ryan Dahl - the original creator of Node.js - Deno emerged from lessons learned from Node’s successes and challenges. Unlike its predecessor, Deno allows you to run JavaScript and TypeScript code outside of the browser, but with a strong emphasis on security and developer experience.

- **Security:** Deno is secure by default. No file, network, or environment access (unless explicitly enabled).
- **Built-In Utilities:** From a package manager to testing utilities, Deno comes bundled with tools, diminishing the need for external packages.
- **TypeScript Support:** No additional setup for TypeScript - Deno supports it out of the box.

## Unleash the Power with Deno Deploy

Deno Deploy takes the robustness of Deno to the next level by allowing developers to deploy their Deno applications globally, ensuring they run closer to users for reduced latency and a superior user experience.

### Edge Computing with Deno Deploy

1. **Global Distribution:** Deploy scripts across data centers worldwide, ensuring your application logic executes close to your user base.
2. **Developer-Friendly:** Thanks to Deno's minimalistic and comprehensive API, and the extensive standard library, developers can efficiently build, share, and deploy applications with ease.
3. **Real-Time Debugging:** With Deno Deploy's live logs and console access, troubleshooting and real-time debugging become a breeze, significantly reducing downtime during incidents.

### Getting Started with Your First Deno Deployment

With a strong foundation in Deno and a deep understanding of Deno Deploy's potential, let’s get our hands dirty and delve into deploying our first application on the edge.

```typescript
// Import Deno Deploy functions
import { serve } from 'https://deno.land/x/deploy/mod.ts';

// Define a simple request listener
const requestListener = async (request: Request) => {
  const { pathname } = new URL(request.url);

  // Provide a warm welcome to the path visited
  return new Response(`Hello, world! You visited ${pathname}.`, {
    headers: { 'content-type': 'text/plain' },
  });
};

// Serve your application
serve(requestListener);
```

To deploy this script, simply:

- Navigate to Deno Deploy. 
- Create a new project and follow the instructions to deploy your script.  Once deployed, your application will be globally distributed and accessible via a provided URL.

Conclusion: Deno + Deno Deploy = Pretty awesome. 

Deno and Deno Deploy makes it possible to write globally scalable JavaScript and TypeScript development, with as much effort as I put into this blog. With a plethora of built-in tools, a developer-friendly approach, and a robust platform to deploy applications across the globe, the pairing invites developers to step into the future, where optimal performance and user-centric experiences reign supreme.

Developers and businesses adopting this technology will not only streamline their development processes but also ensure that their applications are more secure, scalable, and user-friendly. Deno and Deno Deploy serve as a reminder that in the world of technology, innovation is not merely welcomed; it is crucial. 🚀

Happy coding, and may your deployments be smooth and your user experiences exceptional!

Note: Always remember to keep abreast of the latest updates and features from the official Deno website and Deno Deploy documentation to ensure you leverage all the powerful tools and capabilities these platforms have to offer.

Note: Ensure to test code snippets and validate their efficacy as per the current versions of Deno and Deno Deploy, as APIs might evolve.