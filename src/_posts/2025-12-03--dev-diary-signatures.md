---

linkTitle: Bluesky, the Web, and Cryptography
linkDesc: More keys, more fun
slug: signatures
type: dev-diary
date: 2025-12-04

---

# Bluesky, the Web, and Cryptography

Cryptographic signatures are pretty useful. They are everywhere.
Every post on Bluesky is signed. It would be nice if you could sign even more
things, though. That's what this is about &mdash; signing arbitrary
things with your Bluesky identity.

These blog posts usually involve me releasing a new library of some sort.
There is a library involved here, but that is not the main point.

The heart of this article is a pattern &mdash; publishing a
public key on your website, and establishing a cryptographic chain from
your website to a Bluesky account.

We already have a link from Bluesky to the wider web via the domain name as
handle system, which uses DNS records to verify that the Bluesky account
owner and website owner are the same person.

To establish a cryptographic signature chain from the web to Bluesky,
we need a way to publish a public key that we control.
Just like on Bluesky, we can use a
[DID document](https://github.com/w3c-ccg/did-method-web)
for this.

```js
{
    "@context": [
        "https://www.w3.org/ns/did/v1",
        "https://w3id.org/security/multikey/v1"
    ],
    "id": "did:web:nichoth.com",
    "alsoKnownAs": [
        "at://nichoth.com",
        "https://github.com/nichoth/"
    ],
    "verificationMethod": [
        {
            "id": "did:web:nichoth.com#main-key",
            "type": "Multikey",
            "controller": "did:web:nichoth.com",
            "publicKeyMultibase": "z6MktJ6Tv1kuh4Dwybs5dcmvrXKkar5CkFFqrJPeL6wgMbKf"
        }
    ],
    "authentication": ["did:web:nichoth.com#main-key"],
    "assertionMethod": ["did:web:nichoth.com#main-key"]
}
```

Note the `verificationMethod.publicKeyMultibase` field. This is your public
key, encoded as a
[multikey format](https://github.com/substrate-system/multikey)
string. To create my own keypair, I used a command line tool,
[crypt](https://github.com/substrate-system/crypt),
but anything that can securely generate a keypair is fine. At the end of the day
you need a keypair where you control the private key.

## See Also

Some helpful modules:

* [substrate-system/did-web](https://github.com/substrate-system/did-web)
* [substrate-system/multikey](https://github.com/substrate-system/multikey)
* [substrate-system/crypt](https://github.com/substrate-system/crypt)
