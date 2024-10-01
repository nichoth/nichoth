---

linkTitle: End to End Encryption
linkDesc: Investigating privacy + e2ee on the internet
slug: misc-e2ee
type: miscellany
date: 9-30-2024

---

# End to End Encryption

*Plus*, [see the source code](https://github.com/nichoth/level-todo)

## The premise

Let's make a todo list. People seem to like those. They are fairly common.

<[make a todo list](https://github.com/nichoth/level-todo/blob/3f1b687e4b65d970c31b3f4642a4172156b01fce/example/state.ts)>

That was easy. We have made a todo list app, and it persists data locally, because we are the only person who cares about what's on it. Because we are using [indexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB), we can refresh the page, and our data is still there.

There is no need to save this to a server. It can stay just in our own web browser. *But* &mdash; we have multiple devices. Working on multiple devices is now *"table stakes"* for any web app. We have a computer and phone at minimum. We want the same data to be visible on both.

...That means we are not local anymore? If we use data on more than one device, then it needs a way to travel from one device to the other.

And what about backup? We want this data to continue existing even in the event that we lose our device(s). Hmm... it's not so simple anymore. We need multi-device sync, and backup copies.

That brings *privacy* into the picture. We don't want anyone else to be able to see our todo list, because no one else needs to read it.

There are varying shades of privacy. This could be private because we sign in to a server, and the server only serves *us* the data. But that means that the server could still read the list.

Why would that matter? At the most innocuous, this server would read our lists, and use that info to sell advertisements to us. Maybe that's not so bad. In a less innocuous scenario, this server operator might read a *todo* item about our reproductive rights, or something political, for example, and now we are in a morass of legal issues.

Somehow our simple todo list has turned into an investigation of personal privacy on the internet. That's what we'll look at today. How do we get synchronization between multiple devices while still keeping things private?

We want ✨ **end to end encryption** ✨.

This way we can use traditional methods of sync, like for example a server that stores data in a database. The data we are saving, though, will be just an opaque string. It is only usable if you can decrypt it, and, because this is encrypted end to end, we (the user) are the only person who can decrypt it.
