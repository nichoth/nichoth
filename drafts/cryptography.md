# what's the deal with cryptography?

## private key
Given some content, make a signature

## public key
Given some content and a signature, tell me if the signature is valid. This reveals nothing about *what the private key is*, but it will tell us that the signature was produced by a private key that corresponds to this public key.

If the given signature is valid, then we know that it was made by the matching private key for this public key. Whoever signed this content has access to the private key.

The signature *proves* that the owner signed this message, just like the idea behind a *real* signature.

