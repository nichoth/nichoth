---

linkTitle: Databases
linkDesc: A list of databases, and some notes
slug: database-list
type: miscellany
date: 3-10-2022

---

## CRDT
I’m wondering if I should focus right now on a synchronization algorithm that is independent of storage... so you could have DB A and DB B, and then sync them… it’s a little bit out of my wheelhouse though. But it would be so useful to be able to have arbitrary stores of data and sync them… I think you would need certain constraints on data, but it may be possible

even if there were multiple adapters, one for DB A, another for DB B, as long as data is in a format compatible with both, i imagine you could connect them

we would be factoring for the things that are common to any DB I suppose.

### automerge

* [automerge/automerge#persisting-a-document](https://github.com/automerge/automerge#persisting-a-document)

Use `Automerge.save(doc)` to create a serialized document that contains the full change history of the document (a bit like a Git repository)

This is helpful if you have multiple pubs that synchrnize with one another

Also good if you have multiple devices with write access, although that is an easier situation to reconcile updates. You could use the claimed timestam since there is trust between device 1 and device 2.

I don't think this does anything to help with *persisting documents*. This means you would need to serialize a doc, then write it to a DB of choice.

```js
var myDoc = Automerge.save(doc)
myDB.write(myDoc)
```

### yjs
* [docs.yjs.dev](https://docs.yjs.dev/)
* [yjs/yjs](https://github.com/yjs/yjs)

Provides some helpers for transport & persisting.

You would need to create a persistence helper for any other DBs.

* [y-indexeddb](https://github.com/yjs/y-indexeddb)
* [y-leveldb](https://github.com/yjs/y-leveldb)
* [y-websocket](https://github.com/yjs/y-websocket)
* [y-webrtc](https://github.com/yjs/y-webrtc)

I was thinking today that they may have prioritized different things when making the original ssb. It seems like they may have prioritized replication, which makes sense if *every peer is a full node*. However, if you are making a reader app, for example, or a web-based crud app, then efficiency with replication is not as important. In this issue — https://github.com/ssbc/ssb-server/issues/454#issuecomment-350405818 — for example there is talk about needing to improve efficiency vs ipfs, & he says

> anyway just the hashes for 100k messages would come to ~10 megabytes

but if you are not replicating, just viewing the 20 most recent messages, then it’s not that important


-----------------------------------------------


## DB
* [cockroach DB](https://www.cockroachlabs.com/)
* [fauna DB](https://fauna.com/)
* [upstash](https://upstash.com/)
* [xata](https://www.xata.io/)
* [firebase](https://firebase.google.com/) -- local-first
* [rxdb](https://github.com/pubkey/rxdb)
* [supabase](https://supabase.com/)
* [oriole DB](https://github.com/orioledb/orioledb)
* [concordant](https://www.concordant.io/)
* [vaxine](https://medium.com/lunar-ventures/vaxine-the-database-for-social-software-6e3a292a53ca)
* [edgeDB](https://www.edgedb.com/blog/edgedb-1-0)
* [terminusDB](https://github.com/terminusdb/terminusdb)
* [matrika](https://github.com/mikeal/matrika)

### p2p DBs
* [kappa DB](https://github.com/kappa-db/kappa-core)
* [threads DB](https://docs.textile.io/threads/)
* [orbit DB](https://orbitdb.org/)
* [rxdb](https://github.com/pubkey/rxdb)

## see also
* [jlongster/crdt-example-app](https://github.com/jlongster/crdt-example-app) -- A full implementation of CRDTs using hybrid logical clocks and a demo app that uses it

