# development diary

https://github.com/nichoth/eventual-gram-ssb
https://github.com/nichoth/earthstar-demo
https://github.com/nichoth/ssb-tags

It's a new day. Made some [github issues](https://github.com/ssbc/ssb-server/issues/736) for lingering questions. [@cel](@f/6sQ6d2CMxRUhLpspgGIulDxDCwYD7DzFzPNr7u5AU=.ed25519) gave an awesome answer yet again. 

Started digging into [earthstar](https://github.com/earthstar-project/earthstar) also. It's super cool. There is a [pub like project](https://github.com/earthstar-project/earthstar-pub) for synchronizing data. It reminds me of SSB except they got rid of the append-only quality. The storage of data is the biggest hurdle in my view. Well, storage and synchronizing with other 'peers'. In SSB, for example, we have pubs to help with it. I don't know, maybe you always will need a server to help things. I was thinking just now about using new experimental browsers like beaker. Still need to learn about that.

Was doing some experimenting thinking about what SSB would be like using the most boring things. Which makes you think, what is SSB really? There is
* append only log for feed storage
* a DB with views that create feeds
* public/private keys for identity
* blob storage -- `multiblob` i think for ssb

The key is that replication works well b/c of the merkle tree quality. The other key is electron -- letting you run a server on your computer is an effective way to do p2p. Everything in the list can be hosted for free more or less on netlify except for blob storage. 

Also made a view for tags. that's fine. as simple as possible. It doesn't create any message types in ssb, just creates a view like `{ tagName: [msgID] }`

