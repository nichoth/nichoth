__TODO__

* fork Jazz, and use the keystore + browser crypto
  That gets us non-extractable keys, so maybe more secure.
  The bad part is that only RSA is supported in all browsers. We are using
  ECC in Jazz currently, because we have a non-browser crypto library.
* Try fission infrastructure to link our `identity` module

-------

This gets to another idea -- can we reduce the surface area of apps by using
a common set of utility modules? And what would the modules be?

I have the `identity` module already. Need to try using that with Fission's
account linking infrastructure.

Jazz is a good example to work with.

Fork Jazz so that it uses only browser crypto with non-extractable keys.

-------

__Things we need__
* identity -- relates to signed messages and encryption, because it is
  related to public key infrastructure. In HL, for example, we derive a DNS
  friendly username from your public key string.
* connections -- how do we transfer data? Most frameworks have something for
  this. Can be p2p (via webrtc) or traditional client/server. For example,
  in `peerbit`, there is `await peer2.dial(peer.getMultiaddrs());`

  - in DSOX there is also a connection system

  - not really in webnative though. There is not a messaging system, only
    file storage.


Identity might be the main thing that we need.

Can we make a universal-ish identity? What does that look like?

Identity relates to

* signed messages
* encrypted content

*Thinking about __DXOS__*

There we have identity within DXOS, plus DB (structured data).

*Compare to*

Fission + webnative -- identity + blob storage

Jazz -- what is identity there? We use the `webauthn` API to create or load a keypair.

> A `Group` is a scope for permissions of its members (`"reader" | "writer" | "admin"`), applying to objects owned by that group.

Jazz uses "groups". I'm not totally sure how they come into play. Should try
making a multiplayer app -- make the signals example support multiplayer.
Wait, it already does support multiplayer.

We use permissions when we link devices:
```js
const inviteLink = createInviteLink(list, 'writer')
```

-------

Thinking about social graph...

Need to be invited to read a group. We should keep a record of our friends. 







