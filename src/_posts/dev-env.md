---

linkTitle: dev environment
linkDesc: Documenting how I do things
slug: dev-env
date: 10-7-2021
type: miscellany

---

# dev environment

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
* I used to have a method for dealing with my dotfiles, which is why there is a repo for them. However I can't remember if/what the methodology was because it's been so long since I've looked at them. I found [this repo](https://github.com/thoughtbot/dotfiles) which has some instructions. Maybe they are useful. Also [this site](https://dotfiles.github.io/) from github.

### Now clone the repo
You want to clone the forked version, not the original. `hub` by default will clone from your github username.

```
$ hub clone repo-name .
```


-----------------------------------------------


## dev how to
Notes on a javascript development process

> It’s crucial to have a setup, so that, at any given moment, when you get an idea, you have the place and the tools to make it happen.

&ndash; David Lynch, *Catching the Big Fish*

* [npm](#npm)
  * [publish a private package](#publish-a-private-package)
  * [publish a compiled library](#publish-a-compiled-library)
  * [use private npm modules with a CI server](#use-private-npm-modules-with-a-ci-server)
  * [semantic versions](#semantic-versions)
* [environment variables](#environment-variables)
* [cypress](#cypress)


### npm
You can use npm to privately host our internal dependencies. This allows you to use the same workflow with both private and public libraries.

#### publish a private package

1. **Use your org name as the scope in the `name` field:**
```js
{
    "name": "@org/project-name"
}
```

If you use `npm init` to initialize your packages, you can pass in the scope like this:

```
npm init --scope=<your_scope>
```

2. **Publish to npm. By default, scoped packages are published as private.**
```
npm publish
```

If you want to make the package **public**, publish it with `--access=public`
```
npm publish --access=public
```

#### read more
* https://docs.npmjs.com/private-modules/intro


### use private npm modules with a CI server
An automated build service will need a token to authenticate with npm. Create a `.npmrc` file that exposes the token as a variable. An overview:

* Create a new auth token
* Set up a project-specific .npmrc file.
* Configure the ci/deployment server to provide the auth token
* Configure your personal environment to provide a different auth token

See https://docs.npmjs.com/private-modules/ci-server-config


--------------------------------------


### publish a compiled library

We want to ignore the compiled code in git, but publish the built code to npm so that users don't have to build it themselves. Add the build script as a `prepare` hook in package.json. This will run the build step before a new version is published to npm.

`.gitignore`:
```
dist
```

`package.json`:
```js
{
    "main": "dist/index.js",
    "scripts": {
        "prepare": "npm run build > dist/index.js"
    }
}
```

**If the build depends on the host environment**, the correct place to build the code is in the `postinstall` hook, because it will run on the *consumer's* machine.

Read more https://docs.npmjs.com/misc/scripts

-----------------------------------------------------

### semantic versions
Version numbers are meaningful to npm. By default npm will install the latest non-breaking change, which means it's important to increment the major version number on any change that breaks the API. 

A caveat is version numbers starting with `0`, which are considered to be experimental. Any version number change to an experimental package is potentially a breaking change. When you install a package with an experimental version number, npm will pin it to an exact number, instead of using the default `^` operator.

#### read more
* https://docs.npmjs.com/getting-started/semantic-versioning
* https://semver.org/
* [We fail to follow SemVer – and why it needn’t matter](https://www.youtube.com/watch?v=tc2UgG5L7WM)


-----------------------------------------------


## environment variables
[dotenv-safe](https://www.npmjs.com/package/dotenv-safe)

Create a `.env.example` file that is commited with the code, and also a `.env` file that is ignored. 

-------------------------------------

[env-cmd](https://github.com/toddbluhm/env-cmd)
Use both CLI env vars, and also a .env file:

```js
{
    "build": "env-cmd --no-override .env browserify -t envify src/index.js > dist/bundle.js"
}
```

## cypress

A quick start with [cypress](https://www.cypress.io/)

### install

    $ npm i -D cypress

This will add a folder `cypress` and a file `cypress.json` to the project.

### add a script to package.json
This is how you open the gui test runner, `cypress open`.

    {
        "cypress": "cypress open"
    }

### configure eslint
Add a .eslintrc into the cypress folder. See https://github.com/cypress-io/eslint-plugin-cypress

### write tests
Tests go in `cypress/integration`. They look like this

```js
describe('My First Test', function() {
    it('clicking "type" navigates to a new url', function() {
        cy.visit('https://example.cypress.io')
        cy.contains('type').click()
        cy.url().should('include', '/commands/actions')
    })
})
```

See https://docs.cypress.io/guides/getting-started/writing-your-first-test.html

### CI
We want to be able to automate these tests, not just run them in a gui. We need a script that will start our dev server, then run the tests, then close both.

Create a wrapper that runs `budo` from CLI, then runs the tests and stops the server when finished:

```js
// cypress/scripts/ci.js
var cypress = require('cypress')
var Budo = require('budo')

var budo = Budo.cli(process.argv.slice(2), {
    port: process.env.PORT || 8000
}).on('connect', function () {
    cypress.run()
        .then(res => {
            budo.close()
        })
})
```

This should be called as an npm script like the others, but using our file instead of `budo`:

```
{
    "cypress-ci": "node ./cypress/scripts/ci.js src/index.js:bundle.js --pushstate --dir=public -- -t babelify -g aliasify -t [ envify --NODE_ENV development ] -dv"
}
```

