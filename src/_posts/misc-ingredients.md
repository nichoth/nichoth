---

linkTitle: ingredients
linkDesc: Writing down various nodes and what they do
slug: misc-ingredients
type: miscellany
date: 12-4-2021

---

# ingredients

s3/r2 + IPFS node = filesystem?

You need to store blobs, store a DB, and host a webapp. The webapp hosting is easy because it is just a static host that serves a JS file.

Storage here usually means combining r2 or s3 with a host (something like AWS EC2) that serves an IPFS node.

[Build a Decentralized Chat App with Knockout and IPFS](https://medium.com/textileio/build-a-decentralized-chat-app-with-knockout-and-ipfs-fccf11e8ce7b)

[The IPFS Gateway Problem](https://medium.com/pinata/the-ipfs-gateway-problem-64bbe7eb8170)

[Cloudflare goes InterPlanetary - Introducing Cloudflare’s IPFS Gateway](https://blog.cloudflare.com/distributed-web-gateway/)

## storage
> Storage is essentially free these days - bandwidth (many people fetching data) is the more costly part, although Cloudflare R2 as an example has brought costs to zero for a lot of use cases

* [cloudflare r2](https://blog.cloudflare.com/introducing-r2-object-storage/) -- giving developers the ability to store large amounts of unstructured data
* aws s3


### blobs
In the DB we normally just write down a reference to a blob -- a hash typically. The blobs are stored separately from the DB storage, which has text records. You can use just a single disk to store everything, as in ssb, or you can use a network-based storage for blobs & DB.
  * you normally need a server-side process that will take a blob and write it to storage and run an IPFS process that will allow accessing it. In ssb blobs are stored in-process via `ssb-blobs`, a `secret-stack` plugin. It writes blobs to the same disk that the DB uses.
  * see IPFS

[The IPFS Cloud](https://medium.com/pinata/the-ipfs-cloud-352ecaa3ba76)

 > While it would be incredible to have a giant network of servers all storing our data for free, the economics don’t make sense. After all, storage isn’t free. All of this data needs to be stored somewhere and that costs money or tokens.


## DB
How do you store the data so that you can find and replicate it?


## replication
Who's data do you host on your IPFS node? This is the pubsub situation seen [here](https://medium.com/textileio/build-a-decentralized-chat-app-with-knockout-and-ipfs-fccf11e8ce7b)

[ipfs-pubsub-room](https://github.com/ipfs-shipyard/ipfs-pubsub-room)
[js-ipfs](https://github.com/ipfs/js-ipfs)
[Tutorial: How to build an application with IPFS PubSub Room](https://github.com/libp2p/research-pubsub/issues/18)
[js-libp2p](https://github.com/libp2p/js-libp2p)

