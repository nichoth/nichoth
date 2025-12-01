---

linkTitle: development diary — planetary
linkDesc: My notes on making another ssb client
slug: dev-diary-planetary
type: dev-diary
date: 2021-11-10

---

# planetary

Making another ssb client

My impulse is to use as many cloud-based, standalone services we may need -- cloudinary, pusher, netlify, etc. But I thought the whole point of ssb was that your data would be **hosted locally**? If it is spread out amongst all these different cloud services, how is this better than any other cloud based web app?

The core of this is *where things are hosted*. It's cool to build something that is totally locally hosted. That's the one *really cool* thing about ssb -- it works without internet access.

But, is it feasible to host everything on your local machine? That makes things easy in one sense -- you just replicate everything to your local harddrive. But will this scale? probably not.

That's why we are seeing a move toward little boxes that act as your own personal server, your own cloud. Hypercore is moving to a raspberry PI solution, and that is the idea behind ATEK too -- p frazee's project.

So... how is this relevant? It seems better to use digital ocean -- like it is better to keep everything on one machine. But it *is still* just hosted on someone else's machine.

I think a better option is to refactor all the things that sbot uses -- blob storage, log storage -- so that we can swap out different parts with whatever is practical. You could use cloudinary one day, then switch to a locally hosted module the next day, and both modules would have the same API.

--------------------------------------------

So if we continue in this direction of using cloud services -- you can imagine a scenario with many different 'sbots' running at the same time. Although they are composed of many different parts, they act as a single machine, a single computer running `sbot`. These backend services have a concept of 'following' users. So potentially you have many different 'clouds', many different backend networks, that don't necessarily interact. But you can configure each 'server' pub to follow the others, and so you're still gossiping.

The idea here is that pubs follow users, but users don't follow pubs. Because the default replication mode is that you see all the friend-of-a-friend posts. You don't want to be 'friends' with a pub, thus seeing content from everyone that the pub follows.

