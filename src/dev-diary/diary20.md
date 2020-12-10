# development diary

https://github.com/nichoth/eventual-gram-ssb


A cool thing about devloping is that you can loose hours just sitting and not doing much, but you're reading about various things on the internet. It's no wonder the creator of ssb lives on a boat — you have so much more time when you don't have to pay rent. While i don't recommend the whole severe head injury thing in general, living at my parent's house is great for options with how you use time.

Just now for example I was reading about the question of how replication works in ssb. I understand at a high level the system of following & public/private keys, but it must come down to a URL & protocol for a peer at some point. I think it can use various protocols in addition to tcp.

Looking at the code here https://github.com/ssbc/ssb-invite/blob/master/index.js#L195 , it appears that all that info of host & protocol is embedded in the invite code used by pubs . It's still not clear however where the pub's address info is recorded in the DB. It must be written down somewhere.

