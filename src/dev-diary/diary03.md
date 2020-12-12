# development diary

[eventual-gram](https://github.com/nichoth/eventual-gram-ssb) is more or less done. There are still many issues with improving the UI though. I guess those aren't as fun as other things so it is taking me longer to do them.

I still would like to publish the dev-diary entries on the web, however I can't get anywhere with the [ssb-tags](https://github.com/wittjosiah/ssb-tags) plugin. It says the structure is like, but none the less i can't find a tag...

```js
{
  // a user id
  '@DOIjef...': {  
    // a tag id
    '%cJEMdje...': {
        // a msg id
        '%x423jsadxj...': 1204594095 // timestamp tag was created
    }
  }
}
```

Next step is to dig in to the patchwork source code and see how it's done there. Meanwhile copy and paste the content.

Currently have been working on ['ssc'](https://github.com/nichoth/ssc), which is like a pub but more boring and cheaper to host. Need to get message validation working on the node side. It's cool to look into the 'low level' source of ssb and re-do things. It strikes me that a lot of code can be removed/simplified. 

------------------------------------------

This part is just rambling.

It's funny working on things again. I notice that somehow things take a long time, but I don't know why. Once you know what to do it should be relatively quick to write the javascript for it… maybe it takes a few days of mulling things over and making revisions of a blog before you realize what you should do though. That's something I've noticed — it just takes a little while to figure out what to do. Also boring things are less fun, so even if you know what to do, you put them off for longer.

#dev-diary 
