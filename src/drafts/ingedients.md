---

linkTitle: development diary — ingedients
linkDesc: Various nodes and what they do
slug: dev-diary-ingredients
type: dev-diary
date: 12-4-2021

---


# ingredients

You need to store blobs, store a DB, and host a webapp. the webapp hosting is easy because it is just a static host that serves a JS file.

[Build a Decentralized Chat App with Knockout and IPFS](https://medium.com/textileio/build-a-decentralized-chat-app-with-knockout-and-ipfs-fccf11e8ce7b)

[The IPFS Gateway Problem](https://medium.com/pinata/the-ipfs-gateway-problem-64bbe7eb8170)

## storage
> Storage is essentially free these days - bandwidth (many people fetching data) is the more costly part, although Cloudflare R2 as an example has brought costs to zero for a lot of use cases

* [cloudflare r2](https://blog.cloudflare.com/introducing-r2-object-storage/) -- giving developers the ability to store large amounts of unstructured data
* aws s3


### blobs
In the DB we normally just write down a reference to a blob -- a hash typically. The blobs are stored separately from the DB storage, which has text records.
  * you normally need a server-side process that will take a blob and write it to storage and run an IPFS process that will allow accessing it. In ssb blobs are stored in-process via `ssb-blobs`, a `secret-stack` plugin.
  * see IPFS


## DB
How do you store the data so that you can find and replicate it?


## replication
Who's data do you host on your IPFS node? See this is the pubsub situation seen [here](https://medium.com/textileio/build-a-decentralized-chat-app-with-knockout-and-ipfs-fccf11e8ce7b)

