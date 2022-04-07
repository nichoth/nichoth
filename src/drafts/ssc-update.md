---

linkTitle: development diary — ssc
linkDesc: More writing about ssc
slug: dev-diary-ssc-two
type: dev-diary
date: 4-6-2022

---

# development diary &mdash; ssc

## More writing about ssc

The end goal is that I want to make a "deploy to netlify" button that will automatically create the backend for an image sharing service and social network. So that way it is trivial to deploy a unique social network. That opens lots of questions about how to do moderation. Ultimately whoever has deployed this network is responsible for it and the content that is hosted. Somewhere on the future roadmap is making admin tools for doing moderation type things.

This would create a backend consisting of lambda functions, a faunaDB, and a blob host. So a 'serverless' backend. I'm wanting to pick the best parts of p2p & servers. A server in this case is just a peer that is always online, so pretty a pretty useful thing to have.

From what I've read, I don't think this will be possible as just a simple button though. I think it must be at least a two-step process because you need to get a secret key from faunaDB and create a faunaDB, then add your fauna key as an env var in netlify.

Also I just realized that you would need to create a cloudinary account or API key for storing blobs. This might be changed to web3.storage or something in the future, but it is still the same overall process — you need to create an account there first.

I wonder how much this could be automated. I'm sure I could make a web form that could add an API key for fauna/cloudinary to the env variables in the call to netlify. I suppose I could do the same for any third party service I'm using — add env variables for secrets. This would still require the user to create accounts at each service.

---------------------------

The next step is local first. It's a separate step because this backend is lot to do in any capacity, and I think we may be able to get something useable more quickly if we don't do local-first at first.

That is an underdeveloped part of UX from what I can tell — indicating to the user different types of hosting. Meaning is this hosted locally? is it hosted by a server? How much do we want to serve locally? should something always be available locally, or is it ok to remove once it is backed up on the server? 

There are some subtle questions there, and the world hasn't really had to think about it until now.

-----------------------------

This plan kind of reminds me of the early 2000s web, when most things were still server-based, and it wasn't too difficult to deploy your own php forum server for example.

-----------------------------

A nice way of articulating this is that it opens the social graph. Meaning the way data is replicated is based on a social network. This is assuming that the server operator is taking an active role in curating the friend graph. So we don't want to do something like create an invitation to our server that is always valid forever. The UI should probably allow you to create several single-use invitations.

Another key element is that it should be free to do this. All the services I'm using have free tiers of pricing where it costs nothing and requires no credit card info.

