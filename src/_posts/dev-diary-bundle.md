---

linkTitle: development diary — bundling
linkDesc: My notes on bundling things
slug: dev-diary-bundle
type: dev-diary
date: 10-20-2021

---

# development diary
* [vitejs.dev](https://vitejs.dev/)

My notes on bundling things

In the [blog](https://github.com/nichoth/blog/tree/img) app, we're using [vite](https://vitejs.dev/) to bundle the JS.

Note that this application uses typescript and `import` syntax. So the transformation of typescript to JS happens in a separate step, then all the JS is bundled together

https://vitejs.dev/guide/features.html#hot-module-replacement

> Vite supports importing .ts files out of the box.

> Vite only performs transpilation on .ts files and does NOT perform type checking. It assumes type checking is taken care of by your IDE and build process (you can run tsc --noEmit in the build script or install vue-tsc

> Vite uses esbuild to transpile TypeScript into JavaScript 

I actually like that it doesn't type check in the compilation, because sometimes you will have working code that does not pass type-checking, and that's interesting when you are first learning typescript.

----------------------------------------------------------------

The good and bad thing is that this is all hidden from you as a user of `vite`. Put a `tsconfig.js` and a `vite.config.ts` file in the project root, and that's it.

Note the `vite.config.ts` file is very small:
```js
import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: "es2020",
  },
  plugins: [reactRefresh()],
});
```

A bad thing because if I want to do something, like change the source file and output folder, how do I do that? Bash is the most basic level that people know, and I miss the browserify way of using bash pipes to determine the output.

