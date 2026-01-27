# Journal

## 2026-01-26

Hello journal. I'm starting a new project. Is this a good idea? Unclear.

### What's up, pips?

I'm starting a new project because I started and then became disillusioned with/lost momentum on:

- *It is as if you were playing a text adventure*
- *Let's Play: Ancient Greek Punishment: 1D Edition*
- *RACERS*

All of those still strike me as "good ideas" that I "should make" but the fact is I don't seem to possess the enthusiasm for them right now, and so... I'm avoiding that by starting another thing and I suppose I'm hoping that the sheer momentum of newness along with "simplicity" just gets me to the end of this process before I slow down and stop. Gaming the system that is my heart.

This significantly stems from more than one person telling me to just make really small stuff, or telling themselves that while I was also there. It's good advice, I give it to myself and others often. 

### The actual Slow Thing

The project itself, outside its role in my psychology, is to make a small set of classic videogames (*Pong*, *Breakout*, *Snake*, *thing 4*, *thing 5*) where the only difference (at least in the first imagining) is that they are incredibly slow. As in, you're playing breakout and it's breakout but the ball moves at... whatever, 0.001 pixels per second or something along those lines. The "how slow?" question is something I need to feel out.

The point here (and I guess I need to write a [Why?](./why.md) to go along with this) is a continuing thinking through of "meditation games" in part. It's partly coming from the fact I've often advised beginner programming students to make this change to something they're working on: what if it was just *really slow*? And when they sometimes actually try it (god knows they don't always listen to me) it can be kind of incredible. There's something very powerful about slowness after all.

The slowness speaks to meditation to me most immediately. When I made *It is as if you were on your phone* there was a constant tugging on my designstrings to make it be about meditation and Zen via the whole Zen Gong Sound Effect thing. I didn't do that because it felt like too much to encompass, but these slow games are one opportunity to do a "meditation thing" in a new form, and I like that about them.

There's a tension here too because it's obvious that an incredibly slow videogame is going to be pretty fucking annoying or stupid to most people. So questions arise about "user experience" and whether I need to signal the aim, whether I need to implement things that speak to the aim with things like scores or timers or reminders to come back or blah blah? And in what ways *those* things end up in tension with the Zen idea? Or whether the Zen idea can't survive the encounter with game design in the first place?

One thing I've pondered is whether it could/should be so slow that you could go away and come back later and it would still be going/would simulate out the physics of the game while you were away and reach an end-state. I quite like the idea, though it would seem to encourage quite a different orientation to the whole thing.

There's that John Cage? organ piece that's going for hundreds of years. There's the Marina Abramovic piece which I think is where I'm getting that title from (the ramp exercise at the Institute). There's Tai Chi. There's slow reps at the gym. There's that embarrassing slow motion ninja game. There are references.

I think that's enough to set out with. I have thoughts on individual games within this including major problems I think I foresee.

BUT more than anything, could I just make this and move on without it being a whole fucking thing? I don't know. Yes? No? How on the hook are we not just to make the first move but to react? How do we know when we're lost in a morass of decisions that aren't all that interesting or don't really make a big enough difference to bother with?

I think internal simulations of physics are going to come into this - the sense of calculating what will happen and when you know your sense of a resolved tension in the game state making it boring? Or just changing the "vibe"?

Some of this can only be decided by making it.

What is it like to playtest something slow? Horrible?

## 2026-01-26

I was going to try implementing some stuff this evening but haven't got to it as yet. I've been caught up in thinking about the differences between the games I'm proposing (to myself) but also the question of mobile-friendly, which generally speaking I do want.

### Mobile?

Mobile massively changes the kinds of controls we can reasonably have and the way that they feel. Like, how would you do *Asteroids* on mobile? I could look at an example most obviously I guess. Swipe left and right to turn, tap to shoot? I suppose that's alright actually. Alright well maybe that bit is solvable.

### Time-feel

The other big controls-oriented thing is the relationship between the player's not-slow-time and the game's slow-time. In my imagining of *Pong* for instance it's that the player can move the paddle as rapidly as they want, but the ball will move very slowly (no thoughts just yet on the AI paddle, but I suppose it too can move ultra slow - though in doing so it will kind of imply the player ought to as well?).

That makes sense in mobile (just to tie these two together) as well because there's not necessarily I super obvious way of converting mobile input into slow-input? I suppose you could press or swipe and have it translate to small amount of motion? But it seems off? And I think I like the realtime-ness of the paddle movement as something that throws into relief your relationship to the system. It kind of "creates" time-feel? What the fuck am I talking about with time-feel? Let's not take ourselves too seriously even though it's a pretty fun term.

BUT not every game would have this kind of realtime input or, if it did, it might impact how the game plays. e.g. Asteroids? Can the ship spin at a "real-time" speed but everything else is slow including the pace and cool-down of shooting? If so the game is radically changed because it's so much easier to play? But then I suppose that's just the same as in the Pong... the point here isn't for the game to remain challenging... almost the opposite? The Zen-ness (and the frustration of it?) is all about the lack of tension? Or the relocation of the tension to "I want to *act*!"

### Game choice

So, alright, Asteroids sure. Pong sure. Breakout sure. Tetris?

Tetris... well I suppose so yes. You can move the pieces around willy-nilly in terms of left/right and spin, but they drop slow and presumably you can't do the turbo-drop or maybe even the speed-up thing? Or is it funny to have the speed-up but it's also VERY SLOW?

So Tetris sure. And perhaps one more for the no-reason-for-ot number of five? I do like Snake, but the problem with Snake is that it doesn't have that idea of a separation between player and motion? You contro the snake and the snake is slow and on tiles, so your actions only have an outcome on tile boundaries/ticks (and in fact you would have to make the snake slide continuously between ticks). So it kind of doesn't work?

Space Invaders makes sense (provided a shooting cool-down as with Asteroids). Are they too similar? Frogger is quite funny, though feels somehow really distinct? Missile Command is quite *appealing* to me somehow, but I don't know that I know how to make it? But probably I could learn.

So that fifth slot is up for grabs. 

- Pong
- Breakout
- Asteroids
- Tetris
- Space Invaders / Frogger / Missile Command

Seems reasonable and I can absolutely make Pong and Breakout *now* so as to get a decent start on this before I lose hope. Tetris scares me a bit, but I can probably do it.

Phaser3 versus p5? Any reason to use one or the other? Probably. I'll think about it tomorrow.