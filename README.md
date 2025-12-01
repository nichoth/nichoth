# nichoth.com

https://nichoth.com/

---------------------

![nichoth's GitHub stats](https://github-readme-stats.vercel.app/api?username=nichoth&show_icons=true&theme=transparent)


## templates

__Links to various templates__

* [template-js](https://github.com/nichoth/template-js) -- A template for
  JS projects
* [template-ts](https://github.com/nichoth/template-ts) -- A template for Node
  typescript dependency modules
* [template-ts-browser](https://github.com/nichoth/template-ts-browser) --
  Template for typescript projects in a browser environment
* [template-web-component](https://github.com/nichoth/template-web-component) --
  Template for web components
* [template-ts-preact-htm](https://github.com/nichoth/template-ts-preact-htm) --
  Template for peact, htm, and typescript
* [template-ts-preact-htm-app](https://github.com/nichoth/template-ts-preact-htm-app)
  -- Template for applications using htm & preact
* [template-netlify-preact-htm-app](https://github.com/nichoth/template-netlify-preact-htm-app) -- Template for netlify, htm, preact
* [template-tonic-spa](https://github.com/nichoth/template-tonic-spa) -- Tonic
  framework + client-side routing

## notes
[Links and notes](https://github.com/nichoth/notes/discussions)

plus, [a list](https://nichoth.com/list/)

## build
```sh
npm run build
```

## start a local dev server
```sh
npm start
```

## Notes

### DID

See [did.json](./src/_well-known/did.json).

The key format is [Multikey](https://www.w3.org/TR/cid-1.0/#Multikey),
a generic, self-describing,
[multicodec-based](https://www.w3.org/TR/cid-1.0/#multibase-0)
public key encoding.

```js
// ...
"verificationMethod": [
    {
        "id": "did:web:nichoth.com#main-key",
        "type": "Multikey",  // < -- this
        "controller": "did:web:nichoth.com",
        "publicKeyMultibase": "z6Mkmy1ak2zS6hPohyNnPwMUDqpC3WE8wTR3Fcz5esUoCFNH"
    }
],
// ...
```

To encode something as a multikey:

```js
import { bases } from "multiformats/bases/base58"
import {
  encode as multibaseEncode,
  decode as multibaseDecode
  } from "multiformats/bases/base58"
import * as varint from "multiformats/src/varint"
import * as multicodec from "multicodec"

// Suppose you have a raw public-key Buffer/Uint8Array
const rawKeyBytes = /* ... */

// Add the proper multicodec prefix for, say, ed25519-pub (via multicodec)
const prefixed = multicodec.addPrefix('ed25519-pub', rawKeyBytes)

// Then multibase-encode it (e.g. base58btc)
const mb = bases.base58.encoder.encode(prefixed)

// This yields something like "z6Mk…", same style as in the DID doc
console.log(mb)
```
