---

linkTitle: Signals
linkDesc: What it's like developing with `@preact/signals`
slug: signals
type: dev-diary
date: 9-20-2023

---

# Signals

__Trying another state management library, 2023 edition__

What is the deal with [Signals](https://preactjs.com/blog/introducing-signals/), a new state machine from the `preact` developers? The `signals` pattern is to pass an object between components, and then mutate the `.value` property, but you use getter and setter functions, to effectively create a subscription wherever you access the `.value` property. This gives you efficient state updates, because any intermediate nodes in the view do *not* need to re-render, since we have mutated a value, the object reference stays the same.

But, this seemingly erases the benefit of a framework like React -- a unidirectional data flow, where application state travels from the top downward.

Signals are essentially two-way data binding, aka, the thing that made client side apps difficult in the past. In my first experience I encountered traditional problems -- obtuse state machines that are hard to reason about, and infinite rendering loops, where a state update will trigger a re-render that triggers a state update, etc...

In my first naïve experiments I just updated a signal from anywhere in the app. This resulted in unpredictable behavior and hard to track down bugs.

*But*, a possible solution is a redux-like state machine, where all events in the app flow through a single subscription, or "store", and that is the only place where state is updated. So there is a single state object for the app, and a single place where state is updated. Then we are back to a the nice render loop pattern -- data down, events up.

Since we are using signals, the state updates are more efficient. Any intermediary view nodes between the top and the state consumer do not need to re-render -- they simply pass the signal down to the consumer.

-------

## events
I couldn't use redux though. It has some things I don't need, and a constraint it imposes is that your update functions need to be synchronous. What I really wanted was more like an event emitter. But we are in a browser, so there is no `require(events)`. In the past I had used [nanobus](https://github.com/choojs/nanobus) and that worked well, but `nanobus` is not quite nano enough. It has some things that I didn't need, and is missing some things I did want.

Because the view is organized in a tree (the DOM), we can create all event names at compile time, and then we can see immediately if we listen for an event that does not exist. That's the premise of [@nichoth/events](https://github.com/nichoth/events). It's a minimal event bus, with functions that help to [create a namespaced tree of event names](https://github.com/nichoth/events#create-namespaced-events).

Now we know at compile time what the possible events may be, and we can pass in the set of event names, and throw an error if you subscribe to an event not in the list. So all you need to do is start the app, and it will immediately explode if you listen for a bad event name.
