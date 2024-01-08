---

linkTitle: template
linkDesc: A template for JS projects
slug: template
type: dev-diary
date: 11-18-2022

---

# template

* [nichoth/template-js](https://github.com/nichoth/template-js)

## When you find a better setup for your dev tools
In the past I spent a lot of time configuring things -- the shell, editors, JS bundlers... It was a good investment, because I haven't really had to think about it since then. Everything just works for the most part.

But since then typescript has been created. It's complicated, if we want typescript or not. We don't really want another build process -- transpiling `ts` to `js` -- that's just one more moving part in an already complex build process. For the most part I just want little hints in the editor about possible errors. It turns out you can do that. Add a `jsconfig.json` file, and then you can write JS, but get editor hints about typescript.

This is a way of describing a new "template" -- [nichoth/template-js](https://github.com/nichoth/template-js) -- some preferred boilerplate for any JS project.

### the main ingredients

* [standardx](https://www.npmjs.com/package/standardx)
* [git-hooks-plus](https://www.npmjs.com/package/git-hooks-plus)
* typescript via a [jsconfig.json file](https://code.visualstudio.com/docs/languages/jsconfig)
* [check-max-deps](https://github.com/nichoth/check-max-deps)

We use git hooks to lint the code prior to pushing. And `standardx` means we can configure the lint to our preference, like using [4 spaces per indent](https://github.com/nichoth/template-js/blob/main/.eslintrc#L14).
