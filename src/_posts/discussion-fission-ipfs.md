---

linkTitle: discussion — fission + ipfs
linkDesc: Talking about ipfs & webnative
slug: discussion-fission-ipfs
type: dev-diary
date: 11-15-2021

---

# a discussion &mdash; fission + ipfs

## nichoth - 10/21/2021
There's still a little question in my mind -- is there somewhere that we define what ipfs nodes we sync with? or is that more baked in at a lower level? 

## boris — 10/21/2021
@nichoth it's a network that is p2p where nodes find other nodes
the in browser nodes connect to our servers by default

anyone in the network looking for the content by hash, will spread / cache blocks throughout the network, served up by Fission servers if no one else has them cached / online

the in browser nodes can't connect to the main network directly, so need a secure web sockets connection, that defaults to our servers.

One could write a "publish" endpoint that sends a pin request to any server that has that as an API

And my idea was to have a simple way for someone to sync their Fission content to their local desktop server

Since `_dnslink.USERNAME.files.fission.name` keeps the up to date hash of the root file system

## walkah — 10/21/2021
Thanks for the chat, @nichoth ! As promised, a few follow up links for reading and trying to make some sense of all this:

- proto.school is a good resource (bite-sized tutorials on various topics). at a minimum, I would say review the one on Content Addressing - https://proto.school/content-addressing
- DNSLink : this is the "magic" that translates DNS names to IPFS addresses (which include the CID of the content). The IPFS docs have a decent high level overview: https://docs.ipfs.io/concepts/dnslink/
- When we talk about "publishing as an app" (which really means: given a root CID of a file tree, manage a DNSLink entry to point to it), the details in webnative are outlined in the "Platform APIs" section of the guide: https://guide.fission.codes/developers/webnative/platform .

## nichoth — 10/21/2021
awsome thank you @walkah

## walkah — 10/21/2021
As for Cypress - this is the repo where we have a few cypress tests (and is a bit of a general testing ground for some things) https://github.com/fission-suite/benchmark

## nichoth — 10/21/2021
the in browser nodes connect to our servers by default

Which level is that defined in? webnative?

## Philipp — 10/21/2021
That's in the auth lobby's web worker
https://github.com/fission-suite/auth-lobby/blob/develop/src/Javascript/Worker.js#L68
GitHub
auth-lobby/Worker.js at develop · fission-suite/auth-lobby
The authentication service that Fission services run. - auth-lobby/Worker.js at develop · fission-suite/auth-lobby

Or rather, shared worker is the right term

## nichoth — 10/21/2021
sorry I'm having trouble getting a picture of everything. So the auth-lobby knows which servers to connect to. And where is auth-lobby used? The call to wn.publish tells ipfs nodes to update a CID, so is auth-lobby used by webnative?

## Philipp — 10/21/2021
Yeah an infrastructure diagram would have quite some edges 😄
So, when you call .publish, this sends a request to the server with the current CID of your filesystem (stored in your browser in indexeddb, under the auth lobby's domain to be exact).
The server (see its endpoints at https://runfission.net/docs) also has IPFS running. It will ask the IPFS network for the CID of your filesystem and pull it.
Technically, it doesn't matter how it gets the bytes. But it likely gets them from your browser directly, because your browser is configured to be connected to the fission ipfs nodes as you saw above.
So there's a couple of entities:
- On your browser, the app you use (e.g. drive.fission.codes) which is connected (via an iframe and window.postMessage) to
- The auth lobby's shared worker running js-ipfs on your browser, which has ipfs peering connections to
- The fission ipfs cluster, which is controlled by
- The fission web api (https://runfission.net/docs), which in turn is where your app sends requests to 
so is auth-lobby used by webnative
So yes.
You can see how apps are connected to the shared worker with ipfs here: https://github.com/fission-suite/webnative/blob/main/src/ipfs/config.ts#L17
GitHub
webnative/config.ts at main · fission-suite/webnative
Fission's browser SDK. Contribute to fission-suite/webnative development by creating an account on GitHub.

(Also note that that's not necessarily the case, because - as an app - you can bring your own ipfs. But then you need to manage connecting to the fission ipfs cluster yourself) 

## nichoth — 10/21/2021
I see, so the auth-lobby uses the shared worker, and webnative uses the same shared worker. 

And the code that runs the auth-lobby is a separate app, thus we use the shared worker to communicate

## boris — 10/21/2021
The shared worker is an optimization about having a js-ipfs node run once across any Fission apps I believe

## nichoth — 10/21/2021
ok, so the webnative and auth-lobby are running is separate threads/windows?

## boris — 10/21/2021
shared worker is running js-ipfs

and webnative in your app talks to it
You can view this ... in the console?

In console!
Under sources
auth lobby has ipfs.html in it which powers that service worker

## steven additionally has some service worker stuff for drive
So you should be able to see the same when running blog

## nichoth — 10/21/2021
So, thinking more about content updating… how does ipfs deal with forked feeds of data? (not sure if these terms are totally relevant here). But lets say you have one device, and it publishes a new blog post. You have another device that is offline, so it doesn't see the latest update from device 1, and it also publishes a new post, now there are two different 'heads' to the content. The blog is just one big string of JSON, not individual posts. So to the servers it looks like one update then a different update, and I suppose the last write wins? It seems like this could be an issue with replicating amongst servers too, but with finer grained time-spans between updates

Sorry i suppose this is more of an ipfs issue than fission

## boris — 10/21/2021
IPFS is at the block level
WNFS has a dnslink root, and yes, has to solve this with the help of a server
And we're working on doing merging / conflict resolution

## nichoth — 10/21/2021
see [forkdb](https://www.npmjs.com/package/forkdb) for a nice clear example of what I'm thinking about btw
what kind of work around merging/conflict resolution is happening?

## boris — 10/21/2021
At the IPFS layer, blocks just get synced so it doesn't matter -- and hashes will always be hashes and can be viewed independently
WNFS has versions built in, so you can actually traverse back
And whatever the "latest" hash is in DNSLink is what is browseable on the web

## nichoth — 10/21/2021
ok, so ipfs stores everything, and the visible data is the latest in DNSLink

## boris — 10/21/2021
So for the purposes of boris.files.fission.name/p/ it's latest wins, and we have some work to do to let the developer know that "hey, dnslink is different, what do you want to do?"

