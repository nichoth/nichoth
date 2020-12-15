# nichoth.com

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

--------------------------------------------------

## notes

### cryptography
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

[ssb-db partial replication](https://github.com/ssbc/ssb-db/issues/27) -- use a binary tree instead of a log

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















