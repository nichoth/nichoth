---

linkTitle: privacy
linkDesc: Thinking about privacy
slug: dev-diary-privacy
type: dev-diary
date: 2022-01-01

---

# development diary

Thinking about *privacy*.

I've been thinking recently that we should be encrypting things 'at rest'. Meaning all messages have a defined 'scope'. If something is totally public it should be unencrypted. But otherwise everything should have a set of people who are able to decrypt it.

The existing private messages are not really what we want here, because they are designed to be *really secret*, meaning that they even hide metadata — like *who* you are talking to. In this situation it is ok to know *who* is a member of what group, we just need the content encrypted.

I know from having been around a while that the current private messages are limited to like 8 recipients. But why is that limitation?

-------------------------------

That's something in the existing ssb apps that has room for improvement — putting it at the forefront as to *who* is able to read what. This makes the use case more about *private groups*.

I've been talking about this with erin, and it's a little tricky because conceptually it kind of overlaps with the idea of pub servers, but it's not exactly the same. 

**what is the ideal scenario?**
* you could have something like discord, where there is a set of 'communities' on the left that you choose to talk in. It's the same user ID for everything, just different groups of audience members.

The encryption is not really so important there, because there is not a user expectation of privacy. It's more about curating/organizing the view of information amongst different communities.

This is different than the existing 'private' messages in ssb, and this gets a little bit tricky with UX, communicating to the user what is happening.

The existing private messages hide *who* you are talking with as well as *what* you are saying. Hiding metadata is really cool, and an important part of the private message system.

Then what I'm thinking of is a separate type of privacy, where it's ok to disclose *who* is a member of what groups, but the content is still encrypted. This is where it gets difficult from a UX perspective, because the differences are really quite subtle.

Another tricky part — how do pub servers fit in here? My instinct is to think of a server like a community, not necessarily overlapping with another pub (but it could be redundantly hosted if another pub follows my pub). That may be sufficient for the organization use case of private groups — choosing which pub to use. This is not really a *private* group, more like a curated set of information.

This is different than the legacy/patchwork use of pubs, where the pubs are just kind of vaguely around, & you don't really keep track of which one you may connect to.

