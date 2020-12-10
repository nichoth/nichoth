# development diary

Confused about blobs in ssb. After doing some reading, it seemed as though they are replicated "automatically", meaning any blob in the `mentions` array is downloaded, and it's up to the users to for example not follow someone who shares an excessive amount of data. But looking at the docs for `sbot.blobs` confuses me, in particular the `want` method https://scuttlebot.io/apis/scuttlebot/blobs.html . 

Also have decided to get tests going on the local machine so that it runs 2 sbot instances that can replicate with each other. It's going to be difficult i imagine, a day time activity. Testing in a 'live' scenario with another person is fun when it works, but is kind of time consuming now.

https://github.com/nichoth/eventual

#dev-diary 