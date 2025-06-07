[Brooklyn discussion](https://discord.com/channels/478735028319158273/1167174731577966592/1167392592275718175)

> MLS (https://messaginglayersecurity.rocks/) is meant to be pretty general. It's basically a secure tunnel for two or more members with "perfect forward secrecy" — kind of like Signal's double ratchet if you're familiar, but extended to groups. Essentially even if someone does break in, the keys get rotated frequently so they'll get booted out.

Another way of thinking about it is roughly like a transport-agnostic multi-party P2P TLS with fancy security. Once you layer it on, you can push messages over the tunnel without having to think about it much.

Some use cases:
- Encrypted chat (obviously)
- Securing RAFT consensus sessions
- Multi-device sync

