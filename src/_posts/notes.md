---

linkTitle: notes about fission
linkDesc: some questions
slug: notes
type: miscellany
date: 12-4-2021

---

# fission

How would gossip work in the fission blog?

How would social network work in fission version?

In ssb, you keep a list of pubs that you connect to

Could have a list of pubs to connect to, like `gossip.json` or whatever in ssb

And also a list of people that you're following. People are identified by their public key, so universally unique.

How to gossip? You need an **ipfs node**, like a pub server.
* could have a public feed
* also a limited access feed

-------------------------------------------------------

## the web

fission does DNS linking with DNS names to ipfs content CIDs

The CID here being the 'root' CID of your file tree

`publish` pings a server to update the map with a new CID for a given DNS name. That's why fission requires unique usernames.

------------------------------------------

[fission server docs](https://runfission.net/docs/)

