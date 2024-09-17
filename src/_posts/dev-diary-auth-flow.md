---

linkTitle: development diary &mdash; authentication
linkDesc: New hardware, new authentication
slug: dev-diary-auth
type: dev-diary
date: 09-17-2024

---

# development diary
[Web cryptography](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API) + ubiquitous smartphones give us a new option for authentication UX.

## Always signed in
In this scenario, you have one device, generally the smartphone, that is always authenticated / logged in to the web service. This is possible because there is a 1 to 1 map of user to smartphone.

If you want to use another device, the smartphone needs to sign a message authorizing the other device. This works for the public library scenario. You can create a new auth token with a limited lifespan.

This is interesting because this is a totally new UX for authentication. You would want to provide a way to recover your account of course, in the event that you lose your phone. This generally means encouraging adding a second device that is authenticated. Or you could create another keypair, and store it somewhere safe.

This is different than the standard model, where we assume you are on a shared device. That's how unix / contemporary systems work. We assume you are on a shared terminal, so you need some way to prove your identity. Because every user has 1 smartphone that is not shared, that works as verification of ID.

## Implementation

This depends on [indexed DB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API). We can create non-extractable crypto keys in the browser, and persist them in indexed DB. Authorizing a new device is a matter of creating a new keypair for the new device and signing a message that authorizes the new keypair.
