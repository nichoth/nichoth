---

linkTitle: next js
linkDesc: Finally learning next js
slug: dev-diary-nextjs
type: dev-diary
date: 4-26-2022

---

# development diary

## Finally learning next.js

[github.com/nichoth/nextjs-blog](https://github.com/nichoth/nextjs-blog)

following [these instructions](https://nextjs.org/learn/basics/create-nextjs-app)

The script to start a local server:
```
npm run dev
```

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

--------------------------------------------

### scripts

see [here](https://nextjs.org/learn/basics/assets-metadata-css/third-party-javascript)

Can add a script in the usual way, in the head part, by adding it to the JS
react file

> including scripts in this manner does not give a clear idea of when it would load with respect to the other JavaScript code fetched on the same page.

#### scripts component

The `next/script` component

> optimizes when additional scripts are fetched and executed.

> `strategy` controls when the third-party script should load.

### css

> you can add global CSS files by importing them from `pages/_app.js`. You cannot import global CSS anywhere else.

> you can add global CSS files by importing them from `pages/_app.js`. You cannot import global CSS anywhere else.

### Pre-rendering and Data Fetching

[Static Generation vs Server-side Rendering](https://nextjs.org/learn/basics/data-fetching/two-forms)

[pre-rendering](https://nextjs.org/learn/basics/data-fetching/pre-rendering)

> By default, Next.js pre-renders every page. This means that Next.js generates HTML for each page in advance, instead of having it all done by client-side JavaScript

> Each generated HTML is associated with minimal JavaScript code necessary for that page. When a page is loaded by the browser, its JavaScript code runs and makes the page fully interactive. (This process is called hydration.)


* Static Generation is the pre-rendering method that generates the HTML at build time. The pre-rendered HTML is then reused on each request.
* Server-side Rendering is the pre-rendering method that generates the HTML on each request.

> You can create a "hybrid" Next.js app by using Static Generation for most pages and using Server-side Rendering for others.

[data fetching](https://nextjs.org/learn/basics/data-fetching/with-data)

#### getStaticProps

* `getStaticProps` runs at build time in production, and…
* Inside the function, you can fetch external data and send it as props to the page

> Essentially, getStaticProps allows you to tell Next.js: “Hey, this page has some data dependencies — so when you pre-render this page at build time, make sure to resolve them first!”

> Note: Next.js polyfills fetch() on both the client and server. You don't need to import it.

> `getStaticProps` only runs on the server-side

> It won’t even be included in the JS bundle for the browser. 

----------------------------

> To use Server-side Rendering, you need to export `getServerSideProps` instead of `getStaticProps` from your page.

> You should use getServerSideProps only if you need to pre-render a page whose data must be fetched at request time. 

#### client-side rendering

> If you do not need to pre-render the data

> This approach works well for user dashboard pages, for example. Because a dashboard is a private, user-specific page, SEO is not relevant, and the page doesn’t need to be pre-rendered. The data is frequently updated, which requires request-time data fetching.

> The team behind Next.js has created a React hook for data fetching called [SWR](https://swr.vercel.app/). We highly recommend it if you’re fetching data on the client side.

### dynamic routes

[dynamic routes](https://nextjs.org/learn/basics/dynamic-routes/page-path-external-data)

> Pages that begin with `[` and end with `]` are dynamic routes in Next.js

> export an async function called `getStaticPaths` from the page file

```js
export async function getStaticPaths() {
  // Return a list of possible value for id
}
```

> we need to implement `getStaticProps` again - this time, to fetch necessary data for the blog post with a given id. `getStaticProps` is given `params`, which contains `id` (because the file name is `[id].js`).

> Each object must have the `params` key and contain an object with the id key


### API routes

See [the docs](https://nextjs.org/docs/api-routes/introduction)

> Do Not Fetch an API Route from `getStaticProps` or `getStaticPaths`. Instead, write your server-side code directly in `getStaticProps` or `getStaticPaths` (or call a helper function).


### deploy

Use [Vercel](https://vercel.com/).

https://nextjs-blog-tau-five-85.vercel.app/

> Push to any Git branch other than main to preview changes

> Push to main to ship changes to production

> Pages that use Static Generation and assets (JS, CSS, images, fonts, etc) will automatically be served from the Vercel Edge Network

> Pages that use Server-Side Rendering and API routes will automatically become isolated Serverless Functions. 

> In your own hosting provider, run the build script once, which builds the production application in the .next folder.



