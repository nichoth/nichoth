# development diary

#dev-diary 

https://github.com/nichoth/eventual-gram-ssb

Thinking about how replication works now. [The protocol guide](https://ssbc.github.io/scuttlebutt-protocol-guide/#createHistoryStream) is pretty helpful. One sbot creates an RPC connection to the other, and calls `createHistoryStream` for every feed that they follow. I still don't understand how permissions work for the RPC calls however. Maybe it's in the protocol guide too.

This comes from a context of thinking about what a re-implementation of ssb would be like, so that it is more like git & github. Meaning you have a more traditional client & server structure. It's kind of like pubs now. But what would it look like just doing http calls instead of RPC over TCP?

Have been playing with [making a flumeView](https://github.com/nichoth/eventual-gram-ssb/blob/main/test-flume-view/index.js) for tags also. The existing tag structure feels kind of weird to me. it is a tag object, which has no data really, it's just an object. Then you publish an `about` message that names the tag, then you can apply the tag to messages. I'm trying to re-do it so that the `name` is part of the tag object (you can't re-name tags in this structure). So you have a flumeview that is a map of tag names that points at a list of messages. Updated the [field-guide](https://github.com/nichoth/ssb-field-guide#make-a-databse-view) with some stuff too.

```js
{
    name: [msgID]
}
```