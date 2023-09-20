---

linkTitle: Signals
linkDesc: What it's like developing with `@preact/signals`
slug: signals
type: dev-diary
date: 9-20-2023

---

# Signals

[Signals](https://preactjs.com/blog/introducing-signals/) give you efficient state updates, but they erase the benefit of a framework like React. The benefit being a unidirectional data flow, where application state travels from the top downward.

Signals are essentially two-way data binding, aka, the thing that made client side apps difficult in the past. And I ran into traditional problems -- obtuse state machines that are hard to reason about, and infinite rendering loops, where a state update will trigger a re-render that triggers a state update, etc...

In my first naïve experiments I first tried to just update a signal from anywhere in the app. This resulted in the expected unpredictable behavior and hard to track down bugs.

*But*, a possible solution is a redux-like state machine, where all events in the app flow through a single subscription, and that is the only place where state is updated. Then we are back to a yo-yo like pattern -- data down, events up.

But since we are using signals, the state updates are more efficient. Any intermediary view nodes between the top and the state consumer do not need to re-render -- they simply pass the signal down to the consumer.

-------

## events
I couldn't use redux though. It has some things I don't need, and a constraint it imposes is that your update functions need to be synchronous. What I really wanted was more like an event emitter. But we are in a browser, so there is no `require(events)`. In the past I had used [nanobus](https://github.com/choojs/nanobus) and that worked well.

But, because of how the view is organized (in a tree), we can create all event names at compile time, and then we can see immediately if we listen for an event that does not exist. That's the premise of [@nichoth/events](https://github.com/nichoth/events). It's a minimal event bus, with functions that will [create a namespaced tree of event names](https://github.com/nichoth/events#create-namespaced-events).

Now we know at compile time what the possible events may be. We can pass in the set of event names, and throw an error if you subscribe to an event not in the list. So all you need to do is start the app, and it will immediately explode if you listen for the wrong event name.

## typescript
But, if we can catch errors at compile time, shouldn't we do that with typescript? Yes, but that's a project for another day. 
