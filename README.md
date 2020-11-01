# nichoth.com

http://nichoth.com/

My website, from the distant past, that i have no memory of

## start a local dev server
```
npm start
```

## deploy to surge
```
npm run deploy
```

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





