---

linkTitle: development diary — bundling
linkDesc: Bundling...
slug: dev-diary-bundle
type: dev-diary
date: 10-20-2021

---

# development diary

* [vitejs.dev](https://vitejs.dev/)

In the `blog` app, we're using `vite` to bundle the JS.

Note that this application uses typescript and `import` syntax. So the transformation of typescript to JS happens in a separate step

https://vitejs.dev/guide/features.html#hot-module-replacement

> Vite supports importing .ts files out of the box.

> Vite only performs transpilation on .ts files and does NOT perform type checking. It assumes type checking is taken care of by your IDE and build process (you can run tsc --noEmit in the build script or install vue-tsc

> Vite uses esbuild to transpile TypeScript into JavaScript 

I actually like that it doesn't type check in the compilation, because sometimes you will have working code that does not pass type-checking, and that's interesting when you are first learning typescript.





