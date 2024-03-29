---
slug: log
type: dev-diary
linkTitle: log
linkDesc: A daily log of notes
---

A running log of stuff

## cryptography
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

---------------------------------------------

## 11-25-2020
Found [cypher-net](https://github.com/dominictarr/cyphernet), and old dominic project.

Watched [an old video -- 2013 Realtime Conf](https://vimeo.com/77352417). git replication -- group the hashes into common prefixes, and then hash each group. That way you can tell if any of the groups contains a change, so it's more efficient to replicate.

Can't get the tags to work on the main ssb network. It returns `undefined` or something like that. The new plan is to write things in this readme and then parse the markdown and write it to the website, and copy paste to ssb. I guess i could also just get a stream of *this feed*, which is mostly development logs.

I feel like I haven't gotten too much done this week. I applied for a job. It's at some kind of local dev shop here in bellingham weirldy. So that will be nice if that works out and I can move back to california. Otherwise just kind of poked around with things. Some ssc stuff.

ssc is what i've called the next project btw. it a 'pub', but made with unique code (it's not a regular ssb peer). ssc is like ssb but newer because c comes after b in the alphabet. Its ssb, but run with contemporary things -- put it on netlify, use faunaDB for storage, lambda functions. It's not any *less* decentralized than the current system with pubs sort of, but it uses more boring stuff -- no webscokets or RPC. The part that might be less decentralized is that it is different code than the 'client' apps. Also have to use a different network b/c it uses different protocols.

### todo
* What is a distributed hash table?
* Need to work on ssc -- get replication working

--------------------------------------------------------


## 11-25-2020
In the back of my mind is the memory app -- basically a graph database that has a UI. I want to use levelgraph, but have been thinking that I could use it will an ssb-like network also, which i guess means things would be easy to replicate/share.

-------------------------------------------------------


## 12-11-2020

* https://lynnandtonic.com/
* https://hypercore-protocol.org/
* https://blog.glitch.com/
* https://blog.glitch.com/post/the-easiest-way-ever-to-control-who-you-share-your-app-with
* https://www.taco.report/
* https://explorers.netlify.com/
* https://www.netlify.com/blog/2020/12/03/graphcms-launches-integration-for-netlify/

--------------------------------------------------

## 12-13-2020

via Dominic %pYmFr6d0QwLP+YG0VNoo75PP7eYNZ1Y8C2MC9IjF5aw=.sha256 :

[link](https://viewer.scuttlebot.io/%25pYmFr6d0QwLP%2BYG0VNoo75PP7eYNZ1Y8C2MC9IjF5aw%3D.sha256)

> # why flume?
> 
> Since I saw from [flume-rs readme](https://github.com/ssbrs/flumedb-rs) [@piet](@U5GvOKP/YUza9k53DSXxT0mk3PIrnyAmessvNfZl5E0=.ed25519) still didn't understand my flume documentation I'm gonna try explaining some high level things again here. Hope this helps.
> 
> _Could you build scuttlebutt on just a key value store?_
> 
> Well, it was originally, but it evolved towards a log oriented store and flume was refactored out of it. The problem with the key value store is that the user doesn't get to choose the keys. The key is the hash of the message. I can't create a message with a hash that you are expecting - that's basically impossible (it's a hash collision). But you can put something in a message (such as the hash of my message) and I can lookup messages that contain that something. The tool that helps you look up things is called an index. Since we don't get to choose the keys, scuttlebutt's database _is not really useful without the indexes_.
> 
> Some of the client apps other that patchwork do display the feeds in log order, patchbay@<=6, patchfoo, patchless. But the main user of the log order is the indexes.
> 
> Before the log oriented refactor, the primary store was a leveldb the keys were the hash and the value was the message. That's why scuttlebutt returns js objects that are `{key: msg_id, value: msg}`
> There were also several indexes. I think clock `[author, seq]`, log `[timestamp]`, feed `[value.timestamp]`, user feed `[author, timestamp]`, links, maybe some others too. When a message was appended to the database, the relevant indexes were also created. These where all written in a single batch to the same leveldb instance. (this is important) this meant that the entire write, message plus indexes, either succeeded or failed _together_ which gaurantees that the indexes match the data.
> 
> The big problem with this model was that it was hard to change how the indexes worked, or add a new index. If index data was only added at write time, what if you have a database full of data, and want to add another index? or fix a bug in an index? There wasn't any systematic way to do this. But then I realized, you could use the `log` (message receive time) index for that - the index could reprocess all the messages in receive order, like it would have if it had been running at the time the message was received! Also, added bonus: if the reindex crashed or was shutdown part way, it could continue processing from that point, instead of starting over.
> 
> At this time, (the days of patchwork@1 and 2) at startup, patchwork scanned all the messages and built up some in memory data structures, such as the friends graph. This delayed startup ~10 seconds at the time, but doing this now would take several minutes! However, the idea of in memory aggregations is a good solution to some things, hence we have `flumeview-reduce`. (of course, since these are coded in a somewhat ad hoc way, it's likely they have bugs that need to be fixed, so rebuilding indexes is particularily important)
> 
> _The whole point of the log is to make (re)building indexes and views easy._
> 
> ---
> 
> Another way to think of it: if patchwork wasn't decentralized, but was just a website, backed by say, mongodb - you wouldn't do things like we do them at all. Instead of storing every message as it's own record, when you replied to a thread, they'd make a http request to update the key representing that thread. But that wouldn't work with scuttlebutt, because there isn't anyone with the authority to decide whether a given update to a thread was valid or not, so instead of storing the mutable state of a thread, we store the immutable updates to it. Then when we want to view the mutable state, we collect the updates and regenerate it. It's as if, instead of storing the thread, you stored the http requests to update the thread, then replayed it.
> 
> Scuttlebutt really is an unusual database. Firstly, it's somewhat unusual because it has master-master replication - most databases don't have that, and some have it tacked on. ssb takes that one step further, but making replication the _most important feature_ and makes many horrible compromises in order to make that feature work well. (such as: not being able to choose your keys, not delete messages, only be able to append new messages instead of update things)
> 
> This was a reaction to couchdb - which had a replication feature, but it didn't work really great because it allowed you to update messages and choose your own keys. couchdb replication would work for a federated application, or redundant servers, or a central hub + mirrors, but not a truely decentralized design. However, couch did have some cool things - like user definable views/indexes (based on map and reduce functions) and access to the internal log. (it was exposed as part of the replication feature, but I used it several times for various things, but that's another story) Prehaps most importantly, it was a database created by an open source community, not a corporation. I met a number of nice people who worked on couchdb! (it was the opposite of mongo, which just had a slick website, made by a company, open source, sure, but not community driven in the same way couchdb was)
> 
> ---
> 
> If anyone still has questions lets do a flume db call - AMA about flume! [@piet](@U5GvOKP/YUza9k53DSXxT0mk3PIrnyAmessvNfZl5E0=.ed25519)
> [@mix](@ye+QM09iPcDJD6YvQYjoQc7sLF/IFhmNbEqgdzQo3lQ=.ed25519) [@dinosaur](@6ilZq3kN0F+dXFHAPjAwMm87JEb/VdB+LC9eIMW3sa0=.ed25519) [@aljoscha](@zurF8X68ArfRM71dF3mKh36W0xDM8QmOnAS5bYOq8hA=.ed25519) [@rabble](@vzoU7/XuBB5B0xueC9NHFr9Q76VvPktD9GUkYgN9lAc=.ed25519) [@cel](@f/6sQ6d2CMxRUhLpspgGIulDxDCwYD7DzFzPNr7u5AU=.ed25519)  

-------------------------------------------------

Organizing things is hard. The web is supposed to help b/c it has global text links, but servers disappearing is a hurdle. Then there is `hyper*`, which i still need to learn about.

## revisiting
* https://github.com/amark/gun
* https://www.youtube.com/watch?v=V6DKjEbdYos -- Rich Hickey - The Database as a Value

## todo
* the graph db thing
* ssc functions
  - publish subsequent msgs

## read about these
* hypercore
* webrtc
* gunDB
* hyp CLI
* web assembly
* DHT
* travel back in time and look [at this](https://github.com/nichoth/nichoth#10-31-2020) -- a list of stuff regarding merkle-tree, ssb, hyper-swarm

-------------------------------------------------------------

[merkle tree logs](https://github.com/ssbc/ssb-db/issues/27) -- use a binary tree instead of a log

[partial replicateion](https://github.com/ssbc/ssb-server/issues/124)

[merkle trees in ssb-viewer](https://viewer.scuttlebot.io/%25L9m5nHRqpXM4Zkha1ENTk5wNOXQMduve8Hc9%2BF0RLZI%3D.sha256)

> Ssb provides ooo messages, where a server can ask its peers to deliver it a message of a certain hash

> you trust that whoever gave you that hash has already verified the validity of that message.

[Searching the web for the origins of the hash chain](https://viewer.scuttlebot.io/%250%2BT%2FBvk742LoJNBsRmITlNNr6eXEzPBOpktR3HZnr0M%3D.sha256)

--------------------------------------------

## 12-14-2020

* https://www.youtube.com/watch?v=nOSB177SfEM&feature=youtu.be&t=380 -- arj bornhack anarchitecture

I realized today that it is *impossible* to do this site on netlify, because the databse for photos is only available on *my computer*, thanks to ssb.

### phone links
* https://thecsspodcast.libsyn.com/
* https://ceramic.network/
* https://pinata.cloud/
* [humble fungus](https://www.youtube.com/channel/UC9i7mX6VXYUwUlfcZLKInjA)
* [hyperphone](https://github.com/mafintosh/hyperphone)
* https://github.com/ssb-ngi-pointer/jitdb/pull/67
* [hyperbeam](https://github.com/mafintosh/hyperbeam)
* https://sia.codes/posts/eleventy-and-cloudinary-images/
* [backdrifting -- DHT](https://backdrifting.net/post/040_dhts)
* [p2p network models and implications](https://backdrifting.net/post/042_p2p_models)
* [Paul reveals what Uplink is.](https://www.patreon.com/posts/paul-reveals-is-44665610)
* https://slate.host/
* https://dinhanhthi.com/
* [11ty + nunjucks](https://dinhanhthi.com/11ty-nunjucks/)
* https://github.com/anotherjesse/hello-hyper-github-publish
* https://spectrum.chat/
* https://rethinkdb.com/

------------------

* https://www.cassie.codes/speaking/interactive-web-animation-with-svg/
* https://www.cassie.codes/

* https://handbook.scuttlebutt.nz/guides/
* [tree exchange](https://github.com/dominictarr/tree-exchange) Looks cool
* [ssb tree thread](https://viewer.scuttlebot.io/%25L9m5nHRqpXM4Zkha1ENTk5wNOXQMduve8Hc9%2BF0RLZI%3D.sha256)


-------------------------------------------------


## 12-15-2020
* https://www.inkandswitch.com/local-first.html

---------------------------------------------------------

## 12-16-2020
Woke up with a headache today. Took some ibuprofen and now it's ok.

Found out about [ssb-keys-mnemonic](https://www.npmjs.com/package/ssb-keys-mnemonic) today.

-------------------------------------------------------

## 12-20-2020
Reading about [hypercore](https://hypercore-protocol.org/) today.

> Think lightweight blockchain crossed with BitTorrent.

> Each peer can choose to download only the section of the log they are interested in, without having to download everything from the beginning.

A nice merkle-tree illustration in 'Secured by Merkle trees and cryptography'.

> To support mutable datasets, Hypercore uses asymmetric cryptography to sign the root of the Merkle tree as data is appended to it.

### to read
* https://geutstudio.com/blog/introducing-permanent-seeder/

----------------------------------

* https://www.parity.io/jobs/#jobs
* [hypermerge](https://github.com/automerge/hypermerge)
* [ssb-browser-core](https://github.com/arj03/ssb-browser-core)
* [automerge](https://github.com/automerge/automerge)
* [local first cyberspace](https://github.com/RangerMauve/local-first-cyberspace)
* [tree-exchange](https://github.com/dominictarr/tree-exchange)
* https://github.com/anotherjesse/hello-hyper-github-publish
* [Distributed Hash Tables and Decentralized Data Storage](https://backdrifting.net/post/040_dhts)
* https://github.com/mafintosh/hyperbeam
* [hyp cli](https://github.com/hypercore-protocol/cli)

---------------------------------------

* https://github.com/RangerMauve/hyperdrive-publisher
* https://github.com/datproject/dat-store
* https://github.com/RangerMauve/hyperdrive-publisher-example

https://github.com/anotherjesse/hello-hyper-github-publish

--------------------------------------------------

https://thegraph.com/

-------------------------------------------------

## 12-22-2020
* [Setting up a TypeScript NodeJS Application with Prettier and ESLint](https://dev.to/caelinsutch/setting-up-a-typescript-nodejs-application-with-prettier-and-eslint-53jc)
* [React Server Components](https://reactjs.org/blog/2020/12/21/data-fetching-with-react-server-components.html)
* [Speakeasy JS – How we fit our blockchain full node in a web browser (Elena Nadolinski)](https://www.youtube.com/watch?v=CS6pZ1qLUVg)
* [p2p ordered search indexes](https://0fps.net/2020/12/19/peer-to-peer-ordered-search-indexes/)
* [what's old is new](https://css-tricks.com/whats-old-is-new/)
* [(Choosing our own) Adventures in Next.js](https://www.youtube.com/watch?v=_qkoAPRG2wY)
* [cloudflare pages](https://blog.cloudflare.com/cloudflare-pages/) -- seems to be like netlify. but has a KV store
  - [Workers Durable Objects Beta](https://blog.cloudflare.com/introducing-workers-durable-objects/)
  - [Workers KV — Cloudflare's distributed database](https://blog.cloudflare.com/workers-kv-is-ga/)
> we've made it possible for Workers to act as WebSocket endpoints


----------------------------------

* [@hyperswarm/replicator](https://www.npmjs.com/package/@hyperswarm/replicator)
* [ssb-browser-core/blobs](https://github.com/arj03/ssb-browser-core#remoteurlblobid)

-----------------------------------------

What is durable-object compared to KV

I think the durable-object thing gives you some co-location, so you have a strong consistency guarantee, and also it is persisted and location agnostic. Whereas KV is eventually consistent. Durable-Objects use the same memory in additin to storage, so it is immediately consistent. I think.

Durable objects look like lambda functions, but with a lifespan longer than just the function running

Workers-KV is like a database. eventually consistent

----------------------------------------------------------------------

## 12-23-2020

* [Leveraging 11ty in Healthcare](https://www.youtube.com/watch?v=RvNV8Lesmrc)

---------------------------------------------

## 12-24-2020

Watching this and noting the stuff: [Leveraging 11ty in Healthcare](https://www.youtube.com/watch?v=RvNV8Lesmrc)

* [integromat](https://www.integromat.com/en)
* [airtable](https://airtable.com/) -- "master user DB"
* [whereby](https://whereby.com/information/embedded/)
* [sendgrid](https://sendgrid.com/) -- for the link to join

"Didn't have to do any of that API programming"

Finally read this: https://0fps.net/2020/12/19/peer-to-peer-ordered-search-indexes/

------------------------------------------------

reading [cloudlflare worker KV](https://blog.cloudflare.com/building-a-to-do-list-with-workers-and-kv/)

It's kind of weird how I can't find where the cloudflare functions can be placed in my source repo. I can only see the workers in the weird little browser editor from cloudflare.

[Use a github action to deploy a worker script](https://blog.cloudflare.com/deploying-workers-with-github-actions-serverless/)

So it looks like you would create a separate repo for the cloudflare workers, and use a GH action to deploy them when they change

* [css tricks](https://css-tricks.com/how-to-make-a-simple-cms-with-cloudflare-github-actions-and-metalsmith/)
* [metalsmith](https://metalsmith.io/)


----------------------------------------------

## 12-25-2020

* [durable objects](https://blog.cloudflare.com/introducing-workers-durable-objects/)
* [merkle](https://0fps.net/2020/12/19/peer-to-peer-ordered-search-indexes/)
* https://dev.to/caelinsutch/setting-up-a-typescript-nodejs-application-with-prettier-and-eslint-53jc

-----------------------------------------------------

## 12-27-2020

* [scroll animation](https://css-tricks.com/books/greatest-css-tricks/scroll-animation/) -- very good article
* [css min & max](https://css-tricks.com/min-max-and-clamp-are-css-magic/)
* https://web.dev/min-max-clamp/


------------------------------------------------------------------

## 12-28-2020

Need to get 'eventual-gram' working today. Need to do the routing, make sure the invite-code page is ok

* [arj blog](https://people.iola.dk/arj/2020/02/18/secure-scuttlebutt-in-a-browser/)

------------------------------------------------------------

## 12-29-2020
Sent this log as a 'writing sample', then realized i should have sent [the fiend guide](https://github.com/nichoth/ssb-field-guide).


----------------------------------------------------

## 12-30-2020
Heard of [terminus DB](https://terminusdb.com/) and [the podcast](https://podcast.terminusdb.com/episodes) today

-----------------------------------------

## 12-31-2020

------------------------------------------

## 1-2-2021

The cypress tests are nice *just because* they have the UI commponent. It is just nice to be able to *see* the website as it is testing.

----------------------------------------

## 1-3-2021
I woke up quite late today. Am not sure why

### a big list of websites from my phone

* [hyp cli](https://github.com/hypercore-protocol/cli)
* https://github.com/RangerMauve/hyperdrive-publisher
* https://pinata.cloud/
* https://thehub.io/startups/hyperdivision
* https://github.com/automerge/hypermerge
* https://polkadot.network/
* https://www.substrate.io/
* https://subsocial.network/
* https://minimalistlist.com/
* https://arweave.medium.com/
* https://github.com/davidkpiano/xstate/
* https://www.underpin.company/
* https://adamrackis.dev/
* https://css-tricks.com/creating-ui-components-in-svg/
* https://www.ladybug.dev/
* https://flatfile.io/
* https://rmurphey.com/posts/on-micro-frontends/
* https://explorers.netlify.com/

---------------------------------------------

* https://hashbase.io/
Seems like the best for p2p pinning

* https://awesome.datproject.org/dat

---------------------------------------------------

What is [ssb-feed](https://www.npmjs.com/package/ssb-feed)? it looks like what I'm doing with `ssc` -- in-memory merkle dag functions.

---------------------------------------------------

## 1-4-2021

Found out about https://github.com/mikeal/dagdb from the podcast [open hive](https://www.nearform.com/podcast/)

-------------------------------------------------

## 1-5-2021

ssb-browser -- how does storage work?

ssb-browser [storage limit](https://web.dev/storage-for-the-web/) -- 80%?

### phone stuff

* ["the graph"](https://tokemy.com/indexing-web3-the-graph/amp/)
* [orchid thief podcast](https://sparkandfire.com/orchidthief/)
* https://threads.com/
* [Should The Web Expose Hardware Capabilities?](https://www.smashingmagazine.com/2021/01/web-expose-hardware-capabilities/)
* [Custom Properties as State](https://css-tricks.com/custom-properties-as-state/) -- css tricks
* https://neurosity.co/
* [notion is cool](https://kyliebytes.substack.com/p/notion-is-cool-heres-why)
* [netlify blogvent](https://www.netlify.com/blog/2020/12/21/wrapping-up-blogvent-2020/)
* https://github.com/sfnode/sfnode
* https://kusama.network/
* https://labs.thisdot.co/

-----------------------------------------------

## 1-6-2021
* [hypercore protocol](https://twitter.com/HypercoreProto/status/1346837739665240064) -- intro video
* hyperswarm is the networking part

----------------------------------------

## 1-8-2021
I added some pictures to the website yesterday. That counts as something. Might want to try combinig eleventy with the current `hyperstream` build command. These build scripts are getting quite laborious.

Have a small headache today and took some advil.

### phone stuff
* [refactoring UI](https://refactoringui.com/)
* [tatiana mac -- system of systems](https://www.youtube.com/watch?v=TzGfBV67Tac)
* [cassidy next.js](https://explorers.netlify.com/learn/nextjs)
* [cassidy next.js](https://www.youtube.com/watch?v=VAEyelMtWp8)
* [bellincat qanon](https://www.bellingcat.com/news/americas/2021/01/07/the-making-of-qanon-a-crowdsourced-conspiracy/)
* https://bocoup.com/
* [graphCMS + vercel](https://graphcms.com/blog/graphcms-vercel-integration)
* [protoschool](https://proto.school/)
* [render](https://render.com/) -- host place
* [compulsive shopping for men -- dumb bitch media](https://podcasts.google.com/feed/aHR0cHM6Ly9mZWVkLnBvZGJlYW4uY29tL2R1bWJiaXRjaG1lZGlhL2ZlZWQueG1s/episode/ZHVtYmJpdGNobWVkaWEucG9kYmVhbi5jb20vOTU5ZTE4MWYtMWNmZC0zNDBiLWI0MGQtZDQ2MTEyOTdlZmI4?hl=en&ved=2ahUKEwjj-OT5p43uAhWDKzQIHS2XC6EQieUEegQIBRAF&ep=6)

----------------------------------------

## 1-10-21

### Reading about https://render.com/ today.
* [disks](https://render.com/docs/disks) -- data that is persisted across deploys and restarts

They can host backend processes (servers). [express](https://render.com/docs/deploy-node-express-app)

Websockets might work with the [services](https://render.com/pricing#services) thing

-----------------------------------------------

## 1-14-21

* https://stateofjs.com/
* https://2020.stateofjs.com/en-US/ -- a nicely designed website

-------------------------------------------

## 1-15-2021

* https://blog.sindresorhus.com/get-ready-for-esm-aa53530b3f77
* https://www.deconstructconf.com/2019/dan-abramov-the-wet-codebase -- 'you have a limited stack inside your brain'
* https://telephone.unlimited.pizza/ -- fabulous website design

Have been just sitting and looking at twitter and stuff today. Eventually maybe I'll do the next issue -- testing the 'set your username' thing.

-----------------------------------------------------

## 1-16-2021

### phone stuff
* [ipfs ethereum naming service](https://docs.ipfs.io/how-to/websites-on-ipfs/link-a-domain/#domain-name-service-dns)
* [fleek DNS](https://blog.fleek.co/posts/guide-ens-domains-ipfs-ethereum-name-service)
* [All the Ways You Can Surf the Decentralized Web Today](https://medium.com/the-ethereum-name-service/all-the-ways-you-can-surf-the-decentralized-web-today-bf8e7a42fa27)
* [cloudlfare -- A Name Resolver for the Distributed Web](https://blog.cloudflare.com/cloudflare-distributed-web-resolver/)
* [ENS Partners with Cloudflare on Improved ETH.LINK Service](https://medium.com/the-ethereum-name-service/ens-partners-with-cloudflare-on-improved-eth-link-service-4801bf9148ff)
* https://ceramic.network/

--------------------------------

* [Aspen Tech Policy Hub](https://www.aspentechpolicyhub.org/programs/)
* [delta chat](https://delta.chat/en/)

---------------------------------------

* [vue-storefront](https://github.com/vuestorefront/vue-storefront)
* [avif](https://jakearchibald.com/2020/avif-has-landed/)

------------------------------------------

* https://moonbeam.network/
* https://lit-html.polymer-project.org/
* https://github.com/cassidoo/getting-a-gig
* [hyperlog](https://github.com/mafintosh/hyperlog)

------------------------------------------

## 1-17-2021
Working on eventual-gram -- following people

-------------------------------------

## 1-18-2021

* https://moonbeam.network/ -- don't know what this is
* https://lit-html.polymer-project.org/ -- for some reason in the web component space

-----------------------------------------

## 1-19-2021

### phone stuff

* [#Selfcare](https://www.tor.com/2021/01/19/selfcare-annalee-newitz/) 
* [css numbers](https://twitter.com/piccalilli_/status/1233358303092232194)
* [youtube IPFS, brave](https://www.youtube.com/watch?v=jTDkTQiKzJA&feature=emb_logo&ab_channel=BATCommunity)
* [ladybug podcast](https://www.ladybug.dev/episodes/nextjs)
* [cassidoo](https://cassidoo.co/) -- example homepage
* [animation blog post](https://www.cassie.codes/posts/creating-my-logo-animation/)
* [ipfs in brave](https://blog.ipfs.io/2021-01-19-ipfs-in-brave/)
* [holochain blog](https://blog.holochain.org/new-year-new-energy/)
* [Closing the Year with Elemental Chat on Holochain RSM](https://medium.com/h-o-l-o/closing-the-year-with-elemental-chat-on-holochain-rsm-105f9eede19c)
* [IT'S ALIIIIIIVE!](https://blog.holochain.org/its-aliiiiiive/)
* [11up](https://www.npmjs.com/package/11up) -- Quickly bootstrap 11ty sites from some basic templates.
* [The internet didn’t kill counterculture—you just won’t find it on Instagram](https://www.documentjournal.com/2021/01/the-internet-didnt-kill-counterculture-you-just-wont-find-it-on-instagram/)
* [Introducing three-elements](https://hmans.co/posts/2021-01-18-three-elements/)
* [array explorer](https://arrayexplorer.netlify.app/)
* [the world's oldest city](https://thehypothesis.substack.com/p/a-photographic-journey-into-the-worlds)
* [11ty jamstack toronto](https://www.youtube.com/playlist?list=PLc_KoiGi3sLfxAQhIx87GY7PnoVALDNn0)
* [nerv](https://github.com/nervJS/nerv) -- Nerv is a virtual-dom based JavaScript (TypeScript) library with identical React 16 API, which offers much higher performance, tinier package size and better browser compatibility.
* [hyperx](https://github.com/choojs/hyperx)
* [hyperxify](https://github.com/substack/hyperxify) -- browserify transform for hyperx
* [uhtml](https://github.com/WebReflection/uhtml)
* [nanohtml](https://github.com/choojs/nanohtml)
* [lit-html](https://lit-html.polymer-project.org/)
* [something called rocket](https://rocket.modern-web.dev/)
* [colossal sister](https://www.thisiscolossal.com/2019/11/sister-siqi-song/)

------------------------------------

* [hyperswarm-web](https://github.com/RangerMauve/hyperswarm-web)
* [multiserver dht](https://github.com/staltz/multiserver-dht)

---------------------------------------

## 1-21-2021

I don't know what I'm working on right now and that bothers me. I would like to have a single thing that I'm devoting energy to. Instead it's like a blur of different projects. I need to make sense of the decentralized things -- `hyper*`, 3box, textile, ssb, ceramic, render.com, fission. That could be a thing in it's own right -- finding an 'ideal stack' of decentralized things. Yes, that's the next thing after I get an ssb version of eventual-gram ready.

Life has a strange feeling at the moment. It's like i don't know what I'm working on, and it feels like I'm always busy, but I'm never getting anything done.

Add to that I've just regrown my brain 🧠 and I'm always worried that I'm just dumber now and life is more confusing and frustrating for that reason.

I'm looking for a way to deal with life, i suppose, to make some sense of the blur of things. In the past I think I just felt better about it. I don't know.

-------------------------------------------

## 1-22-2021

### speakeasy -- WebNative: How to put a full stack directly in the browser

https://www.inkandswitch.com/local-first.html

---------------------------------------------

## 1-24-2021

* https://twitter.com/emmibevensee/status/1323350970496032769?s=20
* https://foundation.mozilla.org/en/blog/fellow-research-decentralized-web-hate/
* https://rebelliousdata.com/p2p/

----------------------------------------------

## 1-26-2021
* https://offbase.org/
* [pillow fight podcast](https://anchor.fm/yamini-nambimadom)

---------------------------------------

## 1-28-2021
The internet is not working this morning, the day I have a job interview.

* https://polkadot.network/
* https://ceramic.network/

------------------------------------

## 1-29-2021

* [ssi](https://www.youtube.com/watch?v=djhYZZ3CkuM)
* https://www.brightid.org/
* [cli thing](https://clig.dev/)

Tried looking in the `patchwork` source for how they do the avatar images for a person who doesn't have an avatar, but couldn't find something helpful. I guess it's searching npm & google now.

----------------------------------------------

## 1-30-2021

* https://www.ribbonfarm.com/
* [handshake](https://hsd-dev.org/)

---------------------------------------------

## 2-1-2021

* [the reboot -- breaking tech open](https://thereboot.com/breaking-tech-open-why-social-platforms-should-work-more-like-email/)
* http://hungrycatdaily.com/
* [Making the Webnative SDK and Fission app publishing great for Elm apps](https://talk.fission.codes/t/making-the-webnative-sdk-and-fission-app-publishing-great-for-elm-apps/1492)
* [Moonbeam Monthly Dispatch](https://www.purestake.com/blog/moonbeam-january-2021/)


--------------------------------------------

## 2-2-2021

### done
* https://firehydrant.io/


------------------------------------------------

## 2-4-2021
* [ssb-photos](https://github.com/regular/ssb-photos)

--------------------------------------------------

## 2-5-2021
* [signal hub](https://github.com/mafintosh/signalhub)
* [gist -- substack/swarmchat.js](https://gist.github.com/substack/0177839f57e8fe0fc294)
* [olaf -- A P2P Dat-powered chat](https://github.com/geut/olaf)
* [geut / dat-workshop](https://github.com/geut/dat-workshop)
* [Introducing: The Permanent Seeder](https://geutstudio.com/blog/introducing-permanent-seeder/)
* [Running a distributed blogging engine in a browser](https://blog.offbase.org/post/offpress-a-distributed-browser-cms-over-git/)
* https://offpress.app/
* [moose friends](http://moose-team.github.io/friends/)
* [webrtc-swarm](https://github.com/mafintosh/webrtc-swarm)



https://gist.github.com/substack/0177839f57e8fe0fc294
```js
swarm.on('peer', function (stream, id) {
  console.log('CONNECTED', id)
  streams[id] = stream
  onend(stream, function () { delete streams[id] })

  stream
    .pipe(split())
    .pipe(through(function (line, enc, next) {
      var parts = line.toString().split(',')
      var msg = parts.slice(1).join(',')
      var msgid = parts[0]

      // this is where we add an incoming msg to our UI
      if (addMsg(msgid, msg) === false) return next()

      Object.keys(streams).forEach(function (sid) {
        if (sid === id) return
        // this is where we broadcast an incoming msg to the other peers
        streams[id].write(line + '\n')
      })

      next()
    }))
})
```


-----------------------------------------------

## 2-6-2021

* https://www.usepearl.com/
* https://www.wtf.horse/
* https://css-tricks.com/water-css/
* https://css-tricks.com/no-class-css-frameworks/
* https://orbitdb.org/

-----------------------------------------------

## 2-7-2021
* https://github.com/e-e-e/hyper-graph-db
* https://github.com/mafintosh/hyperdb
* https://github.com/geut/olaf
* https://gist.github.com/substack/0177839f57e8fe0fc294

----------------------------------------------------

## 2-9-2021
* http://broccolini.net/
* https://github.com/inkandswitch/cambria
* https://inkandswitch.github.io/cambria/

* [Fission Constellation](https://talk.fission.codes/t/joining-the-fission-constellation-provider/1464)
* [IPFS in Brave](https://blog.ipfs.io/2021-01-19-ipfs-in-brave/)
* [signal -- The ecosystem is moving](https://signal.org/blog/the-ecosystem-is-moving/)

--------------------------------------------------

## 2-10-2021
Watched [fission video chat](https://lu.ma/zbr4kb3k) tpday.

**project cambia**
An *ink & switch* project. 

* https://www.inkandswitch.com/cambria.html
* [Evergreen elm](https://www.youtube.com/watch?v=4T6nZffnfzg)
* [Headless Ghost and Fission](https://blog.fission.codes/headless-ghost-blog-fission/)

-----------------------------------------

## 2-13-2021

* [vmin css](http://thenewcode.com/1137/MinMaxing-Understanding-vMin-and-vMax-in-CSS)

------------------------------------------------

## 2-14-2021

* [speakeasy - what's new in npm](https://www.youtube.com/watch?v=oJLVTaOmlWg)
* [next no js thing](https://next-no-js.vercel.app/)
* [ctzn testnet saturday](https://www.youtube.com/watch?v=HfaDJ_MsMNI)
* [cool shirts](https://roryblank.bigcartel.com/)
* [shelly duvall](https://www.hollywoodreporter.com/features/searching-for-shelley-duvall-the-reclusive-icon-on-fleeing-hollywood-and-the-scars-of-making-the-shining)
* [rxdb](https://github.com/pubkey/rxdb)
* [micro-site](https://github.com/voightco/micro-site) -- Opinionated micro front-end that can be used to create a one-pager. Great for landing pages or sign-up pages. It uses the static site generator Eleventy (11ty) under the hood and sets common 11ty defaults.
* [remotion](https://github.com/JonnyBurger/remotion) -- creating videos programmatically using React.
* [New SSB Database (FOSDEM 2021)](https://www.youtube.com/watch?v=efzJheWQey8)
* [private party](https://party.lol/) -- browser extension
* https://trentwalton.com/

--------------------------------------------

* https://ssbc.github.io/scuttlebutt-protocol-guide/
* [So You Want to Build a P2P Twitter with E2E Encryption?](https://hackernoon.com/so-you-want-to-build-a-p2p-twitter-with-e2e-encryption-f90505b2ff8)
* [tox](https://tox.chat/)

-----------------------------------------------

## 2-15-2021

* [same energy](https://same.energy/)

-----------------------------------------------

## 2-16-2021

There is enough free things now that you can properly play in the world. Like I just deployed a [signalhub](https://github.com/mafintosh/signalhub) to a heroku domain from the button on the signalhub readme. I don't really know how it all works, the signalhub deployment, and that bugs me. What source code is heroku using? But that's not relevant to today's stuff.

I'm starting to enjoy this whole being unemployed thing. I finally have time to learn about all these random things. There are so many random things in the world.

I'm still travelling back in time ~5 years, looking at hyperlog and signalhub and webrtc-swarm. This is an interesting point in time. It *feels* like there is much less energy now towards experiments with p2p things. But there are some companies now

* textile
* ceramic
* fission

Maybe this is the end of an era so to speak. No more "centralized" services. It's kind of interesting to consider how to monetize p2p stuff. That's a rabbit hole I don't have time for at this time of night.

Spent the evening using signalhub and webrtc-swarm to make a chatting thing -- https://github.com/nichoth/hub-life . Or you can use the app here -- https://hub-life.netlify.app/ . It based on [this demo](https://gist.github.com/substack/0177839f57e8fe0fc294) from substack. I'm kind of amazed that you can deploy something like this for free. It's an important feeling -- that you are getting something for free. That why people like bicycles and sailing so much I think. 

--------------------------------------------

## 2-20-2021

* https://ishadeed.com/article/css-grid-minmax/
* https://github.com/sass/sass/issues/2849

# development diary
#dev-diary 

Have spent the last few days fiddling with css & html for [my website](https://nichoth.com/) . I guess it's ok looking. A lot of dealing with css grid… `grid` was supposed to make everything so much easier… Also have made a [GH org](https://github.com/snail-studios) for the design company that I guess I am a part of. Erin wanted to start a company. Starting a company with someone… it's like the contemporary version of marriage. 

A memory keeps floating through my mind. It's stuck there permanently apparently. My CS teacher in college once said "programming is like juggling. When you first start out you can juggle maybe 3 balls. And the best juggler in the world can juggle maybe like 9 balls. It's not like the best person can juggle 1 million balls."

For those just tuning in to the saga, I crashed a bicycle and almost died a while ago, and after having lost my brain and semi-regrown it, that feels right. It still always feels the same writing code, weirdly. There is always the same level of frustration and challenge. But the difference is that when your brain is missing you are working on much 'easier' things. It doesn't feel any harder, you just do less work.

---------------------------------------

## 2-25-2021
Electron won this round. Or maybe it was GH actions that won. Anyway, haven't figured out how to make GH actions build an electron app. I did the instructions that it says in [this repo](https://github.com/samuelmeuli/action-electron-builder). Using [this demo repo](https://github.com/nichoth/my-app) for now. The odd part is that it works fine to build it on my local computer, but when it's built by the GH action, and I start the app via terminal, it says it can't resolve some local files. Now I could either start looking at Gh actions and go down that rabbit hole until I understand them completely, or say 'ok', and keep working on the app, and just manually upload the release binaries to GH.

I think it will be uploading binaries for now. Then if the app ever get to a point where I feel ok about it, looking at the GH action more.

It has been humbling to work with electron, I will say that.

In other battles, I have been thinking about how to deal with client side routes. I thought about writing about it, but it's not really interesting enough to get into. Basically the state/functionality for routes is slightly duplicated -- there is a 'router' but also part of the app state called 'route', that also gets matched against a router. 

---------------------------------

## 2-26-2021

* Attention is a limited quality that should be preserved

## 2-28-2021
* https://web.dev/streams/
* https://blog.ceramic.network/the-evolution-of-digital-identity-from-key-pairs-to-dids-and-idx/

## 3-2-2021
Today have figured out the psych-city bug -- it was not running `eleventy` to build the site as part of the build script. I didn't notice it on my local machine because it would run `eleventy --serve`.

Also have updated the nav and spacing on my website.

-----------------------------

* https://virtualcoffee.io/
* https://css-tricks.com/getting-deep-into-shadows/
* https://github.com/piscinajs/piscina
* https://twitter.com/MessariCrypto/status/1364969826406584330?s=20

-----------------------------------------------

## 3-3-2021

Did the tinaCMS [introductory tutorial](https://tina.io/docs/getting-started/introduction/)

Need to learn how to do backend

* github
* git
* strapi

Looked at tinaCMS quite a lot today. I have a feeling that we should avoid it as much as possible, unless the client wants something more wysiwyg than netlify CMS can offer.

-------------------------------------------

## 3-4-2021

* https://www.conic.style/
* http://solarprotocol.net/
* https://concordant.io/
* https://kodadot.xyz/
* https://help.space.storage/
* https://blog.fleek.co/posts/introducing-space-sdk-release
* [Welcome GunDB to our Open Web Protocol Stack](https://blog.space.storage/posts/welcome-gundb-to-open-web-protocol-stack)
* https://orbitdb.org/
* https://peergos.org/
* https://pinata.cloud/
* https://ctznry.com/
* https://ctznry.com/wizardamigos@ctzn.one
* https://virtualcoffee.io/
* https://radicle.xyz/
* https://www.honeycomb.io/
* https://linktr.ee/toolongdidntwatch
* https://cblgh.org/
* [The World Needs Cabal.Chat](https://medium.com/equilibriumco/the-world-needs-cabal-chat-7d25f4055e11)
* https://www.meownica.studio/
* https://github.com/libp2p/specs/tree/master/pubsub/gossipsub
* https://github.com/ChainSafe/js-libp2p-gossipsub
* https://smolcss.dev/
* https://rachsmith.com/the-tech-setup-for-this-blog-ghost-gatsby/
* [Keychron K3 Ultra-slim Wireless Mechanical Keyboard](https://www.keychron.com/products/keychron-k3-wireless-mechanical-keyboard)
* https://www.lataco.com/mural-project-compton/
* [Gateways to the Decentralized Web: How to update Google Chrome and Firefox for Web3](https://medium.com/unstoppabledomains/gateways-to-the-decentralized-web-how-to-update-google-chrome-and-firefox-for-web3-34a497c8f33c)
* [wicked cool kit](https://wickedcoolkit.com/)
* https://www.thisiscolossal.com/2021/02/oneclock-alarm/
* https://github.com/Ethan-Arrowood/undici-fetch
* https://github.com/nodejs/undici

-----------------------------------

* [A Complete Beginner's Guide to React](https://www.youtube.com/watch?v=9DFjKFMdboc)
* [A Complete Beginner's Guide to React](https://welearncode.com/beginners-guide-react/)


## 3-5-2021
* https://smolcss.dev/
* https://github.com/ChainSafe/js-libp2p-gossipsub
* https://medium.com/equilibriumco/the-world-needs-cabal-chat-7d25f4055e11
* [substacks cabal zine](https://substack.net/zine/cabal.html)
* https://cblgh.org/

-----------------------------------------------

## 3-8-2021
* https://harperdb.io/

------------------------------------------

## 3-9-2021
* [fugu chrome browser](https://twitter.com/feross/status/1369149438560587778)

------------------------------

## 3-11-2021
* https://blog.ceramic.network/ceramic-network-clay-testnet/

----------------------------

## 3-13-2021
* https://flaviocopes.com/html-picture-tag/
* https://www.geeksforgeeks.org/html-picture-tag/


------------------------------------------------------------

## 3-18-2021

* https://decentpatterns.xyz/
* https://decentpatterns.xyz/report/

See how much you can break down the ssb pattern. Can you pipe through ssh, private-box, and hyper-swarm?

The hyper pattern would be `hyperdrive` for blobs and `byperbee` for posts & metadata probably.

What is `signal-hub`?

---------------------------------------------------------

## 3-19-2021

* [decentralized pattern library](https://decentpatterns.xyz/library/)

----------------------------------------

### signalhub

`webrtc-swarm` calls `hub.subscribe(uuid)` on `hub`

`hub.subscribe('all')`

I think signal-hub is the precursor to a direct p2p connection. A value (the url) known by all potential peers so that you have a way to meet new peers.


-----------------------------------------

## 4-10-2021

### What am I doing?
* pwa-demo
* flobz

----------------------------------------

## 5-7-2021

* [Build a SaaS Platform with Stripe](https://jonmeyers.io/blog/build-a-saas-platform-with-stripe)
* [radix-ui](https://radix-ui.com/primitives/docs/components/hover-card)
* [George](https://georgefrancis.dev/)
* [fluid typepgrphy](https://fluid-typography.netlify.app/)

------------------------------------

* [Serverless File Uploads](https://www.netlify.com/blog/2016/11/17/serverless-file-uploads/)
* [serverless pattern](https://www.netlify.com/blog/2016/09/15/serverless-jam-a-serverless-framework-tutorial/https://www.netlify.com/blog/2016/09/15/serverless-jam-a-serverless-framework-tutorial/)

------------------------------

## 5-8-2021

* https://www.npmjs.com/package/merkle-tree-stream


-----------------------------------

## 5-21-2021

* [Run Node.js natively in your browser](https://blog.stackblitz.com/posts/introducing-webcontainers/)
* https://github.com/stackblitz/webcontainer-core

------------------------------------

* https://web.dev/file-system-access/

* https://smoothfriend.press/

------------------------------------------

## 5-23-2021

* https://developers.idx.xyz/learn/welcome/

-------------------------------------

## 5-24-2021

* https://distributed.press/ -- Distributed Press is an open source publishing tool for the World Wide Web and DWeb. It automates publishing and hosting content to the WWW that it seeds to Hypercore and IPFS. We are currently adding new features to deliver verifiable content to decentralized social networks like Aether and Scuttlebutt.
* [hypha coop](https://hypha.coop/)
* [RangerMauve/hyperbee-indexed.md](https://gist.github.com/RangerMauve/ae271204054b62d9a649d70b7d218191)
* [RangerMauve/hyperbeedeebee](https://github.com/RangerMauve/hyperbeedeebee)
* [Picture perfect image optimization for any web framework](https://bholmes.dev/blog/picture-perfect-image-optimization/)
* [My current HTML boilerplate](https://www.matuzo.at/blog/html-boilerplate/)
* [Build a SaaS Platform with Next.js, Prisma, Auth0 and Stripe](https://jonmeyers.io/series/build-a-saas-platform-with-next-js-prisma-auth0-and-stripe)
* [The headless editor framework for web artisans.](https://www.tiptap.dev/)

--------------------------------------------------

## 6-13-2021
* [react explanations like you're five](https://github.com/reactwg/react-18/discussions/46#discussioncomment-846650)
* [The Epicenter of Crime: The Hunt’s Donuts Story](https://www.foundsf.org/index.php?title=The_Epicenter_of_Crime:_The_Hunt%E2%80%99s_Donuts_Story)
* [DevTools Tips](https://devtoolstips.org/)
* [The art of Frontend Engineering](https://www.narative.co/articles/the-art-of-frontend-engineering)
* [http://younglearnersguide.com/](http://younglearnersguide.com/)
* [https://devjobs.page/](https://devjobs.page/)
* [https://github.com/alpinejs/alpine](https://github.com/alpinejs/alpine)
* [https://alpinejs.dev/](https://alpinejs.dev/)
* [https://make8bitart.com/](https://make8bitart.com/)
* [https://potch.github.io/layers.js/](https://potch.github.io/layers.js/)
* [https://goshippo.com/](https://goshippo.com/)
* [CSS! Everyone's favorite programming language](https://changelog.com/jsparty/176)
* [Meet :has, A Native CSS Parent Selector](https://www.smashingmagazine.com/2021/06/has-native-css-parent-selector/)
* [astro](https://astro.build/blog/introducing-astro)
* [Flat Data](https://octo.github.com/projects/flat-data?utm_source=dlvr.it&utm_medium=twitter)
* [planetscale db](https://www.planetscale.com/)
* [frog stuff](https://rainylune.com/)


------------------------------------------

## 6-19-2021

* https://artlessdevices.com/
* https://forum.artlessdevices.com/
* https://forum.artlessdevices.com/t/the-tyranny-of-openness-what-happened-to-peer-production/169/10

---------------------------------------------

## 6-26-2021

rxdb -- realtime replication with any CouchDB compliant endpoint and also with custom GraphQL endpoints

* [::file-selector-button](https://developer.mozilla.org/en-US/docs/Web/CSS/::file-selector-button)
* [Variable Aspect Ratio Card With Conic Gradients Meeting Along the Diagonal](https://css-tricks.com/variable-aspect-ratio-card-with-conic-gradients-meeting-along-the-diagonal/)
* [Auto-Generated Social Media Images](https://css-tricks.com/auto-generated-social-media-images/)
* [Container Queries in Web Components](https://mxb.dev/blog/container-queries-web-components/)
* [Hypercore Protocol Dev Update - Multiwriter/Networking](https://www.youtube.com/watch?v=7S-D4yY1H48)

## 7-1-2021

* [A closer look at the new Glitch starter apps](https://blog.glitch.com/post/a-closer-look-at-the-new-glitch-starter-apps)
* [Data-driven full stack apps — running instantly!](https://blog.glitch.com/post/data-driven-full-stack-apps-running-instantly)
* [https://css-ch-typography.glitch.me/](https://css-ch-typography.glitch.me/)

## 7-6-2021

* [supabase](https://supabase.io/) -- a database thing
* [Hack the “Deploy to Netlify” Button Using Environment Variables to Make a Customizable Site Generator](https://css-tricks.com/hack-the-deploy-to-netlify-button-using-environment-variables-to-make-a-customizable-site-generator/)
* [Saving data to Supabase and getting it back again](https://dev.to/netlify/saving-data-to-supabase-and-getting-it-back-again-59ee)

## 7-7-2021

* [Leyline Core](https://github.com/AljoschaMeyer/leyline-core)
* [bamboo](https://github.com/aljoschameyer/bamboo)
* [p2panda](https://p2panda.org/)
* [p2panda / p2panda](https://github.com/p2panda/p2panda)

## 7-9-2021

* [tonic, a component framework](https://tonicframework.dev/)

## 8-7-2021

https://www.youtube.com/watch?v=u7_dUCHYaGI

Learning about cryptography.

### Secure games

Hash the move and the salt together, announce the hash; the other player acknowledges the receipt of the hash.

Then you reveal what the hash content is, b/c you can't change the content at this point


## 8-12-2021

* [A future for SQL on the web](https://jlongster.com/future-sql-web)


-------------------------------------------

## 9-24-2021

I spent the day looking at jest (the test tool) today. I notice that there is no compilation step, which means that either it's built into jest, node can read `import` statements on it's own, or it is a part of the typescript 'transform' in jest, `ts-jest` … I suppose I'm just writing things that I noticed now, as this is not really specific to fission, and not a 'support' request. 

-------------------------------------------------

## 10-13-2021

* https://onezero.medium.com/the-dark-forest-theory-of-the-internet-7dc3e68a7cb1


------------------------------------------

## 10-14-2021

* [fly.io blog about tokens](https://fly.io/blog/api-tokens-a-tedious-survey/)

--------------------------------------------

## 11-2-2021

* https://github.com/libp2p/specs/tree/master/pubsub/gossipsub

-----------------------------------------------------

## 11-7-2021

* [video -- fission, ipfs](https://talk.fission.codes/t/brooklyn-zelenka-talk-notes-video-feb-13th/494)

------------------------------------------------

## 11-8-2021

* [Cloudflare goes InterPlanetary - Introducing Cloudflare’s IPFS Gateway](https://blog.cloudflare.com/distributed-web-gateway/)
* [Distributed Web Gateway](https://www.cloudflare.com/distributed-web-gateway/)
* [End-to-End Integrity with IPFS](https://blog.cloudflare.com/e2e-integrity/)
* [cloudflar/workers-chat-demo](https://github.com/cloudflare/workers-chat-demo)
* [Using Fission with Elm – Part 3: Adding authentication and using the Fission Drive](https://dev.to/xeticode/using-fission-with-elm-part-3-adding-authentication-and-using-the-fission-drive-3fig)

-------------------------------------------------

## 11-9-2021

* https://github.com/nichoth/orbit-npp
* https://github.com/nichoth/hub-life -- the signalhub demo
* https://github.com/mafintosh/signalhub

-----------------------------------------------

## 11-10-2021

* [SSB HTTP Authentication](https://ssb-ngi-pointer.github.io/ssb-http-auth-spec/)
* setup a netlify site for planetary
* setup lambda functions
* created a DB

-------------------------------------------------

## 11-11-2021

* [a good talk about npm, hypercore](https://discord.com/channels/709519409932140575/709522119335346196/908252083919147039)

-------------------------------------------

## 11-14-2021

Css stuff

* [The Simplest Way to Load CSS Asynchronously](https://www.filamentgroup.com/lab/load-css-simpler/)
* [filamentgroup/loadCSS](https://github.com/filamentgroup/loadCSS/)
* [addyosmani/critical-path-css-demo](https://github.com/addyosmani/critical-path-css-demo)
* [addyosmani/critical](https://github.com/addyosmani/critical)
* [clean-css/clean-css-cli](https://github.com/clean-css/clean-css-cli)
* [uncss/uncss](https://github.com/uncss/uncss)

-------------------------------------------------------

* [hub-life](https://github.com/nichoth/hub-life) is the p2p example that I made with heroku

---------------------------------------------

## 11-17-2021

[Netlify Raises $105 Million to Transform Development for the Modern Web](https://www.netlify.com/press/netlify-raises-usd105-million-to-transform-development-for-the-modern-web)

---------------------------------------------------

## 11-19-2021

* [How to Host Your IPFS Files Online Forever](https://medium.com/ethereum-developers/how-to-host-your-ipfs-files-online-forever-f0c56b9b5398)
* [fission -- Concepts](https://guide.fission.codes/developers/concepts)

-----------------------------------------

## 11-27-2021

* [remix.run](https://remix.run/)

---------------------------------------------

## 12-1-2021

[WNFS-Go & Qri](https://www.youtube.com/watch?v=Hum5vfaQ9e8)

------------------------------------

## 12-4-2021

* [The IPFS Cloud](https://medium.com/pinata/the-ipfs-cloud-352ecaa3ba76)
* [Tutorial: Setting up an IPFS peer, part I](https://medium.com/textileio/tutorial-setting-up-an-ipfs-peer-part-i-de48239d82e0)
* [Build a Decentralized Chat App with Knockout and IPFS](https://medium.com/textileio/build-a-decentralized-chat-app-with-knockout-and-ipfs-fccf11e8ce7b)
* [The IPFS Gateway Problem](https://medium.com/pinata/the-ipfs-gateway-problem-64bbe7eb8170)
* [Announcing Cloudflare R2 Storage: Rapid and Reliable Object Storage, minus the egress fees](https://blog.cloudflare.com/introducing-r2-object-storage/https://blog.cloudflare.com/introducing-r2-object-storage/)

--------------------------------------------

## 2-13-2022

* [How to build an HTML-only accordion — no JavaScript required](https://whitep4nth3r.com/blog/how-to-build-html-accordion-no-javascript)
* [local first tweet](https://twitter.com/housecor/status/1492203985335373825?s=20&t=MPUlU8cKyJLdZDFGesLvUQ)

------------------------------------------------

* [Let's say you're hosting an application on 
@Vercel (or whatever), you have a managed database, but you need a cache (to avoid repeated API requests, with a TTL).](https://twitter.com/JasonEtco/status/1490377350055346180)


## 2-27-2022

### WNFS version 2

https://talk.fission.codes/t/wnfs-v2-munch-learn/2517

"Consider Nonlocal Concurrency" -- :38 minutes



## 2-28-2022

### Governing the Commons, ch 2

CPR -- common pool resource

What is the resource in this case?

How relevant is this to internet communities? Typically things scale
differently on the web, which is what makes it interesting. For example, you
can make infinite copies of things. What is a resource here? I feel like
governance in this context is about banning certain identities from a
community. A community being like a pub in ssb -- a group of people who are able to easily communicate.

### stuff

* [feross/infire-app-cache](https://github.com/feross/infinite-app-cache)
* [wmr](https://github.com/preactjs/wmr)


## 3-3-2022

* [https://web.dev/uses-passive-event-listeners/](Use passive listeners to improve scrolling performance)
* [Peritext -- A CRDT for Rich-Text Collaboration](https://www.inkandswitch.com/peritext/)
* [You can create a 𝗽𝗿𝗼𝗴𝗿𝗲𝘀𝘀 𝗯𝗮𝗿 with just one line of HTML code by using a
  progress tag](https://twitter.com/Amit_T18/status/1497887266424852480?s=20&t=233a4lwwPJBI7V_hKsnkGw)

----------------------------------------

* [Let's say you're hosting an application on @Vercel (or whatever), you have a managed database, but you need a cache (to avoid repeated API requests, with a TTL). ](https://twitter.com/JasonEtco/status/1490377350055346180)
* [Aspect Ratio is Great](https://css-irl.info/aspect-ratio-is-great/)
* [video -- Build A Next.js App with Prisma and PlanetScale](https://www.youtube.com/watch?app=desktop&v=JtqdAn_wYzY&ab_channel=PlanetScale)
* [SO COOL!! Cross-device chat over Bluetooth is the local-first dream! And now anyone can build their own offline-first mobile app using libp2p! So cool!!](https://twitter.com/momack28/status/1492087705081204736?s=20&t=2Vl5RkWNeij0idXmriLXnA)
* [The cross-platform BLE transport for @libp2p was merged into gomobile-ipfs last month, with example code in the repo.](https://twitter.com/dietrich/status/1492074129566093313?s=20&t=2Vl5RkWNeij0idXmriLXnA)
* [Decentralization -- podcast with Brooklyn](https://console.dev/podcast/s02e04-decentralization-brooklyn-zelenka-fission/)
* [you know you can truncate text at a specific number of lines using CSS line-clamp property](https://twitter.com/_georgemoller/status/1492454516377141253?s=20&t=MPUlU8cKyJLdZDFGesLvUQ)
* [Progressive Decentralization: A Playbook for Building Crypto Applications](https://variant.fund/writing/progressive-decentralization-a-playbook-for-building)
* [stylelint](https://stylelint.io/user-guide/rules/list/no-duplicate-selectors/)
* [Some useful HTML tricks you should know.](https://twitter.com/codewithhajra/status/1492144616124133380?s=20&t=HsKZeAXayMlo-ctyfbxggA)
* [create an accordion element in HTML without JavaScript](https://twitter.com/csaba_kissi/status/1493483049765515265?s=20&t=OM_P2sx_Ao8Op8MNa62F7A)
* [podcast -- Supabase is all in on Postgres](https://changelog.com/podcast/476)
* [live read replication working for Litestream.](https://twitter.com/benbjohnson/status/1494800752333647872?s=20&t=6SObZ-zdc2DRPKa1d0idfA)
* [Litestream Read Replica Demo](https://github.com/benbjohnson/litestream-read-replica-demo)
* [Everything you need to know about monorepos, and the tools to build them.](https://monorepo.tools/)
* [This demo shows a SQLite database on @flydotio with a primary in one region accepting writes and replicating them out to database replicas in a bunch of other regions 🤯](https://twitter.com/simonw/status/1494805788329578498?s=20&t=aJUBFNaPAYnRCQw32EUDzw)


## 3-19-2022

[the-cryptic-filesystem](https://blog.mediocregopher.com/2022/01/23/the-cryptic-filesystem.html)

> The gossipsub library which is built into libp2p seems like a good starting place. It’s optimized for WANs and, crucially, is already implemented.

  - [gossipsub section](https://blog.mediocregopher.com/2022/01/23/the-cryptic-filesystem.html#gossip)

[How to Secure a Webapp](https://blog.mediocregopher.com/2021/07/14/how-to-secure-a-webapp.html)

[The Case for Open Infrastructure](https://blog.mediocregopher.com/2022/03/13/the-case-for-open-infrastructure.html)


## 4-6-2022

[Sizzler Promotional Commercial 1991](https://www.youtube.com/watch?v=E3YGtQ40Qvs&ab_channel=RachelRedhouse)

## 4-7-2022

* [radix-ui](https://www.radix-ui.com/)
* [FormData API](https://developer.mozilla.org/en-US/docs/Web/API/FormData)
* [border-image in CSS](https://twitter.com/Steve8708/status/1511912289724616704?s=20&t=Zif6NhC92FBIS7aGQtfQbw)


## 4-23-2022

* [You can customize first letter of a word / paragraph in just a few seconds using CSS only.](https://twitter.com/Prathkum/status/1351199442590904322?s=20&t=4IXS9X2bWJpMlKoZ32gokg)
* [A long thread of CSS tips and tricks](https://twitter.com/Prathkum/status/1516482529695608840?s=20&t=4IXS9X2bWJpMlKoZ32gokg)
* [Defining the web3 stack](https://edgeandnode.com/blog/defining-the-web3-stack)
* [Create Ultra App](https://github.com/exhibitionist-digital/create-ultra-app)
* [Ultra](https://ultrajs.dev/)
* [Check for your fonts locally, only download them as a fallback](https://twitter.com/builderio/status/1516553394231644166?s=20&t=_ZhSVfei1w5eCpXhM2sUEQ)
* [what are Edge Functions?](https://twitter.com/whitep4nth3r/status/1516699390097960962?s=20&t=BQERjVWWKSa4YFSQrJiVnQ)
* [@nodejs supports data: imports?](https://twitter.com/pawelgrzybek/status/1516467031461216267?s=20&t=BQERjVWWKSa4YFSQrJiVnQ)
* [With a new feature like Edge Functions, you’re probably wondering, “Does it work with my framework?”](https://twitter.com/Netlify/status/1516826820431126530?s=20&t=1RPpWn-dPH1C1wO84GN4XA)
* [Hydration is Pure Overhead](https://www.builder.io/blog/hydration-is-pure-overhead)
* [riffle](https://riffle.systems/essays/prelude/)
* [obsidian](https://obsidian.md/)
* [Mauve -- blog -- p2p protocols](https://blog.mauve.moe/posts/protocol-comparisons)
* [Achieving Paretotopia with Regenerative Cryptoecon - Juan Benet](https://www.youtube.com/watch?v=B-dd2ZRlymo&ab_channel=GitcoinMedia)
* [Taking the Mauve Pill: Exploring Alternatives to the Centralized Web](https://hypha.coop/dripline/p2p-primer-part-1/)

------------------------

* [understand what it means to come back from a stroke](https://twitter.com/misprintedtype/status/1516674413000859650?s=20&t=_ZhSVfei1w5eCpXhM2sUEQ)

## 4-25-2022

* [stytch -- authentication platform](https://stytch.com/?utm_source=newsletter&utm_medium=paid_newsletter&utm_campaign=cassidoo-april&utm_content=main-2)
* [Building a WebAssembly-powered serverless platform](https://blog.scottlogic.com/2022/04/16/wasm-faas.html)
* [radix UI Libeblocks](https://www.radix-ui.com/case-studies/liveblocks)
* [Hooks, Dependencies and Stale Closures](https://tkdodo.eu/blog/hooks-dependencies-and-stale-closures)
* [CDNs and the Filecoin Retrieval Market](https://filecoin.io/blog/posts/cdns-and-the-filecoin-retrieval-market/)


## 4-27-2022

[read more about UCANs](https://fission.codes/blog/verifying-ucans/#a-concrete-example)

UCAN example:

```js
{
  iss: "did:key:zAlice", // issuer
  aud: "did:key:zstoragely", // audience
  exp: <now + 30 seconds>, // expiration
  att: [ // attenuation
    { // a capability
      with: "storagely:/documents/dnd/miranda_lovelace.pdf", // resource
      can: "http/PUT" // ability
    }
  ],
  prf: [] // proofs
}
```

The audience here is the service you are using. The UCAN says "I am allowing this service to write to this location".

I would have expected the `iss` and `aud` fields to be backwards. I would expect it to say, "I, the service, allow audience Alice to write a document here"

The example is self-signed by Alice. The service here still needs to check out of band of the UCAN chain if Alice is allowed to write.


## 4-28-2022

* [zag](https://zagjs.com/)

## 5-3-2022
* [random numbers in node, a gist](https://gist.github.com/joepie91/7105003c3b26e65efcea63f3db82dfba)
* [Why I don't miss React: a story about using the platform](https://www.jackfranklin.co.uk/blog/working-with-react-and-the-web-platform/)
* [In case you missed it, the new @remix_run K-Pop stack will let you spin up:](https://twitter.com/jlengstorf/status/1521209429055590401?s=20&t=q0pMdfh0DsPpTD1lm3JD-g)
* [Deploying a React app with Serverless Studio](https://socketsupply.co/blog/guide-react/)
* [tradle / why-hypercore ](https://github.com/tradle/why-hypercore)

## 5-8-2022
* [Replace Text & Images Using Edge Functions and HTMLRewriter](https://www.learnwithjason.dev/blog/html-transform-edge-function)
* [twizzler OS](https://twizzler.io/)
* [HAVE YOU TRIED RUBBING A DATABASE ON IT?](https://www.hytradboi.com/)
* [pranadb](https://github.com/cashapp/pranadb)
* [delta, a git diff thing](https://dandavison.github.io/delta/installation.html)
* [why-hypercore](https://github.com/tradle/why-hypercore)
* [Deploy Your Remix + Supabase App Today!](https://www.netlify.com/blog/deploy-your-remix-supabase-app-today!/?utm_source=twitter&utm_medium=kpopstack&utm_campaign=devex-jl)
* [New blog on my experiments of Astro and service workers](https://twitter.com/passle_/status/1522504926420774917?s=20&t=NkO_wIF7-Prgu0NlC1vODA)
* [Joining Remix](https://blog.jim-nielsen.com/2022/joining-remix/)
* [Making CRDTs Byzantine fault tolerant](https://speakerdeck.com/ept/making-crdts-byzantine-fault-tolerant)
* [Why I don't miss React: a story about using the platform](https://www.jackfranklin.co.uk/blog/working-with-react-and-the-web-platform/)
* [Fission Reactor: Dialog First Look](https://fission.codes/blog/fission-reactor-dialog-first-look/)
* [Merge what you can, fork what you can't: managing data integrity in local-first software](https://dl.acm.org/doi/abs/10.1145/3517209.3524041)


## 5-11-2022
* [I'm All-In on Server-Side SQLite](https://fly.io/blog/all-in-on-sqlite-litestream/)
* [A few of my favorite well-supported modern CSS features](https://twitter.com/argyleink/status/1523867688849666048?s=20&t=NKa7i0UvHIByba1RbQt_kw)
* [Fitting Everything Together](https://0pointer.net/blog/fitting-everything-together.html)
* [mycelial technology](https://mycelial.technology/)
* [mfowler.info](https://mfowler.info/)

-------------------------------

* [replicache](https://replicache.dev/)
* [replicache announcement tweet](https://twitter.com/aboodman/status/1524085188082294785?s=20&t=rgXtsOkQhKa4-Ftfxr6QDQ)
* [Little story about "ajax"](https://twitter.com/aboodman/status/1524157782177447936?s=20&t=blUVnAg4RRrIGAZOA9PGPA)
* [d1 is here — cloudflare first sql database](https://twitter.com/ritakozlov_/status/1524374888596885505?s=20&t=AR9h1CYY7Z8CE-vgNEVlPA)

---------------------------

* [dolt](https://github.com/dolthub/dolt)
* [dolthub -- Dolt Use Cases in the Wild](https://www.dolthub.com/blog/2021-03-09-dolt-use-cases-in-the-wild/)


## 5-17-2022

* [Decentralized software architecture: SACI](https://ethresear.ch/t/decentralized-software-architecture-saci/12643)
* [Build apps for people you care about](https://www.local-first-cooperation.org/)
* [Serving Cloudflare Pages sites to the IPFS network](https://blog.cloudflare.com/cloudflare-pages-on-ipfs/)
* [Bringing page transitions to the web](https://www.youtube.com/watch?app=desktop&v=JCJUPJ_zDQ4&ab_channel=GoogleChromeDevelopers)

* [Proof of Stake and our next experiments in web3](https://blog.cloudflare.com/next-gen-web3-network/)


## 5-20-2022

* [First Look At The CSS object-view-box Property](https://ishadeed.com/article/css-object-view-box/)


## 5-23-2022
* [ndimatteo/HULL](https://github.com/ndimatteo/HULL) -- Headless Shopify Starter – powered by Next.js + Sanity.io
* [ditto](https://www.ditto.live/) -- Real-time sync for apps even without the internet


## 5-30-2022

* [What image format should you use for the best balance of performance and quality? 👇](https://twitter.com/Steve8708/status/1530286144167944192?s=20&t=zRlnR5V4uvsSCJjDTNxphQ)
* [Lens Protocol Front End Starter](https://github.com/dabit3/lens-protocol-frontend)

## 6-6-2022

* [dropdown](https://nextui.org/docs/components/dropdown)
* [eleventy images](https://twitter.com/SaraSoueidan/status/1533468684089536513?s=20&t=ec8gCq_PK7Ghr7MUHWE_Ww)
* [twitter "web 3"](https://twitter.com/CryptoShelbz/status/1518560541291081728)
* [twitter "web 3"](https://twitter.com/MishadaVinci/status/1533444611762315265)
* [css tip - bg pattern](https://twitter.com/ChallengesCss/status/1533032841029763072?s=20&t=BIvzwxOQj0UKpoLbH6IGdw)
* [increase your luck](https://twitter.com/TheAnkurTyagi/status/1533087815755603969?s=20&t=-XsHv6Po3s7dFpWpzCqosQ)
* [full page swipe effect](https://twitter.com/Steve8708/status/1532793202582794241?s=20&t=wUyaEzn10LK6iHg9Hv6Zwg)
* [How Apple makes their beautiful hamburger](https://twitter.com/Steve8708/status/1532364254434578432?s=20&t=FmnSNcopvBrSNOuAKCJEEQ)
* [anatomy of a CID](https://proto.school/anatomy-of-a-cid)
* [react bricks](https://twitter.com/seldo/status/1532121092927565824?s=20&t=ugw9FiHqand7PyvofD-2yg)


## 6-7-2022

* [Fullstack serverless with MongoDB Atlas integration](https://vercel.com/changelog/mongodb-atlas-integration)
* [CSS Tip! ✨ Use `calc` && `scoped` to create a pure CSS expanding gallery view](https://twitter.com/jh3yy/status/1534146966535426048?s=20&t=mEOixDYnIwtVnmCE5mAvow)


## 6-14-2022
* [deno deploy](https://deno.com/deploy)
* [Web Streams Everywhere (and Fetch for Node.js)](https://css-tricks.com/web-streams-everywhere-and-fetch-for-node-js/)
* [wormhole-crypto](https://github.com/SocketDev/wormhole-crypto)
* [What are the main differences between these streams and Node.js streams?](https://github.com/whatwg/streams/blob/main/FAQ.md#what-are-the-main-differences-between-these-streams-and-nodejs-streams)


## 6-25-2022

* [teaful](https://github.com/teafuljs/teaful) -- a state library
* [js-libp2p/examples/libp2p-in-the-browser/](https://github.com/libp2p/js-libp2p/tree/master/examples/libp2p-in-the-browser)
* [dabit3 / lens-protocol-frontend](https://github.com/dabit3/lens-protocol-frontend)
* [ssb paper](https://github.com/dominictarr/scalable-secure-scuttlebutt/blob/master/paper.md)
* [The introduction of mass storage to web apps is a fundamental change](https://twitter.com/aboodman/status/1524157782177447936?s=20&t=blUVnAg4RRrIGAZOA9PGPA)
* [https://litestream.io/](https://litestream.io/)
* [Today, @replicache is entering General Availability!](https://twitter.com/aboodman/status/1524085188082294785)
* [https://mycelial.technology/](https://mycelial.technology/)
* [d1 is here — cloudflare first sql database!](https://twitter.com/ritakozlov_/status/1524374888596885505?s=20&t=AR9h1CYY7Z8CE-vgNEVlPA)
* [A few of my favorite well-supported modern CSS features](https://twitter.com/argyleink/status/1523867688849666048?s=20&t=NKa7i0UvHIByba1RbQt_kw)
* [xstate](https://xstate.js.org/docs/)
* [Fly.io: the Reclaimer of Heroku's Magic](https://xeiaso.net/blog/fly.io-heroku-replacement)
* [riffle](https://riffle.systems/essays/prelude/)
* [As a web3 dev, it took me 4 months to find my first job](https://twitter.com/Haezurath/status/1530204229457125376)
* [AljoschaMeyer/set-reconciliation](https://github.com/AljoschaMeyer/set-reconciliation)

-----------------------------------

* [nanostores / nanostores](https://github.com/nanostores/nanostores)
* [developit / unistore](https://github.com/developit/unistore)
* [teaful](https://github.com/teafuljs/teaful) -- a state library
* [redux-zero / redux-zero](https://github.com/redux-zero/redux-zero)
* [KidkArolis / tiny-atom](https://github.com/KidkArolis/tiny-atom)
* [KwanMan / preact-tiny-atom](https://github.com/KwanMan/preact-tiny-atom)
* [Awesome Preact](https://github.com/preactjs/awesome-preact/blob/master/readme.md#libraries)
* [nanostores/persistent](https://github.com/nanostores/persistent)

---------------------------------------

## 6-28-2022

* [Defensive CSS](https://defensivecss.dev/)
* [Make super cool swipe-over sections like Apple in pure CSS!](https://twitter.com/Steve8708/status/1540794691309805569?s=20&t=mvvEqJW1xtkO_pqX5Ay6fg)
* [How Airbnb makes that cool swipe up drawer on their mobile site in CSS](https://twitter.com/Steve8708/status/1541455876669571072?s=20&t=x-02YQVBP8OWnemt4_QQYg)
* [Data Flow in Remix](https://remix.run/blog/remix-data-flow)
* [Remix: The Yang to React's Yin](https://kentcdodds.com/blog/remix-the-yang-to-react-s-yin)
* [This diagram showcases what makes @remix_run special:](https://twitter.com/housecor/status/1541605649875980289?s=20&t=vsfajkpDjgn-jcoRxQg2IA)
* [http://tef.computer/](http://tef.computer/)
* [Critique: “Remix looks like PHP”.](https://twitter.com/housecor/status/1541785367984148480?s=20&t=bhpNmkVl5qsNs1t45u0klg)
* [Fresh 1.0](https://deno.com/blog/fresh-is-stable)

## 9-2-2022

* [:not(:last-of-type) selector](https://twitter.com/JoshWComeau/status/1565443691120140290?s=20&t=I1uifW32JGM-UPKzTHZdFA)
* [Experimenting with 🚀 @astrodotbuild and the Shared Element Transition API.](https://twitter.com/charca/status/1561830946462384128?s=20&t=1VyXwli2inLmw5TVeEHu2A)
* [the UX tends to fall apart on slow mobile connections. Did you try that?](https://twitter.com/paulo_evpr/status/1561850235777077248?s=20&t=1VyXwli2inLmw5TVeEHu2A)
* [This is what I've had in mind for the web with React Router.](https://twitter.com/ryanflorence/status/1186675229621248000?s=20&t=1VyXwli2inLmw5TVeEHu2A)
* [navigation API](https://developer.chrome.com/docs/web-platform/navigation-api/)

## 9-21-2022

* [5t3ph / 11ty-sass-skeleton](https://github.com/5t3ph/11ty-sass-skeleton)
  -- Featuring absolutely nothing beyond a base HTML5 template and the essential setup to watch and compile your Sass alongside 11ty.
* [I always thought that between the two of us, @jaffathecake did the deep-dives on obscure web stuff on HTTP203. I think he might have found his match in @bramus . 45 minutes that are worth your time if you ever wondered why `html {height: 100%}` is not doing the thing you wanted…](https://twitter.com/DasSurma/status/1569777904443355136?s=20&t=tsZue_Aet-8IfycDNOz6oA)
* [Got Preact Signals working in @sveltejs out of the box.](https://twitter.com/marvinhagemeist/status/1569585235334991873?s=20&t=Bvt11R6OW5XdKLVPSf-HGw)


## 11-15-2022

* [fission + capyloon](https://fission.codes/blog/capyloon/)
* [wtw -- tailwind](https://wtw.dev/60-tailwind-not-design-system)
* [design systems are for user interfaces](https://bradfrost.com/blog/post/design-systems-are-for-user-interfaces/)
* [How http://Enhance.dev solves FOUCE](https://twitter.com/brianleroux/status/1592227306608951297?s=20&t=QhYbblSnyKoTeiXibbwzbg)
* [Decentralized Networks as Essential Infrastructure](https://twitter.com/dustyweb/status/1591892079416074240?s=20&t=vEdJItX51UymPHeoXGJ9RQ)


## 11-19-2022
* [State of the IPFS DevTools ecosystem-Brendan O'Brien, Brooklyn Zelenka, Carson Farmer & Sara Feenan](https://www.youtube.com/watch?app=desktop&v=Q-41niP2tSg&ab_channel=IPFS)
* [Apply instant loading with the PRPL pattern](https://web.dev/apply-instant-loading-with-prpl/)
* [This episode's a long one, but you'll come out the other side knowing how pinch-zoom, scrolling, browser UI, and software keyboards change layout & viewports.](https://twitter.com/jaffathecake/status/1569738079975665666)
* [Make Static Pages Dynamic With Netlify Edge Functions](https://www.learnwithjason.dev/make-static-pages-dynamic-with-netlify-edge-functions)
* [Use XState With Netlify Edge Functions](https://www.learnwithjason.dev/use-xstate-with-netlify-edge-functions)
* [IPVM - @expede - IPFS and WASM](https://www.youtube.com/watch?v=rzJWk1nlYvs&ab_channel=IPFS)
* ["The Skip Ratchet" by Brooklyn Zelenka (Strange Loop 2022)](https://www.youtube.com/watch?v=3UjQd-JnMrQ&ab_channel=StrangeLoopConference)
* ["A Distributed File System for Secure P2P Applications" by Brooklyn Zelenka (Strange Loop 2022)](https://www.youtube.com/watch?v=-f4cH_HQU4U&ab_channel=StrangeLoopConference)
* [How browsers work](https://web.dev/howbrowserswork/)
* [Announcing the TypeScript Cookbook](https://fettblog.eu/announcing-the-typescript-cookbook/)
* [Jake Archibald: In The Loop - setTimeout, micro tasks, requestAnimationFrame, requestIdleCallback, …](https://www.youtube.com/watch?v=cCOL7MC4Pl0&ab_channel=JSConf)
* [saltpack, a modern crypto messaging format](https://saltpack.org/)
* [Fission Reactor: October 2022 Research Update](https://talk.fission.codes/t/fission-reactor-october-2022-research-update/3536)
* [What is IPLD Anyway? - Mauve Signweaver](https://www.youtube.com/watch?v=J_Q6hF_lPiM&t=6s&ab_channel=IPFS)
* [Introducing Quiet - Encrypted P2P team chat without servers, just Tor - Holmes Wilson](https://www.youtube.com/watch?v=owSd7uuGwmw&ab_channel=IPFS)
* [Formal Analysis of GossipSub - Ankit Kumar](https://www.youtube.com/watch?v=T3QLhijHAwA&ab_channel=IPFS)
* [skiff -- ](https://www.fastcompany.com/90696585/skiff-ipfs-storage-private-document-editor)
* [Functional Programming Made Easier](https://leanpub.com/fp-made-easier)
* [Web3's future #fail is avoidable](https://generative-identity.org/web3s-future-fail-is-avoidable/)
* ["Transducers" by Rich Hickey](https://www.youtube.com/watch?v=6mTbuzafcII&ab_channel=StrangeLoopConference)
* [Public Key Cryptography - Computerphile](https://www.youtube.com/watch?v=GSIDS_lvRv4&t=67s&ab_channel=Computerphile)
* [Programming Local-First Software Workshop @ ECOOP 22 Berlin](https://www.youtube.com/watch?v=hJQqjELPcOU&t=7356s&ab_channel=SoftwareTechnologyGroup)
* [WebNative File System (WNFS) - @expede, @matheus23 - IPFS Implementations](https://www.youtube.com/watch?v=3se17NAS-Lw&ab_channel=IPFS)
* [Web3 for Fun and Profit | Brooklyn Zelenka | CascadiaJS 2021](https://www.youtube.com/watch?v=3D2tb01mlQI&ab_channel=CascadiaJS)
* [Keynote: Why web tech is like this - Steve Sanderson](https://www.youtube.com/watch?v=3QEoJRjxnxQ&ab_channel=NDCConferences)
* ["Evidence-Oriented Programming" by Andreas Stefik](https://www.youtube.com/watch?v=uEFrE6cgVNY&ab_channel=StrangeLoopConference)
* [Invertible Bloom Filters - @matheus23 - Unconf](https://www.youtube.com/watch?v=YNbcXlllOBQ&ab_channel=IPFS)


## 3-20-2023
[html info](https://twitter.com/manucorporat/status/1637749013414805505?s=20)

