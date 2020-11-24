# nichoth.com

test

http://nichoth.com/

My website, from the distant past, that i have no memory of

## build
Create the html and JS from `ssb-ev` posts
```
npm run build
```

## start a local dev server
```
npm start
```

## deploy to surge
```
npm run deploy
```

## update content
Start eventual-gram with prod app-name. From eventual-gram dir:
```
npm run open
```
Then make a new post, this will be built into the website as a photo when you do `npm run build`.

--------------------------------------------------

## notes

### 9-25-2020
Found out about [scuttle-tag](https://www.npmjs.com/package/scuttle-tag) today.

-----------------------------------------------------

### frameworks
* [hyperapp](https://github.com/jorgebucaran/hyperapp)
  - [github namespace](https://github.com/hyperapp)
  - [hypersamples](https://github.com/hyperapp/hypersamples)
  - [hyperlit](https://github.com/zaceno/hyperlit)
* [mutant](https://github.com/mmckegg/mutant)
* [bulma](https://bulma.io/) -- css 
* [tonic](https://tonic.technology/)

-----------------------------------------------------------

* [ssb-markdown](https://github.com/ssbc/ssb-markdown)
* [scuttle-tag](https://www.npmjs.com/package/scuttle-tag)
* [ssb-conn](https://www.npmjs.com/package/ssb-conn)
* [ssb-ref](https://github.com/ssb-js/ssb-ref)
* [ref.parseLink](https://github.com/ssbc/patchwork/blob/c76136fb1628ec7fd4bb10b181d70ced01bb120c/lib/depject/message/html/markdown.js#L59)

---------------------------------------------------

* [the wet codebase](https://www.deconstructconf.com/2019/dan-abramov-the-wet-codebase)
* [recoil](https://recoiljs.org/) -- react state management
* [Functional lenses for contemporary frameworks - Andre Staltz](https://www.youtube.com/watch?v=5R3l2r1XxKI)
* [find-my-way](https://www.npmjs.com/package/find-my-way) -- http router
* [fission](https://fission.codes/)
* [Learn more about Threads and the Powergate from the IPFS Pinning Summit](https://blog.textile.io/learn-more-about-threads-and-the-powergate-from-the-ipfs-pinning-summit/)
* [CS 253 Web Security](https://web.stanford.edu/class/cs253/)

## hyper
* https://github.com/hypercore-protocol/hypercore
* https://www.datprotocol.com/
* [ocean protocol](https://oceanprotocol.com/)
* [hypergraph](https://blog.libscie.org/introducing-hypergraph-beta/)
* [dat store](https://github.com/datproject/dat-store)
* [textile hub](https://blog.textile.io/announcing-the-textile-protocol-hub/)
* [hypercore-protocol.org](https://hypercore-protocol.org/)
* [hypertrie](https://www.npmjs.com/package/hypertrie) -- Distributed single writer key/value store
* [pinata](https://pinata.cloud/)
* [dat sdk](https://github.com/datproject/sdk)
* [hyperswarm](https://github.com/RangerMauve/hyperswarm-web)
* [dat-sroe](https://github.com/datproject/dat-store)
* https://github.com/jimpick/hyper-graph-db-playground
* [hyper graph db](https://github.com/e-e-e/hyper-graph-db)
* [hyperdiscovery](https://github.com/datproject/hyperdiscovery)
* [hyperDB](https://github.com/mafintosh/hyperdb)

----------------------------------------

## design
* https://2020.webconf.asia/
* https://kristen.dev/
* https://www.cassie.codes/
* https://increment.com/

----------------------------------------

* https://www.wonderlandams.com/career/developer

----------------------------------------

## to read
* https://whitepaper.fission.codes/identity/id-overview
* https://en.wikipedia.org/wiki/WebFinger
* https://github.com/e-e-e/hyper-graph-db

-------------------------------------------

## sizes of things
* [preact](https://github.com/nichoth/demo-world)
```
-rw-r--r--  1 nick  staff    13K Oct 25 14:42 bundle.js
-rw-r--r--  1 nick  staff   243B Oct 25 10:55 index.html
-rw-r--r--  1 nick  staff    27B Oct 25 16:08 style.css
```
* [choo](https://github.com/nichoth/demo-world-choo)
```
-rw-r--r--  1 nick  staff    30K Oct 25 19:13 bundle.js
-rw-r--r--  1 nick  staff     0B Oct 25 19:12 style.css
```
* [react](https://github.com/nichoth/demo-world-react)
```
total 872
-rw-r--r--  1 nick  staff   407K Oct 25 21:03 bundle.js
-rw-r--r--  1 nick  staff    27B Oct 25 21:03 style.css
```

-----------------------------------------------------

from stackoverflow

> I. Encryption and decryption of data

> Alice wants to send a message to Bob which no one should be able to read.

> Alice encrypts the message with Bob's public key and sends it over.
> Bob receives the message and decrypts it using his private Key.
> Note that if A wants to send a message to B, A needs to use the Public key of B (which is publicly available to anyone) and neither public nor private key of A comes into picture here.

> So if you want to send a message to me you should know and use my public key which I provide to you and only I will be able to decrypt the message since I am the only one who has access to the corresponding private key.

> II. Verify the identity of sender (Authentication)

> Alice wants to send a message to Bob again. The problem of encrypting the data is solved using the above method.

> But what if I am sitting between Alice and Bob, introducing myself as 'Alice' to Bob and sending my own message to Bob instead of forwarding the one sent by Alice. Even though I can not decrypt and read the original message sent by Alice(that requires access to Bob's private key) I am hijacking the entire conversation between them.

> Is there a way Bob can confirm that the messages he is receiving are actually sent by Alice?

> Alice signs the message with her private key and sends it over. (In practice, what is signed is a hash of the message, e.g. SHA-256 or SHA-512.)
Bob receives it and verifies it using Alice's public key. Since Alice's public key successfully verified the message, Bob can conclude that the message has been signed by Alice.

---------------------------------------------------

## 10-31-2020
Reading https://github.com/RangerMauve/local-first-cyberspace

on `dat`:
> It's kinda like torrents, but it supports more files, and you can update the contents without needing to create a new archive.

* https://github.com/RangerMauve/discovery-swarm-web -- Abstracts away discovery-swarm interaction with WebRTC and a websocket gateway.
* https://github.com/geut/discovery-swarm-webrtc

* https://github.com/ssbc/ssb-server/issues/124 – partial replication issue
* https://github.com/ssbc/ssb-db/issues/27 – ‘Merkle Tree Logs’ issue
* https://github.com/arj03/ssb-browser-demo
* https://github.com/arj03/ssb-browser-core
* https://github.com/arj03/ssb-partial-replication
* https://github.com/ssbc/epidemic-broadcast-trees/
* https://viewer.scuttlebot.io/%L9m5nHRqpXM4Zkha1ENTk5wNOXQMduve8Hc9%2BF0RLZI%3D.sha256 – ssb thread about enabling partially subscribable feeds
* https://github.com/dominictarr/tree-exchange

-------------------------------------------------
## 11-1-2020

### fauna & graphql
* https://fauna.com/blog/try-faunadbs-graphql-api
* https://docs.fauna.com/fauna/current/api/graphql/
* https://rxdb.info/replication-graphql.html
* https://hasura.io/blog/building-an-offline-first-web-app-with-rxdb-hasura/
* https://docs.fauna.com/fauna/current/api/graphql/endpoints
* https://docs.fauna.com/fauna/current/start/graphql
* https://medium.com/fauna/the-worlds-best-serverless-database-now-with-native-graphql-ebaebc390395
* https://rxdb.info/replication-graphql.html

-------------------------------------------------

Need a localhost graphQL server for a local database

-------------------------------------------------------

## 11-8-2020
See https://www.inkandswitch.com/local-first.html

* Alexei Baboulevitch’s [Data Laced with History](http://archagon.net/blog/2018/03/24/data-laced-with-history/)
* Martin Kleppmann’s [Convergence vs Consensus (slides)](https://www.youtube.com/watch?v=B5NULPSiOGw)
* Shapiro et al.’s [comprehensive survey](https://hal.inria.fr/inria-00555588/document)
* Attiya et al.’s [formal specification of collaborative text editing](http://software.imdea.org/~gotsman/papers/editing-podc16.pdf)
* Gomes et al.’s [formal verification of CRDTs](https://dl.acm.org/citation.cfm?doid=3152284.3133933)

* https://github.com/automerge/automerge
* https://github.com/automerge/hypermerge

https://www.inkandswitch.com/local-first.html#git
> while also giving our users a piece of software they can download and install, which we discovered is an important part of the local-first feeling of ownership

Meaning electron is an essential part of ssb

The `fs` API is the key to the whole local-first thing in ssb. Node + electron are what make it viable to store all data locally, and local data storage is what makes it a true p2p experience. For example, pubs are just traditional servers that store all your data too, but because you've downloaded all the data too, that's what makes it a cool p2p thing. 

> we want applications to outlive any backend services managed by their vendors, so a decentralized solution is the logical end goal.

> Live collaboration between computers without Internet access feels like magic

> Servers thus have a role to play in the local-first world — not as central authorities, but as “cloud peers” that support client applications without being on the critical path. For example, a cloud peer that stores a copy of the document, and forwards it to other peers when they come online, could solve the closed-laptop problem above.

------------------------------------------------

## 11-10-2020
Trying firebase and rxdb

`/Users/nick/code/demo-world-rxdb`

## 11-14-2020 -- reading about beaker
* https://beakerbrowser.com/docs/how-beaker-works/privacy-and-security.html

>  Beaker stores user content on the device, and provides encrypted peer-to-peer transmission of the files.

> Dat websites are executed in a restrictive sandbox on the user’s device. While traditional Web apps assume a connection to a remote host, Dats are detached and must request network rights specially. 

[Thick applications model](https://beakerbrowser.com/docs/how-beaker-works/thick-applications.html)

> Rather than using remote services, Dat sites write user data to the local device with the localStorage, indexedDB, and Dat APIs.

https://beakerbrowser.com/docs/apis/dat
> By default, each `dat://` origin is limited to 100MB of storage
> When the 100MB limit is reached, all writes attempted with the DatArchive API will fail.

https://github.com/beakerbrowser/webdb#how-it-works
> It duplicates ingested data into IndexedDB, which acts as a throwaway cache. The cached data can be reconstructed at any time from the source Dat archives.

----------------------------------------

## git

https://withblue.ink/2020/05/17/how-and-why-to-sign-git-commits.html

> When you commit a change with Git, it accepts as author whatever value you want. This means you could claim to be whoever you want when you create a commit.
> To make GitHub (and everyone) believe that Martin authored that really terrible commit, I just had to run git config user.name and git config user.email with values that match Martin’s. Those are not hard to get at all: it only took me one minute to clone one of his repos then run git log in it.
> The committer details are designed just to identify who of your collaborators made a change, and are not meant to be used for authenticating people. Being able to impersonate other committers does not introduce a vulnerability per se. For example, just by setting my user.name to Martin’s, I do not get the ability to push code to his repositories: GitHub would require me to authenticate with his credentials before I could do that.
> if your Git hosting service allows that, you can also require with a policy that all commits must be signed. On GitHub, that’s done with protected branches.

### cryptography
> Asymmetric cryptography uses two separate keys: a public key and a secret (or private) one. As their names suggest, while the secret key must be protected at all cost, the public one can (and as will be our case later on, must) be shared with the world. With asymmetric cryptography, you encrypt a message using your public key, and then decrypt it using the private one. If you wanted to share an encrypted message with your friend, you’d use your friend’s public key to encrypt it. Your friend could then use their own private key to decrypt and read your message. Algorithms like RSA or the various elliptic curves work this way. Despite being lesser-known among the general public, asymmetric cryptography is wildly used, and it’s what makes TLS used by HTTPS possible too, among other things
> In addition to encrypting data, asymmetric cryptography can also be used to sign messages (and verify signatures). This works the opposite way: you sign a message using your private key, and others can verify the signature using your public key.

Git commits are not *signed* by default, they are just a hash of the content and a pointer to the *previous* hash.

#### adding a cryptographic signature to the message
> To do that you have to do two things in principle:

> You calculate a hash (or checksum) of your message. You can use a hashing function such as SHA-256. As you know, hashing functions are one-way operations that generate a unique set of bytes from each message, and they cannot be reversed. The hex-encoded SHA-256 digest of “You and I will meet tomorrow at 11.30am” is: 579c4547d8dec2c4513de8c858a490a8a2679db205a0b3471f81d5b129d29b88. If you changed even just 1 bit in the original message (e.g. change the time to 11.31am), the final digest would be completely different (try it).
> You use your private key to sign the calculated hash, using algorithms like RSA.


---------------------------------------


## icons
* https://svgbox.net/
* https://ionicons.com/
* https://feathericons.com/
* https://www.humaaans.com/


-------------------------------------------------

## 11-19-2020
What is [fission](https://fission.codes/)?

> When you create a Fission Account, whether signing up on the web or using the command line as a developer, it creates a username and email address in our service database, and also a private / public key pair representing that account.

> We also create a Fission Web Native File System (WNFS) attached to your account, and given you access to Fission Drive, which lets you browse all your files, access them from any browser, and see which apps are attached to your file system.

> Each device gets their own private key using the WebCrypto API built into modern browsers. Private keys shouldn't be copied around, so instead, we link keys indicating they have access to the same account.

> There is no "sign out" for a Fission-powered app. You use your key to do a passwordless login, stored in your local desktop browser, mobile web browser, or your local desktop file system with the command line developer tool.

> You may create multiple Fission accounts, but you'll need a unique email address and username for each one. You'll also need to use Browser Profiles to be able to access them at the same time on the same machine, as the keys that grant access are stored in the browser.

Sounds a lot like ssb & pubs, but with more advanced ID parts.

> To have access to your account across multiple devices, you need to link them. 
They have multi-device


------------------------------------

### Eventual gram update
Need to make a backend that functions as a pub, but the API is exposed over REST instead of RPC & websockets. That way it can be hosted as lambda functions.
* cannot work with existing clients
* it is less decentralized this way. The server is a trusted source of data. You could use it in-browser if the client knows their private key (for publishing).

-------------------------------------------

### ssc

* make the server
  - can maybe store keys locally
  - need to then use separate auth to publish
    + log in to server
    + use your local priv key to sign & publish a msg
    + is paid ? publish (if msg is valid) : err


## 11-24-2020
Should be doing ssc today.

https://paper.dropbox.com/doc/ThreadDB-for-Javascript-Alpha-Preview--BADptTkxkiiWSPYUl4D~9kUoAg-4jU1b9NKU3vuy8pDigmV6

https://docs.textile.io/threads/

[todos demo, not video](https://github.com/textileio/js-todo-demo#threads-todo-demo)

[video intro](https://www.loom.com/share/3d7ec496c3d744a39d85e3fc3e921b7d)

[offline first demo](https://www.loom.com/share/ecebf43e0eda4376a389ceadb234fdb3)

Have started reading about [textile thread db](https://paper.dropbox.com/doc/ThreadDB-for-Javascript-Alpha-Preview-4jU1b9NKU3vuy8pDigmV6) -- an offline-first local database that syncs to the distributed web

[video intro](https://www.loom.com/share/3d7ec496c3d744a39d85e3fc3e921b7d)

indexedDb wrapped with thread API

These are less radical b/c it is a *local cache*, not a full replica. 

> the remote is considered the “source of truth” 

> ThreadDB aims to help power a new generation of web technologies by combining a novel use of event sourcing, Interplanetary Linked Data (IPLD), and access control to provide a distributed, scalable, and flexible database solution for decentralized applications.







