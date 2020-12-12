#dev-diary

# development diary
Just found out about the service [fission](https://fission.codes/) today. I have read about creating accounts so far. It reminds me a lot of ssb in the sense that an identity is a pub/priv key pair. However, there seems to be more built around the id keys, for example you can link multiple devices or use it in a browser.

What is fission? I still don't know.

> Fission Drive lets you browse public, unencrypted files stored on IPFS.

So it uses IPFS. Is it a service that 'pins' your files also?

> You can browse any IPFS directory, not just those hosted on Fission, by entering in the hash, or Content ID (CID), of a directory.

So I guess it *is* a host/'pin'

> Your browser holds the unique, private key to this account, so you don’t need a password. In order to not get locked out of your account, we recommend that you link to at least one other device, like your phone, tablet, or other computer with a web browser.

That's kind of cool, using a second device in case of account lock-out.

I see there is a dialog for permission to access the file system from the browser. How does that work? my understanding was that websites are never able to do fs access.

Found a repo
https://github.com/fission-suite/webnative
> The Web Native File System (WNFS) is built on top of the InterPlanetary File System (IPFS). It's structured and functions similarly to a Unix-style file system

> The publish function synchronises your file system with the Fission API and IPFS

----------------------------------------

Also have been looking at publishing my 'dev-diary' posts on [my website](http://nichoth.com/), but haven't been able to get the tags to work right yet. I have my own tag plugin for ssb, but indexing the full log takes to long, since patchwork has not ever been using my plugin before. Using the existing tags plugin is also not working and I don't know why. There is something getting mixed up, so that it outputs the wrong set of tags depending on which plugin gets used first. Or somehting like that.

So for now this is written in a text file and being copied to ssb. Copy and pasted text, the most egregious failur for a developer.

--------------------------------------

Updated the css for [jessica's website](https://clicking--geez.netlify.app/) it's more minimal now. Waitnig to hear for more feedback.




