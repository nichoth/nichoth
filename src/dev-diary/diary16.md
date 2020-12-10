# development diary

https://github.com/nichoth/nichoth
https://github.com/nichoth/ssb-web

Saw a nice episode of [speakeasy js](https://www.twitch.tv/videos/752037225) , in which rod vagg discusses some basics of content addressed blobs. 

Also, have finished [my website](http://nichoth.com/), which uses ssb as a content source, and renders the html with [hyperstream](https://www.npmjs.com/package/hyperstream). 

I was thinking while making this that it would be good to query by both userID and and post type, which interestingly I don't see a way to do with the existing API. But maybe it's not necessary. So far doing the query by userID, and then using `pull.filter` to filter the results has been adequate. It's kind of an interesting rabbit hole, how to do efficient queries when you already have 2 materialized views. I think your query would be items that are in *both* the userID results and the `.type` results.

Another question is how to do hash tags in ssb. I discovered the plugin [scuttle-tag](https://www.npmjs.com/package/scuttle-tag) , which seems appropriate. Also discovered [ssb-conn](https://www.npmjs.com/package/ssb-conn), which i think phases out the `gossip` plugin.