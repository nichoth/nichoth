I was talking to a friend who is working in a web design agency, and they 
mentioned that a difficult part of starting projects is all the
coordination of logins with their clients. There are many logins to keep
track of for any web project -- DNS, web hosting, etc. Everything has
2-factor auth these days, and it is hard login to all the things. Clients
don't necessarily know what Signal is, and it is a lot to ask the client
to download a new app to exchange passwords or 2fa codes.

They had used [vanishing.page](https://vanishing.page/) to send documents,
but what would *really* be helpful is a way to have a *live* e2ee chat with
their clients, *without* having to explain what Signal is and ask people
to install it.

I thought that sounded good. Just add live chat via websocket and we're 
done. We already create keys in the browser via
[simple-aes](https://github.com/vanishing-page/simple-aes/);
we can just add another key and we're done.

*Except for one thing*. This is exactly the kind of scenario that Signal's
double ratchet algorithm was created for. If I'm going to add a new feature,
I want it to be the best version that it can be.

That's the backstory of
[webcrypto-mls](https://github.com/vanishing-page/webcrypto-mls).
It is [MLS](https://datatracker.ietf.org/doc/rfc9420/) usable in the 
browser, with the web crypto API.



-----------------------


[Brooklyn discussion](https://discord.com/channels/478735028319158273/1167174731577966592/1167392592275718175)

> MLS (https://messaginglayersecurity.rocks/) is meant to be pretty general. It's basically a secure tunnel for two or more members with "perfect forward secrecy" — kind of like Signal's double ratchet if you're familiar, but extended to groups. Essentially even if someone does break in, the keys get rotated frequently so they'll get booted out.

Another way of thinking about it is roughly like a transport-agnostic multi-party P2P TLS with fancy security. Once you layer it on, you can push messages over the tunnel without having to think about it much.

Some use cases:
- Encrypted chat (obviously)
- Securing RAFT consensus sessions
- Multi-device sync

