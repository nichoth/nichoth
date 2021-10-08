---

linkTitle: dev environment
linkDesc: Documenting how I do things
slug: dnv-env
date: 10-7-2021
type: miscellany

---

## dev environment

Documenting how I do things

1. fork something on github.

There is more to this than you might think.

* install the github CLI tool -- [hub.github.com](https://hub.github.com/)

2. Then click the 'fork' button on github.

* Now, in the command line, type `md repo-name`
* `md` is a bash function I have in my `.bash_profile` -- [nichoth/dotfiles](https://github.com/nichoth/dotfiles/blob/master/bash_profile#L177), equivalent to `mkdir -p "newdir" && cd "newdir"`
* There used to be a method for dealing with my dotfiles, which is why there is a repo for them. However I can't remember if/what the methodology was because it's been so long since I've lookd at them. I found [this repo](https://github.com/thoughtbot/dotfiles) which has some instructions. Maybe they are useful. Also [this site](https://dotfiles.github.io/) from github.

3. Now clone the repo. You want to clone the forked version, not the original. `hub` by default will clone from your github username.
```
$ hub clone repo-name .
```

