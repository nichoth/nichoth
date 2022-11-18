---

linkTitle: ssc template
linkDesc: A template for ssc projects
slug: ssc-template
type: dev-diary
date: 11-18-2022

---

## When you find a better setup for your dev tools
When I was first getting started I spent a lot of time confiuring things -- the shell, editors, JS bundlers... Then everything just kinf of worked for a long time, and I haven't thought about it since.

`jsconfig.json` is preferable to `tsconfig.json` because we don't really want another build process -- transpiling `ts` to `js` -- that's just one more moving part in an already complex build process. We just want the little hints in our editor about possible type errors.
