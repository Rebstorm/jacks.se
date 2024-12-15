---
title: "LLMs and XML. When to use it."
published_at: 2024-12-15T18:12:00.000Z
snippet: "When should we use XML to help LLMs understand and structure our outputs? Click-bait me to find out."
---

![Bue bue](../blog-images/block_1.webp)

# Does Using XML Improve AI Understanding?

When working with AI tools like ChatGPT/Claude or your own LLM, there’s a common suggestion floating around: “Use XML to make your queries clearer.” 

## When XML is Useful

XML excels at representing structured or hierarchical data. In an LLM context, it can be super helpful, by **reducing ambiguity**.  XML can make complex queries easier to interpret.

For example, an XML input might look like this:
```xml
<query>
    <type>question</type>
    <topic>quantity</topic>
    <detail>
        How much wood could a woodchuck chuck?
    </detail>
</query>
```

You can go one step forward, and replace the it with dynamic content or wildcards:

```xml
<query>
    <type>question</type>
    <topic>{topic}</topic>
    <detail>
        {prompt}
    </detail>
</query>
```

This helps you write better more consistent queries, and makes it easier for the LLM to understand whats going on.


Until next time!

Paul.

