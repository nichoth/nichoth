---

linkTitle: next js
linkDesc: Finally learning next js
slug: dev-diary-nextjs
type: dev-diary
date: 4-26-2022

---

# development diary

## Learning next.js

following [these instructions](https://nextjs.org/learn/basics/create-nextjs-app)

### navigation

Use the `Link` component. It will automatically do client-side routing, code
splitting, and pre-fetch the JS for the relevant future pages.

By default, we do routing based on the file system structure in the `pages`
directory.

### css, static files

> Files inside public can be referenced from the root of the application similar to pages.

#### img tag vs next js images

When including an `<img>` tag, you need to think about:

* Ensuring your image is responsive on different screen sizes
* Optimizing your images with a third-party tool or library
* Only loading images when they enter the viewport

Next.js provides an Image component out of the box to handle this for you.

> Next.js also has support for Image Optimization by default. This allows for resizing, optimizing, and serving images in modern formats like WebP when the browser supports it. This avoids shipping large images to devices with a smaller viewport. It also allows Next.js to automatically adopt future image formats and serve them to browsers that support those formats.

> Next.js optimizes images on-demand, as users request them.

Images are only loaded when they are within the viewport:

> Images are lazy loaded by default. That means your page speed isn't penalized for images outside the viewport. Images load as they are scrolled into viewport.



