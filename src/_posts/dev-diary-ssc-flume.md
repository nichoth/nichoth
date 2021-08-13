---
slug: dev-diary-ssc-flume
---

# development diary

## ssc-flume
Good news. I got ssc working with muxrpc and flume-DB. What this means in regular-ish english -- I made an [example repo](https://github.com/nichoth/ssc-flume/blob/main/example.js) that uses `ssb-server` (the server-side ssb-ish merkle-DAG) with `muxrpc`, but using a custom API (not the normal ssb api). The original `muxrpc` developers made things modular enough that you can pick and choose which parts to use. it's not just a baked-in part of ssb. So that's nice.

In broader context, this is a step toward getting a flume DB that is usable by multiple users, not just one (as in ssb).

At first I thought I could use [ssb-feed](https://github.com/ssb-junkyard/ssb-feed/) in this situation, however it expects just one user also (it takes keys upon instantiation, rather than per `publish` request). So you would need to re-write a `publish` function that takes a message and verifies that it is next in the merkle-sequence, and that it was signed by the owner of the right private-key.

It's kind of amazing how much you can do with public/private key cryptography, and it's wild that the world is just right now discovering things that use it. I mean even `git` has been around for a little while, but we're still, as a species, discovering new things to do with keys.

Also have factored out a little bit of [the DB logic](https://github.com/nichoth/ssc-fauna) from `ssc-server`. That will make things better. It's also kind of cool how much you can do for free right now. There is free hosting and free database service... that's like everything that you need for a web app.

