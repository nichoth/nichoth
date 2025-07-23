---

linkTitle: Signals
linkDesc: What it's like developing with `@preact/signals`
slug: signals
type: dev-diary
date: 9-20-2023

---

# Signals

__Trying another state management library, 2023 edition__

What is the deal with [Signals](https://preactjs.com/blog/introducing-signals/),
a new state machine from the `preact` developers?

The `signals` pattern is to pass an object between components, and then mutate
the `.value` property. That way intermediary nodes do not re-render since
the object reference has not changed; we just mutated a property on it.
But &mdash; this is the tricky part &mdash; you use
[getter and setter traps](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy#terminology)
to create a subscription wherever you access the `.value` property.

This gives you more efficient state updates, because any intermediate nodes
in the view do *not* need to re-render. Since we have just mutated a value,
the object reference stays the same, so we don't re-render our entire DOM tree.
The nodes that consume the signal, though, do re-render when it changes,
because of the `get` and `set` traps.

-------

But, this seemingly erases the benefit of a framework like React &mdash; a
unidirectional data flow, where application state travels from the top downward.

Signals are essentially two-way data binding, aka, the thing that made client
side apps difficult in the past. In my first try I hit traditional problems
&mdash; obtuse state machines that are hard to reason about, and infinite
rendering loops, where a state update will trigger a re-render that triggers a
state update, etc&hellip;

At first I tried just updating a signal from anywhere in the app. This
caused tricky behavior and hard to track down bugs.

*But*, a possible solution is a redux-like pattern, where all events in the
app flow through a single subscription, or "store", and that is the only
place where state is updated. So there is a single state object for the app,
and a single place where state is updated. Then we are back to a nice render
loop pattern &mdash; data down, events up.

## events
I couldn't use redux though. It has some things I don't need, and imposes a
constraint that your update functions need to be synchronous, if I recall
correctly. What I really wanted was more like an event emitter. But we are
in a browser, so there is no `require(events)`. In the past I had used
[nanobus](https://github.com/choojs/nanobus), and that worked well,
but `nanobus` is not quite nano enough. It has some things that
I don't need, and is missing some things I do want.

~~Because the view is organized in a tree (the DOM), we can create all event names at compile time, and then we can see immediately if we listen for an event that does not exist. That's the premise of [@nichoth/events](https://github.com/nichoth/events). It's a minimal event bus, with functions that help to [create a namespaced tree of event names](https://github.com/nichoth/events#create-namespaced-events).~~

_**Update**, Feb, 2025_ &mdash;
Luckily there is an abundance of event emitters in the world of Javascript.
These days I would recommend either [nanoevents](https://github.com/ai/nanoevents)
or [mitt](https://github.com/developit/mitt).

We know at compile time what the possible events may be, and we can pass in the
set of all possible event names, and throw an error if you subscribe to an
event not in the list. So all you need to do is start the app, and it will
immediately explode if you listen for a bad event name.
