---

linkTitle: fission chat
linkDesc: copy-and-pasted notes via fission discord
slug: fission-chat
type: miscellany
date: 12-4-2021

---

**barefoot** — Today at 9:34 AM
I'm trying to understand Fission's auth and file system architecture better and wanted some direction towards readings perhaps. I'm a purely front-end developer and thought maybe I'm a target audience for Fission but I'm pretty poisoned by semi-centralized client-server mental model of apps. For context, when it comes to the back-end I've only worked with serverless functions and abstracted DBs behind GraphQL APIs.

A thought experiment that encompasses all of my questions is something like Medium or Ghost:

```
Core team --> develops layouts, functionality (i.e. "app")
Blogger --> creates "posts" on their own "site". A "site" can have many bloggers.
Audience --> can "comment" on "posts"
Blogger --> can audit every "comment", choosing to show or hide it on their "site". This only applies to bloggers with "management permission" for a given "site"
```

How would the file system and the auth mechanism enable this on Fission? Here are my questions but if there's a better way to think about all of this, disregard the questions.

1/ Where does the base "app" live? I imagine that it'd live in the core team's Fission file system, each with their own branch. But how do they merge their updates? Who's account does the trunk belong to? Can this ownership be transferred?

2/ As I imagine it, the blogger has a representation of their "posts" on their own Fission file system (in say JSON). So when the audience loads the blogger's site, they grab the app itself from the core and the data from the blogger's file system. The "posts" JSON isn't content addressed but is instead public-key addressed (like IPNS). Is this correct? Or does the blogger replicate the core app on their own file system?

3/ If "posts" are public-key addressed, then how can 2+ people collaborate on "posts"? Do they host their own "posts" which get merged before presentation? If yes, then where is this merge rule recorded? Does the "site" file system keep a copy of merged "posts"?

4/ Does the audience "comment" to their own file system or do they write to the file system where the "site" is based on? Would they take their comments with them if they revoke the app's access in Fission Dashboard? How would the "site" know that there is a CID'd "comment" associated with a given "post" so that it can show it to everyone?

5/ How would the blogger audit the visibility of a "comment"? I have no assumptions about how this would work.

6/ Permissions for editing anything that is not hosted by the user is also not clear to me but I imagine the mechanism would be clarified with some of the above questions. 

**expede** — Today at 1:39 PM
1. When you take a step back, the question is about where data lives. In a classical system, it's "in the one database". They then tend to shard data as they scale.

With content addressing (e.g. IPFS) you can host data anywhere. Fission's system is encrypted at rest, and sharded per user, so the actual location of the data doesn't matter,  User data is held by users, so the copy they have locally and the copy remotely are equally valid (I'm glossing over the magic that makes that work)

2. The reader pulls just what they need for that one post. If the post is public, then they can get it from any replica, including from their local system if that's up to date (proven with content addresses / hashes)

3. A subtly: they're not public-key addressed, they're addressed by the hash of the content. If you hash that or I hash that, it's the same hash (like with Git). Collaboration is done with some of the magic that I alluded to before: CRDTs are data structures that are designed for this exact use case: you have multiple updates happening "concurrently", and there's an algorithm that automatically reconciles them (similar to how live editing works in Google Docs, but can also work offline).

4. Yes the audience would comment on their own file system. The question about how to do this with anyone ("global aggregation") is the tradeoff for the user-controlled access. You need to alert others that there's a pointer when they don't know where to look. When everyone is online, it's pretty easy with WebRTC. The "cheat" for offline is to put this is a centralized database. We don't have this built yet, but our plan is to use GossipSub (gossip-based pubsub) for this use case, where you send messages to people you know, and form them to those they know (like gossip) until everyone that cares has been alerted
5. Visibility is controlled with encryption. You can take a private comment, share it with others in a group by sharing the encryption key, and then later flip it to public by publishing the decrypted version of the file 
6. Permissions for mutations (like editing) are handled with certificates called UCAN, which is a special kind of JWT that doesn't require a server. Read access is done with encryption. UCANs are like a ticket stub that you take to a movie theatre: anyone can look at it and see that you're allowed to see the movie. So anyone can look at your UCAN and see that you're allowed to write to this file path (or send an email, or anything else that's in the cetrtificate)
Thanks for asking questions! You may have MORE questions than before 😅 Some of the answers start to get pretty deep, but hopefully this can give you a rough sketch

Parts of these two presentations may help give you a high level: 

[https://www.youtube.com/watch?v=1NBZoJ5fnjM](https://www.youtube.com/watch?v=1NBZoJ5fnjM)
[https://fission.codes/blog/jump-to-hyperspace-brooklyn-zelenka-elixirconf-edge-computing/](https://fission.codes/blog/jump-to-hyperspace-brooklyn-zelenka-elixirconf-edge-computing/)

(The second one is more general and aimed at a backend / Elixir audience, but the overall ideas are there)

**barefoot** — Today at 6:15 PM
Awesome! Thank you so much for spending the time! It does clarify a lot of things. Also I've seen that first presentation. It was my introduction to the work at Fission. Although I didn't understand a lot of the details, it still clicked as a whole!

I don't want to ask for even more work but just so I'm clear, is my characterization here correct:

Regarding item 4, I know that the Scuttlebutt protocol does this with pubs (short for public house not publish). These are essentially regular nodes just like users but they're hosted and are always online. If you gossip to a pub you trust, I can later get it if I also trust the same pub. I'd imagine Fission's solution would work similarly. But the issue would be mutability. Scuttlebutt users write to a personal Merkle tree that their peers keep a copy of and only ask for diffs. Since Fission users just inform each other of the existence of a CID, you could post something with the hash of 123 and gossip it to our shared network but then delete it before I have a chance to see it. So I come online and see that you posted and ask an IPFS endpoint to get me the content that is hashed 123 but never see it. If you truely control your data, then you can really delete it, no? If you delete it before I see it then I won't be able to ask for it. I saw in another talk you mentioned a WebNativeDB concept. Would that truely replicate the content and pin it beyond your own reach? This would be for unencrypted content because I imagine you can let encrypted content persist in the cosmic stew without worry. I'm sure I'm missing something because how could you ask an adversarial node to delete a specific content or not replicate it?

Other than that I think I'm fairly confident I understand how the rest of it would work when you combine CRDTs and UCANs. Say if our collaborative blog post has the hash 123 and I have permission to edit it, I can edit it locally, hash it and get 456 and then broadcast it by announcing something like "I who has permissions to edit 123 because of this UCAN cert have a new version of 123 called 456". If my claims are verifiable, then everyone including you get 456 as the most recent version of 123. Am I on the right track? Sorry for the dramatic reenactment lol some STEM concepts only make sense to me as analogies!

Again, thanks a lot for the time!

**expede** — Today at 9:35 PM
It's related! Thanks to IPFS, we don’t depend on any particular host — it could be self hosted, use a service provider, or several for everything, or sharded across several — but the same concept. What your questions get to is really about data availability and mutability 👇 

For data availability, the system itself doesn’t guarantee that data will ever be available. Any changes that happen during that time is considered to have happened concurrently form a causal point of view (as you mention: CRDTs). So you can continue to make writes with forked data and everything is okay in this model. If you want to self-host but not be online, that’s fine. If someone replicates your data and it stays online (service provide or a friend), then that’s great, too. With content addressing, we don’t depend on any particular pub — the DHT should be able to resolve the content in the same way as BitTorrent finds data. Anyone hosting that hash will serve it, regardless of location.

For mutability, yes people can decide to unhost some data. By default, everything is immutable and persistent — even if you’ve said to delete from the latest version, the old data is still available (like Git). What you’re changing is a mutable reference to the latest revision, but under normal operation that contains all previous versions (uses structural sharing to keep the storage efficient). You can “force write” if you have enough permissions, but that’s the atypical case. In terms of storage cost, we think that the cost of storage is approaching zero at the limit. Even in SaaS services, I get huge amounts of storage for free or very cheap (S3, iCloud), and it’s only getting cheaper. That doesn’t prevent anyone else from providing a copy. We depend more on encryption to do read access control. 

**expede** — Today at 9:37 PM
Yeah, this bit is roughly correct. We have that one top mutable root, but underneath that is all paths. So we say "I have write access to boris.fission.name (root) at path /public/photos/vacation/". We resolve the latest hash at boris.fission.name and follow the immutable links under that to make sure that we're up to date, do any conflict resolution that we need, and push an update. Anyone can validate that the old version is in the new one, and anyone working on the old version can continue safely until they catch up and do any CRDT resolution that they may need to do 

**expede** — Today at 9:41 PM
> Would that truely replicate the content and pin it beyond your own reach?

A big part of the idea for this design (which is new AFAICT) is that you only replicate the rows that you care about. Everyone's DB will look different. We don't expect to fully converge on "the one true state of the world" and embrace that to get lenses into the global state at a point in time (including the past). You can replicate encrypted data that you can't read if you want to, but I think that's less likely.

how could you ask an adversarial node to delete a specific content or not replicate it?

You can only ask nicely; they don't have to follow. If your data needs protection, it probably should be encrypted. But this is the same case as today! If you post something publicly, anyone can right click and host it, and you have to issue them a takedown request

For cooperative nodes, we've been talking about having a "bad hash list", which asks people to not host known CSAM and similar

But fundamentally you can't prevent someone from making those bytes available on a purely technical level (socially or legally is a different story) 

