---

linkTitle: development diary &mdash; webauthn
linkDesc: A first look at `webauthn`
slug: dev-diary-webauthn
type: dev-diary
date: 9-8-2024

---

# development diary

## Using the `webauthn` API to keep a keypair secret.

This is my first dive into the `webauthn` API &mdash; [@bicycle-codes/webauthn-keys](https://github.com/bicycle-codes/webauthn-keys/)

I'm kind of happy about this one. It gets around the issue with the `webcrypto` API not yet supporting ECC keys in all browsers. I was using RSA for everything in [the identity module](https://github.com/bicycle-codes/identity), for example.

Here we use user-land modules ([sodium](https://github.com/jedisct1/libsodium.js)) to create a keypair. So we don't get to use ["non-extractable" keys](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/generateKey#extractable), as with the `webrypto` API, but we can require the user to authenticate with a `webauthn` (biometric) device before we let them read the keys.

## how does this work?

We embed a secret (`iv`) in the userID field of [the passkey](https://passkeys.dev/). That way we can only use the keys after authenticating with a biometric device.

Thinking about high level system design, you would keep ECC keys in any device that has `webauthn`, and use RSA keys iff `webauthn` is not available, and the user is on a device that doesn't support ECC keys.

It seems like everything now should have a biometric ID, but it's pretty common still to not be able to use one. We will always need to support the pubic library use-case, for example. You're using a shared machine that you do not have physical access to.

The use case of creating a UCAN + a authorizing a temporary keypair leads farther down a rabbit hole about using QR codes to authorize a new device, another thing I've been meaning to do.
