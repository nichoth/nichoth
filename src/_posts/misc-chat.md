---

linkTitle: swarmchat
linkDesc: Trying `webrtc-swarm` and `signalhub` for p2p
slug: chatting
type: miscellany
date: 2022-01-01

---

# chatting

* [the source code](https://github.com/nichoth/nichoth/blob/main/src/chat.js)
* [the demo](https://nichoth.com/chat/)
* [swarmchat gist](https://gist.github.com/substack/0177839f57e8fe0fc294)

Where I try using `webrtc-swarm` and `signalhub` to set up a p2p connection.

It's cool that it's free to do this. No data is being saved by a server; it's all p2p as far as i know. I remember in the early days of internet it was quite radical to have something as simple as a chat room. You could talk to anyone anywhere in the world; what a cool thing.

It's notable that we're *not* actually using [the ID](https://github.com/nichoth/nichoth/blob/89314afaf2a9c0169dbc81e7aca544e22e7e2327/src/chat.js#L56) that we create for each message. In the inspiration (the swarmchat gist), it looks like they are using the message ID to deduplicate the messages, but here we are just counting on the `webrtc-swarm` library to deliver everything exactly once to each person in the swarm.

