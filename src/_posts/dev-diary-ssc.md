---

linkTitle: development diary — ssc edition
linkDesc: What happened during the last 2 years
slug: dev-diary-ssc
type: dev-diary
date: 5-30-2021

---

An overly long description of what I've been doing for the last 2 years, written in the 2nd person for some reason.

* [nichoth/ssc-server](https://github.com/nichoth/ssc-server)
* [nichoth/ssc](https://github.com/nichoth/ssc)

------------------------------

# development diary
## 5-30-2021

It's a classic story... in college you split your degree between photography and computer science, then years later you want to put some pictures on the internet. There is instagram... but it's a little creepy. It's owned by facebook, and it's a free service, which means they are harvesting as much data about you as possible, and there are advertisements. So you do the obvious thing -- you create your own version of instagram. No big deal.

This is at a time when decentralized, p2p tech is the cool thing. This is where the cool people are putting their energy. In a recent past life you were very tuned in to what is happening in the JS world, so you already have experience using *ssb*, a very cool p2p network that *actually works* right now. For some reason ssb was a *cool place*, where cool people hung out and wrote their honest feelings. It reminds you of *the early internet*, before everything was very commercialized and you could have genuine interactions with genuine people, without any pressure.

So naturally you decide to build this gram app using the ssb protocol. However, there are some drawbacks to using ssb -- like for example data is tied to a specific machine, which means that the original goal of publishing photos to your website can only be completed on a single computer. Luckily there is [surge](https://surge.sh/), a cool recent project that lets you easily host a website, and deploy entirely from the CLI. So that works, and you use this process to make your website ([the command `surge public` to deploy](https://github.com/nichoth/nichoth/blob/master/package.json#L18)).

------------------

Also, sometime during all this you get run over by a car, and your brain is now a mashed potato. Not good for someone who is a computer programmer, and actually uses their brain regularly. So you spend months in a coma, and then >1 year after that learn how to walk and talk again. It's kind of a scary situation, because no one knows if or when you might get better.

So fast foward like another year and here we are. You had to stop working at your prior job obviously, and now you need another job so you can go back to the bay area and see the sun again. It's kind of disheartening.

But maybe thats a blessing in disguise. Because now you have time to actually work on your own projects. I'm still waiting for the blessing part, so far it's just a disguise.

You've been working on ssb-related things for a while, but it would be cool to make ssb but working in a browser. You know, so that your browser is once again a 'thin client', just *browsing* data that is on a server. The servers then are the actual 'p2p' network. They all gossip amongst each other, and that makes a lot of things easier -- no NAT hole-punching or pub servers. No gigantic `.ssb` folder taking up space on your machine.

This is the very long, and very *ssb*, way of announcing [ssc](https://github.com/nichoth/ssc-server), a new, ssb inspired project. This is *less radical* than ssb. It has traditional client-server structure. I say it's ssb inspired because the data model is taken directly from ssb.

-------------------------------

There are a couple bits of pure magic that are the basis of contemporary networks -- the signed merkle-list and public/private keys. It's too much to go into now, but these ingredients enable cool things. I imagine in the future people will continue to refine these ingredients, like right now we are seeing identity being decoupled from proprietary networks. Like `metamask`, for example. This is a nice thing to play with in ssc too -- the identity is more at the forefront than *patchwork*, for example, where it is baked into the client.

So how does *trust* work in a server-based p2p network? Decoupling the identity from the server reduces trust issues quite a lot. For example, thinking about *evil nichoth* in the future, evil-nichoth would not be able to impersonate a user of the network becuase every user's data is signed with their private key. And if you store your private key on a different ID-server or on your own machine, then i wouldn't have access to it. Also any thin-client (web browser) would still be able to verify your posts are ok. That is the one place where the trust issue gets weaker in this model. I could return bogus data if I wanted to from my server, because as a thin-client you don't check the *entire* log to verify the *entire* merkle-list. The thin-client just views the posts that it cares about.

However, there could be a network of multiple servers. The servers would all gossip data amongst each other (every server has the full merkle-dag), then they would know if another server is returning bad signatures. The client could then display the differences in server data, and allow you to mark a server as being bad or something.

----------------------------------

Still todo: encrypt things

This is a big thing that's kind of important. Because I don't want to be able to see the pictures that everyone posts. How to do this? May need to switch to a different storage provider. Right now we are using `cloudinary`, which is fine for a demo, but it provides a robust image storage service, with CMS and stuff for the files you upload. What we want is more like just a filesystem, where i can write encrypted things and never know what it is.

