# development diary
#dev-diary

## 11-25-2020
Found [cypher-net](https://github.com/dominictarr/cyphernet), and old dominic project.

Watched [an old video -- 2013 Realtime Conf](https://vimeo.com/77352417). git replication -- group the hashes into common prefixes, and then hash each group. That way you can tell if any of the groups contains a change, so it's more efficient to replicate.

Can't get the tags to work on the main ssb network. It returns `undefined` or something like that. The new plan is to write things in this readme and then parse the markdown and write it to the website, and copy paste to ssb. I guess i could also just get a stream of *this feed*, which is mostly development logs.

I feel like I haven't gotten too much done this week. I applied for a job. It's at some kind of local dev shop here in bellingham weirldy. So that will be nice if that works out and I can move back to california. Otherwise just kind of poked around with things. Some ssc stuff.

ssc is what i've called the next project btw. it a 'pub', but made with unique code (it's not a regular ssb peer). ssc is like ssb but newer because c comes after b in the alphabet. Its ssb, but run with contemporary things -- put it on netlify, use faunaDB for storage, lambda functions. It's not any *less* decentralized than the current system with pubs sort of, but it uses more boring stuff -- no webscokets or RPC. The part that might be less decentralized is that it is different code than the 'client' apps. Also have to use a different network b/c it uses different protocols.

### todo
* What is a distributed hash table?
* Need to work on ssc -- get replication working


 