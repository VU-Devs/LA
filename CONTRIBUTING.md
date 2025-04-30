# Contributing Guide

Thanks for your interest in improving the Link Aggregator!

## Scope of this Project

This project is a simple link aggregator for organizing course links, projects, or tools. It is meant to be simple and easy to add links to. Please do not add any complex features or frameworks. The goal is to keep it lightweight and deployable on GitHub Pages without any additional setup.

I am, however, open to suggestions on adding more links and reorganising existing ones. If you are unsure about a change, feel free to open an issue for triage or contact me directly.

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