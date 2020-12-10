# development diary

#dev-diary 

https://github.com/nichoth/eventual-gram-ssb

Something funny happened today. While working on the new version of the app, my test posts from the previous version showed up. It not bad, just kind of weird and cool to see your old data. I guess it was < 2 hops away in the pubs.

![image.png](&pwRz/Q76SIpSYs7dg8rWejmCTtg1lu/U6kAdblDekeU=.sha256)

That's what I'm working on now, pubs & following people. The tricky part seems to be getting a list of everyone that I'm already following so I can adapt the UI accordingly. There doesn't seems to be a method in ssb that does exactly that. There is [friends stream](https://scuttlebot.io/docs/social/query-the-social-graph.html) , but this returns too much info — it is a list of who you and all your follows are following.

Or there is [gossip.peers](https://scuttlebot.io/apis/scuttlebot/gossip.html#peers-sync) which is not ideal b/c I think it returns a list of everyone within 2 hops (not just people you are directly following). It returns a list with hundreds of peers in it, not just the people i have followed, which is like 2.

It's  a little weird b/c it seems like a fundamental thing to know — who you are & aren't directly following. Maybe I'll need to just get all the `contact` messages and reduce them in the app code.
