# development diary

#dev-diary 

The "[app](https://github.com/nichoth/eventual-gram-ssb)" (the instagramish thing) feels like it's in an ok state for some reason. it doesn't do much of course. I'm wondering if this feeling like it's semi-done has more to do with my brain being in an ok state than the app being ok. It's stable at least now, no disappearing posts anymore. Next is make a way to add peers and pubs. Important for a "social" app, seeing peers.

Next step I think is fixing up my "[website](http://nichoth.com/)", which not so surprisingly leads me to want to make an ssb-backed website generator/CMS tool. Related to the website task is that I am going to start looking for a job i guess. 

I was thinking I should make a pub for my app, which made me think about what it would take to make one for free. This means you would need to use lambda functions (via netlify) and re-write some of ssb so that it uses finite processes instead of a daemon-like process that is always on. The part that costs money then is the storage. Netlify has a nice free-tier of fauna DB, but of course you have to pay once it exceeds the free part. This is a long way of saying that it would be cool to make an ssb that uses finite processes, which is something else on my list now.

