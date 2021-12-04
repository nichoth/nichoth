---

linkTitle: IPFS + fission notes
linkDesc: copy-and-pasted notes about IPFS via fission discord
slug: fission-chat
type: miscellany
date: 12-4-2021

---

[link to discord](https://discord.com/channels/478735028319158273/739900848234299435/900801747629510706)

@nichoth — 10/21/2021
> There's still a little question in my mind -- is there somewhere that we define what ipfs nodes we sync with? or is that more baked in at a lower level?

@boris — 10/21/2021
> the in browser nodes connect to our servers by default
> anyone in the network looking for the content by hash, will spread / cache blocks throughout the network, served up by Fission servers if no one else has them cached / online

> the in browser nodes can't connect to the main network directly, so need a secure web sockets connection, that defaults to our servers.

> One could write a "publish" endpoint that sends a pin request to any server that has that as an API

> And my idea was to have a simple way for someone to sync their Fission content to their local desktop server

> Since `_dnslink.USERNAME.files.fission.name` keeps the up to date hash of the root file system

@walkah — 10/21/2021
> Thanks for the chat, @nichoth ! As promised, a few follow up links for reading and trying to make some sense of all this:

- proto.school is a good resource (bite-sized tutorials on various topics). at a minimum, I would say review the one on Content Addressing - https://proto.school/content-addressing
- DNSLink : this is the "magic" that translates DNS names to IPFS addresses (which include the CID of the content). The IPFS docs have a decent high level overview: https://docs.ipfs.io/concepts/dnslink/
- When we talk about "publishing as an app" (which really means: given a root CID of a file tree, manage a DNSLink entry to point to it), the details in webnative are outlined in the "Platform APIs" section of the guide: https://guide.fission.codes/developers/webnative/platform .

