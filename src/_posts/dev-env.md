---

linkTitle: dev environment
linkDesc: Documenting how I do things
slug: dev-env
date: 10-7-2021
type: miscellany

---

## dev environment

Documenting how I do things

### node
Use [nvm](https://github.com/nvm-sh/nvm) to install the latest version of `node`. 

I use [npm](https://www.npmjs.com/) as a package manager (vs yarn). I started using npm when I started with node, and I've never found a reason to switch package managers.

`npm` is also what I use to organize/orchestrate different scripts. I remember reading [this article](https://github.com/substack/blog/blob/master/npm_run.markdown) about task automation back when it still existed in blog format. This is an example of `scripts` in package.json:

```
  "scripts": {
    "start": "npm run build && concurrently --kill-others \"npm run watch-sass\" \"npm run watch-js\" \"netlify dev --port=8888\"",
    "build": "npm run copy && npm run build-js && npm run build-sass",
    "cypress-test": "NODE_ENV=test env $(cat .env | xargs) concurrently --kill-others \"npm start\" \"cypress open\"",
    "test": "NODE_ENV=test tape test/*.js | tap-spec"
  },
```

Note the script `cypress-test`. Run it with `$ npm run cypress-test`. This uses another tool, [concurrently](https://www.npmjs.com/package/concurrently), to run multiple other scripts at the same time. It starts our localhost server with `npm start`, and opens the cypress GUI with `cypress open`.


### tools
For unit tests use [tape](https://www.npmjs.com/package/tape). For testing in a browser enironment [tape-run](https://www.npmjs.com/package/tape-run). Here is [an example](https://github.com/nichoth/keystore-idb/blob/e48c81cb7368e5131a13735d18eb1d9465d081bf/package.json#L56) of a test script in package.json. It will start an electron process (for a browser enironment), but log standard tap output to stdout in the terminal, and return a pass/fail exit code.

For end-to-end testing I like [cypress](https://www.cypress.io/). It will start a GUI application for visually running tests, which is good because this is an *e2e* test -- part of it is that you want to test the GUI.

You will probably have a script like this in package.json:
```js
"cypress-test": "concurrently --kill-others \"npm start\" \"cypress open\""
```


### fork something on github.
There is more to this than you might think.

* install the github CLI tool -- [hub.github.com](https://hub.github.com/)
* click the 'fork' button on github.
* Now, in the command line, type `md repo-name`
* `md` is a bash function I have in my `.bash_profile` -- [nichoth/dotfiles](https://github.com/nichoth/dotfiles/blob/master/bash_profile#L177), equivalent to `mkdir -p "newdir" && cd "newdir"`
* I used to have a method for dealing with my dotfiles, which is why there is a repo for them. However I can't remember if/what the methodology was because it's been so long since I've lookd at them. I found [this repo](https://github.com/thoughtbot/dotfiles) which has some instructions. Maybe they are useful. Also [this site](https://dotfiles.github.io/) from github.

### Now clone the repo
You want to clone the forked version, not the original. `hub` by default will clone from your github username.

```
$ hub clone repo-name .
```

