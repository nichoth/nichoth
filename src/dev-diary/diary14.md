# development diary

https://github.com/nichoth/eventual-gram-ssb/blob/main/hashtag-test.js

## tags

Tags are pretty important b/c they are the main way of categorizing messages. I think in patchwork hashtags are called 'channels'. I looked around in the patchwork source to see how it's done, but didn't figure it out. It seems that tags are their own type of message that is published to the log and replicated with everything else. I've been looking at using [scuttle-tag](https://github.com/ssbc/scuttle-tag) thus far. It's not clear to me what the signature to [create a tag](https://github.com/ssbc/scuttle-tag#tagasynccreate-cb) is though. The docs feel slightly incomplete here. For example, where is the `name` (the text) of the tag saved? And is this a ssb plugin too? I'm not sure based on the signature.

Actually, it looks like the [tag name](https://github.com/ssbc/scuttle-tag/blob/master/async/name.js) is published as a separate `about` message. So creating a tag with a name is a 2-step process — first create the tag, then name it (then apply it to the message being written as the overall last step). 

scuttle-tag has a [getSuggestions](https://github.com/ssbc/scuttle-tag/blob/master/index.js#L6) method. Need to try that so you're not constantly creating new tags with the same name.

----------------------------------------------------------------------------

Plague life is kind of a bummer. That's pretty wild that just a few months ago we took it for granted that we could just meet with anyone and not wear masks. 

