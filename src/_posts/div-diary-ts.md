---

linkTitle: development diary — typescript
linkDesc: Making websites
slug: dev-diary-ts
date: 9-8-2021
type: dev-diary

---

# development diary

* [https://github.com/nichoth/fission-did](github.com/nichoth/fission-did)

## typescript

I finally used typescript. How this works is you compile the source code to JS before publishing to npm. Your test code is also typescript. It is run with a tool called `ts-node`.

### Some brief notes

I added the fields `main` and `types` to package.json. This tells npm/node where to look for the compiled files and the types

```
"main": "dist/index.js",
"types": "dist/index.d.ts",
```

Add `build` and `propublish` scripts to package.json:

```
"scripts": {
    "build": "mkdir -p dist && tsc",
    "prepublish": "npm run build",
}
```

Add some stuff to a `tsconfig.json` file in the project root. This tells the typescript compiler, `tsc`, how to build things. Note the `declaration` field. This tells it to create `.d.ts` files along with javascript.

```js
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "moduleResolution": "node",
    "outDir": "dist",
    "strict": true,
    "declaration": true,
    "esModuleInterop": true
  },
  "include": [
    "src",
    "tests/**/*"
  ],
  "exclude": [
    "node_modules",
    "dist"
  ]
}
```

Also be sure to git ignore the compiled files:

.gitignore:
```
dist/*
```

-----------------------------------------------

### tests

Thats all good. So how do you run this code? You have to install an additional npm dependency, `ts-node`: `npm i -D ts-node`. Then you run a test file with this command:

```
"test": "ts-node node_modules/tape/bin/tape test/index.ts | tap-spec"
```

The nice part here is that we are compiling the tests with typescript. So you check the types when you run the tests.

Your test file looks like this. Note we are using `import`, not `require`.

```js
import * as tape from 'tape'
import { KeyType } from '../src/types'
import { publicKeyToDid } from '../src'

var pk = 'example'

tape('public key to DID', function (t: tape.Test) {
    var did = publicKeyToDid(pk, KeyType.RSA)
    t.ok(did, 'should create a did from a public key')
    t.equal(did, 'example', 'should create the right did')
    // console.log('did', did)
    t.end()
})
```




