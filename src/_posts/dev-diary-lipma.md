---

linkTitle: lipmaa links
linkDesc: Getting lost in merkle forests
slug: dev-diary-lipmaa
type: dev-diary
date: 2021-10-19

---

# development diary

* [aljoschameyer/bamboo](https://github.com/aljoschameyer/bamboo)
* [p2panda.org/](https://p2panda.org/)
* [p2panda/p2panda](https://github.com/p2panda/p2panda)
* [p2panda/beep-boop](https://github.com/p2panda/beep-boop)
* [p2panda/handbook](https://github.com/p2panda/handbook)
* [skip ratchet](https://fission.codes/blog/introducing-the-skip-ratchet/)

## lipmaa links

What are 'lipmaa links'?

![Lipmaa graph](/img/graph.svg "Graph")

> Tldr: instead of needing every post to verify a chain you can skip through the chain quickly getting only key nodes which link back (following a well defined algorithm)

> The idea with lipmaa links is akin to maintaining two backlinks in each message
> - previous : the message before this
> - hopPrevious (made up name) : the closest previous multiple of  10 message.

> With hopPrevious like that if you want to verify the chain from message 153, you jump to 150,140, 130,...0

> The lipmaa algorithm is the optimal one such that to verify back from 153 you just need to check :
> 153, 152, 151, 150, 140, 130, 120, 110, 100, 0
> I'm using base 10 cos it's easier to convey the pattern. It's kinda like there are special numbers (in our case powers of 10) which behave like a superhighway 

---------------------------------------------

## tree vs list

I remembered what I was thinking about federated vs fully p2p versions of ssb. The benefit of a federated style is that there is not a difficult period for new people to join the network, when you have to verify an *entire* merkle-list of messages (which can be quite long) before you look at them. This does imply some trust between you and the server, but maybe it's ok to trust a server. 

I understand that the hypercore protocol uses a proper merkle tree data structure vs the simple list structure of ssb, which should reduce the time it takes for new users to join & verify. However, I don't fully understand how hypercore works & how to use it 😦 The nice thing about ssb is that it is quite simple at its core.

I can see using a tree structure to transfer files, where you know in advance that you are able to divide a file into a certain number of chunks to make a binary merkle-tree, but in hypercore i get the impression that each node in the tree is meaningful on it's own, like each node is a 'post' for example, and I don't totally understand how you can add nodes to a tree while maintaining it's binary-tree structure.

## hyperbeedeebee

> For the latest fancy hypercore database stuff, check out https://www.npmjs.com/package/hyperbeedeebee
> Basically, each person has a document oriented database that they can store collections of data in (kinda like MongoDB), then they can build up indexes, and when a remote peer is querying the database, they'll automatically use the indexes to speed up searches and avoid loading data that isn't needed.
> e.g. if you have a "posts" collection and have an index sorting them by createdAt, you a user can download just the last days of posts without having to traverse the entire post history or build up a local index 

---------------------------------------

Featuring words of @mauve & @mix

