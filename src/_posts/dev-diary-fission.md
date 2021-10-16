# development diary

Working on the [fission blog app](https://github.com/nichoth/blog/tree/photo)

A __big question__ is where does it save the things? It could use a browser-side device, like localstorage, but I know that `ipfs` is fairly well baked in too. 

------------------------------------------

which API is used to choose the hosted ipfs nodes that it syncs with?

> So this is a long story 😉
> js-ipfs in browser by default only connects to other browser nodes, which aren’t connected to the “main” public IPFS network
We run a secure websocket in order to connect it to Fission hosted IPFS nodes that are connected to the main network
This is configurable — and anyone can run their own IPFS node / WSS to point at

## configure the ipfs peer that webnative uses
The function [wn.ipfs.set](https://github.com/fission-suite/webnative/blob/16c7edfbe34377ee6ec8ea378512c7f43102094f/src/ipfs/config.ts#L9) is used to configure the the ipfs peers that you use.

------------------------------

if I wanted to host my own ipfs node and use that as a 'remote', is that configurable with the `wn` module, or would that happen at application-level?

> It is configurable, see https://github.com/fission-suite/webnative/blob/16c7edfbe34377ee6ec8ea378512c7f43102094f/src/ipfs/config.ts#L9

> You'd need to run your own js-ipfs (https://www.npmjs.com/package/ipfs) instance and then connect to your remote node. We use https://www.npmjs.com/package/ipfs-message-port-client as a js-ipfs proxy and then use js-ipfs in a SharedWorker through an iframe.

* you would pass the js-ipfs instance/client to webnative via the set function above
* userIpfs is the js-ipfs instance/client

> You'd just need to tell your remote ipfs server to pin this one CID. Which you can do using its HTTP API.

> Basically, every time you call fs.publish(), you'd do that.



