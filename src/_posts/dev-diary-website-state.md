---

linkTitle: State of the Website
linkDesc: How to do websites?
slug: state-of-the-website
date: 06-07-2025
type: dev-diary

---

# development diary

Hydration, server-side rendering, client-side apps, single-page apps&hellip;
so many choices&hellip;

## State of the Website

At the end of the day, we want to make an HTTP request for exactly
the data that we need (nothing extra).

In the world of React, we can do this by *server-side rendering* the page,
then "hydrating" it on the client side. That means the server returns
an HTML page, then on the client we add JS so that all the routing, events,
etc, are taken over by a client-side app.

Subsequent page changes then make requests only for JSON, not HTML, because
creating the HTML (the page) is handled client-side.

So, this looks like we have achieved the most efficient page load +
transfers. *But*, it's a big task, to server-side render, then "hydrate"
on the client side.

Does this save us developer time? Maybe. The idea is that we have a single
codebase that renders HTML on the server, and then can attach all event
listeners on the client by sending a compiled bundle of code.

This feels oddly familiar... It feels like when I was first learning web
development, and you would create an HTML page, maybe with PHP, and the
Javascript would use `querySelector` to find an element and attach
event listeners.


### Patterns

So in classic react, we get the pattern where the view is simply a function
of state, a "unidirectional" flow of events to state to view. This pattern
factors out the imperative process of updating the DOM.

In server-side-rendered react, we want to factor out the imperative process of
things like code-splitting your bundle, choosing which page has a link to which
JS file. In general, we are trying to factor out the page loading logic, the
imperative code needed to link HTML to JS and CSS.

### Servers

Now we have a compiled bundle of code that attaches the event listeners,
and the HTML is created from JS, either on the server or in the client.
This means our server needs to be *a lot smarter*. Not the server, necessarily,
but the build process, at least, now depends on some very smart JS.

That's the part I'm not crazy about. Now we are relying on very smart
(aka brittle) JS to do what we used to do by hand &mdash; splitting bundles,
attaching event listeners, linking files to pages. We are trusting a compiler to
do the things that are part of *the web* as a platform.

This is all so that we can get that react-ish pattern, where the GUI is simply
a function of state.

After dipping my toe into updating the GUI from JS events again, like in
2012... I get it. *It is painful* to update the DOM manually, imperatively.

This brings us to [*islands architecture*](https://jasonformat.com/islands-architecture/),
which is where we try to keep the good parts of the react pattern, and also have
that imperative, hand-rolled style for factoring and linking
your dependencies.

### The Future

My memory of when React was first released is that it was a huge revelation,
a new way to do the web that was universally loved by developers. What about
the SSR version? It's a bit controversial, for a few reasons.

1. It takes a non-trivial investment of time for a developer to learn to use it.
   If I have to invest a chunk of time, then why not do what I already know,
   manually factor my code in an efficient way? Client side react,
   *vintage react*, was a dramatic change. It made a huge cut to the pain 
   of client-side development. Instead of spending all day moving DOM nodes
   around, you could focus just on your application logic, the things
   that matter. Classic react used something I already know &mdash; HTML, so
   there is no investment of time learning a new pattern.
2. Is the end result better, or at least as good? Probably not. One thing about
   client-side react is that *it worked*. It just did its
   thing and you didn't have to think about it most of the time. The amount of
   logic, [context specific logic](https://www.zachleat.com/web/webc-in-eleventy/)
   that goes into server-side rendering makes it a much harder problem. Is it
   possible to solve this is a mechanical way? We are still waiting for
   an answer.
