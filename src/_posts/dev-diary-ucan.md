---

linkTitle: development diary — UCAN
linkDesc: UCANs
slug: dev-diary-ucan
type: dev-diary
date: 10-16-2021

---

## development diary -- UCAN

* [fission-suite/ucan](https://github.com/fission-suite/ucan)
* [nichoth/keystore-idb](https://github.com/nichoth/keystore-idb)
* [nichoth/fission-did](https://github.com/nichoth/fission-did)

[nichoth/fission-did](https://github.com/nichoth/fission-did) is a repo I made to test the fission DID and UCAN libraries. See that readme & `example.js` file for discussion & examples.

[fission-suite/ucan](https://github.com/fission-suite/ucan) is the newer fission library for creating & working with UCANs. The difficult part is that the UCAN library and the `webnative` library each return a different interface for UCANs.

The `ucans` library has and API like this:

```js
// in-memory keypair
const keypair = await ucan.keypair.create(ucan.KeyType.Edwards)

const u = await ucan.build({
  audience: audience.did(), //recipient
  issuer: keypair, //signing key
  // ...
```

You'll notice that the `keypair` returned by `ucans` has [a method](https://github.com/fission-suite/ucan/blob/0ee11e4c2608316ff5abeb540d4fd343fe02800e/tests/ed25519.test.ts#L18) `.did`.

Which is great for testing, because it makes it easy to create a temporary, in memory keypair. But how do you keep the same keypair over time?

Normally you would use the [webnative](https://github.com/fission-suite/webnative) library, which uses the [keystore-idb](https://github.com/fission-suite/keystore-idb) library to get a key. It stores the keys in the browser via `local forage`, and you would get the did like this:
```js
webnative.did.ucan().then(ourDID =>  // ...
```

But `keystore-idb` has a different keypair API than `ucans`. That's why I made [nichoth/keystore-idb](https://github.com/nichoth/keystore-idb). It has a method [getKeypair](https://github.com/nichoth/keystore-idb/blob/main/test-tape/index.js#L7) that returns the same keypair API as `ucans`.

I would submit this as a PR, but I don't really know what direction the rest of the team wants to go in regarding reconciling the webnative and `ucans` APIs. Also my test is a little wonky because I'm using a totally different bundler and test library.

