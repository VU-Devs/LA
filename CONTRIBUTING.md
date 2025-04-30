# Contributing Guide

Thanks for your interest in improving the Link Aggregator!

## How to Add a New Link

To add a new link:

1. Open the `script.js` file.
2. At the top, locate the `links` object:

```js
const links = {
  "Semester 1": [
    { title: "Calculus I", url: "https://example.com/calculus1" },
    ...
  ],
  ...
};
```

3. Add your new link in the appropriate category (or create a new one). Format:

```js
{ title: "New Resource Name", url: "https://example.com/resource" }
```

4. Save the file and refresh your browser to see the changes.