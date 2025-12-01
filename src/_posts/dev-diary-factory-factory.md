---

linkTitle: development diary — the factory factory factory
linkDesc: Stop making factory factory factories
slug: dev-diary-factory
type: dev-diary
date: 2023-10-25

---

# development diary

## the factory factory factory

[Last time](/projects/signals/), I wrote about making [a new event emitter](https://github.com/nichoth/events) library as part of the architecture for front end apps.

Since then I read a couple things -- [factoryfactoryfactory.net](https://factoryfactoryfactory.net/), and this killer blog [Go Make Things](https://gomakethings.com/easier-state-management-with-preact-signals/). [The example of `preact` + vanilla JS](https://gomakethings.com/a-mostly-vanilla-js-way-to-use-preact/) is so nice and simple, I had a moment where I thought, *have I been making factory factory factories* this whole time?

A couple things happened next. I rewrote [the `jazz-signals` example](https://github.com/nichoth/jazz-signals/tree/main/example) so that it is simpler, and I [forked the standalone signals library](https://github.com/nichoth/preact-htm-signals-standalone/tree/fork), so that I can use it via CDN without having to trust another person.

At least one good thing that came out of the factory factory was an extra minimal [event emitter](https://github.com/nichoth/events).

-------

[This app template](https://github.com/nichoth/template-ts-preact-htm-app) shows this architecture in a re-usable format.
