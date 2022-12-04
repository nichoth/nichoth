---

linkTitle: ssc template
linkDesc: A template for ssc projects
slug: ssc-template
type: dev-diary
date: 11-18-2022

---

# ssc tmeplate

## When you find a better setup for your dev tools
In the past I spent a lot of time confiuring things -- the shell, editors, JS bundlers... It was a good investment, because I haven't really had to think about it since then. Everything just works for the most part.

But since then typescript has been created. It's complicated, if we want typescript or not. We don't really want another build process -- transpiling `ts` to `js` -- that's just one more moving part in an already complex build process. For the most part I just want the little hints in the editor about possible errors. It turns out you can do that. Add a `jsconfig.json` file, and then you can write JS, but get editor hints about typescript.

This is a way of describing a new "template" -- https://github.com/socketsupply/template . 

### the main ingredients

* [standardx](https://www.npmjs.com/package/standardx)
* [git-hooks-plus](https://www.npmjs.com/package/git-hooks-plus)
* typescript via a [jsconfig.json file](https://code.visualstudio.com/docs/languages/jsconfig)
