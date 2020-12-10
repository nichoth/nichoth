# development diary

I am done doing the vhs website now. It's kind of cool that all the stuff necessary to host a real website was free. Theres even a DB now called fauna, which means everything traditionally in a monolithic website is available free on netlify — hosting, data storage, and server side functions.

https://github.com/nichoth/whammy
https://square--whammy.netlify.app/

Have switched back to doing ssb-ish stuff -- https://github.com/nichoth/eventual-gram-ssb . While developing, I had a small DB seeded with data, but then I enabled the plugin `ssb-db`, and after that the database was totally borked, and the file it was looking for was missing. So that's a bummer. 

Have started looking at 3box and textile, though there is still some weirdness with them that requires some context specific knowledge. Like you have to make calls to an ethereum library in order to use 3box, and that's fine except that i don't know what ethereum is or how to get it in the browser. It's frustrating. You have to go to great lengths to do simple things.


#dev-diary 