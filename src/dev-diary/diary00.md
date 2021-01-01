# development diary

#dev-diary

What have i done…

The most recent 20 or so dev-diaries are on [my website](http://nichoth.com/) now. I found myself wanting to refer back to them sometimes, however couldn't figure out how to use the `tag` plugin in ssb, so they're hosted with the copy and paste method for now.

Also has a selection of photos from [eventual gram](https://github.com/nichoth/eventual-gram-ssb), which is the ssb client thing I've been making. I need to finish up with working on it actually. Not for any real reason, I just feel like I'm done. A cool thing about it is that it works with the existing pubs. I used the same `caps` & `sign` values that are in patchwork, not sure if that is necessary regarding the pubs.

My attention has been more focused on [ssc](https://github.com/nichoth/ssc) lately. It's a collection of functions for working with merkle DAGs. It's based heavily on ssb, but with a focus on separating *policy from mechanism* as they say. Meaning that nothing in here should do IO, it's all in-memory functions. There are several libraries for merkle-based replication (this and `hyper*`), but nothing that is a nice building block, without a disk IO element, that I can see.

And also [ssc-pub](https://github.com/nichoth/ssc-pub), which is like current pubs, but built with different stuff. Not sure how I feel about it. There is just more vendor lock in this way. But it shouldn't be too much work to set it up. The existing ssb pubs work without redundancy or uptime concern *because it is a gossip network*. Nonetheless, it is cheaper to use lambda functions and a DB service I think. Have also looked at cloudflare, which has similar stuff — a KV store and something called "durable objects", which I'm not exactly sure what it is, but they enable websockets which is cool and new.

Also made a page of [examples of things](http://nichoth.com/examples/). It's just cool stuff I saw on the web. I think mostly it is from https://www.cassie.codes/ , a classic good website.

It seems like I'm getting much more gossip now on ssb. Maybe people are just more chatty.

 