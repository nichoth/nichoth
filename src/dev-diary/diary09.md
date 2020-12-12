# development diary

#dev-diary 

Have started off today by digging into the awesome resources created by [@RangerMauve](@tdeT1cU3xUQaD2Ne5Ox0Dndly50qS+c5+//Fl7tyPqg=.ed25519) [on github](https://github.com/RangerMauve/discovery-swarm-web) . Can't remember how I got started on this train of things… I was updating my website nichoth.com. It pulls posts/photos from [my ssb client](https://github.com/nichoth/eventual-gram-ssb) and writes them to an html file using [hyperstream](https://www.npmjs.com/package/hyperstream). I got [the tags plugin](https://www.npmjs.com/package/@nichoth/ssb-tags) to work also. So photos can be indexed based on tags now in the website.

Need to fix things on eventual-gram… when you first run the app it doesn't know your name or avatar.

The difficult thing for all p2p programming seems to be local storage at this point in time. There is indexedDB in the browser, but that is more like a local cache because there is no way to know how much space you will have or when things will be deleted. This got me thinking about out of order messages/partial replication in ssb. It seems that is the only thing missing to let it work in a browser. However I can't say that I understand the terminology being used in the existing writing about it. For example, [here](https://viewer.scuttlebot.io/%25L9m5nHRqpXM4Zkha1ENTk5wNOXQMduve8Hc9%2BF0RLZI%3D.sha256), I don't get the use of the term 'merkle tree'. My understanding is that ssb currently does use a merkle tree, which is just the git-like structure of using posts that contain a signed hash of the previous hash (blockchain-ish). 

It seems the best option is p2p + a 'pinning' server to make sure things are available (which is like a pub server in ssb).

* https://github.com/ssbc/ssb-server/issues/124 -- partial replication issue
* https://github.com/ssbc/ssb-db/issues/27 -- 'Merkle Tree Logs' issue
* https://github.com/arj03/ssb-browser-demo
* https://github.com/arj03/ssb-browser-core
* https://github.com/arj03/ssb-partial-replication
* https://github.com/ssbc/epidemic-broadcast-trees/
* https://viewer.scuttlebot.io/%25L9m5nHRqpXM4Zkha1ENTk5wNOXQMduve8Hc9%2BF0RLZI%3D.sha256 -- ssb thread about *enabling partially subscribable feeds*
* https://github.com/dominictarr/tree-exchange



