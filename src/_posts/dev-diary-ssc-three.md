---

linkTitle: development diary — ssc again
linkDesc: slow progress on ssc-server
slug: dev-diary-ssc-three
type: dev-diary
date: 5-4-2022

---

# development diary

## slowly making progress

This is enough progress that I can pause for a second to write about it. Thanks to the infrastructure set up by netlify, github, and faunaDB, I have a 'no code' solution for deploying a social network — https://nichoth.com/ssc/

So now deployment is working; I just have to actually build the thing I'm deploying 😓 (this is the app I just set up deployment for: https://github.com/nichoth/ssc-server . Its been a while since I've worked on this, and a lot has to change. It's basically a full rewrite) 

The last puzzle piece was setting up the DB/schema when you create a new deployment. That is working now, after a morning debugging and noticing a missing return from a promise 😬 All possible thanks to the `deploy-succeeded` function/hook by netlify.

What I’ve done here is factor for moderation. Meaning I don’t have any skill/interest in moderation; it sounds like an impossible/difficult task if the network is big enough. 

So naturally I found a technical solution to the social problem. Now anyone can deploy their own social network easily. And if you don’t like the moderation on your friend’s network, then it is trivial to deploy your own, or move your identity to another one.

-----------------------------------

The word “remix” keeps coming into my mind. Meaning I’m more interested in combining the basic ingredients of ssb in new/different ways than creating another ssb client. What is an ssb client anyway? I think the thing that really defines an ssb client is the use of muxrpc + websockets as the transport protocol, + secret-handshake / secret-stack. The storage, etc, have opinionated defaults, but still kind of up in the air. But to participate in the ‘ssb network’ you do have to speak that protocol of muxrpc & websockets.

