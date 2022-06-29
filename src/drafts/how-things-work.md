The stuff I was working on several years ago... is it doing the same things as current mainstream react?

The thing about what I was working on is that I never really got a
'finished' version of things together. So it really does feel like a
prototype, in the sense that you have *a lot of control* over how you do
things. Whereas in a more finished version I would expect there to be
proscribed ways to do anything.

Data fetching, for example. I made a router that was totally open. It gives you the option of fetching in a 'route' function or in a UI component. The good thing about fetching in the route file is that you can load as much or little data as you like. For example, you can 'pre-fetch' something.

Routes, a source of dread in front-end apps. You have to
consider

* when do you fetch some data for a route? When the route loads? Is it
determined by the view component? What is the difference here, 'when a
route loads', vs when the view mounts?

When the view loads, we have rendered the view once, then we request the data and re-render when it gets here. So the difference is just the time it takes to render the view. Which is probably not noticeable? We are using client-side routing in any case, so we're not fetching a full document then fetching data after that.

There is also the matter of 'pre-fetching' things. Which I think is built into the browser API at this point, but it didn't exist in the past when I was doing this.




