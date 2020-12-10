# development diary

Working on getting tags to work in the app.

https://github.com/nichoth/eventual-gram-ssb/blob/5d106ef167d9b21453f0143f3aaee8076d8a5c3d/src/subscribe.js#L126

Its more complex that I expected. It seems that a tag is it's own entity in the DB, not even having a `name` property embedded in it. The tag object then has to be named with an `about` message. It seems more convoluted than i would expect, but maybe there is a reason for it. I would expect `name` to be just a property on a tag, then if you want to change the name you would create a new tag, and you would need to publish a message that re-links all the posts that the tag references.