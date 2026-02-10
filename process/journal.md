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

## Basics, erotics, and next moves (2026-01-28)

Yesterday and today I got the basics of a Pong set up. Slow feels slow. One of the things I don't think I'd accounted for is how *smooth* slowness is... it has a... mouthfeel? I suppose it's a game feel™ isn't it, Steve. At any rate there's a pleasure to it, I think - though I'm perverse by nature. I think there's an "erotics" of slowness in here...? Edging? Am I going there? I'm not meant to go that way, this isn't sexy-times, this is meditation and frustration (is that what sexy times are?).

The Pong feels like it already confirms my feeling that this is worthwhile. It makes the key move (slow ball, a nice slow ball), and the move works, and the move invites further moves. The next moves aren't totally clear but:

- Apparently leaning toward eroticism is occurring to me, but I don't think that's the direction I want juuust right now
- I think some sort of slow change along with the game itself might be merited - most obviously a very slow palette shift
- I think, as I noted in a commit, that some music would not be amiss - slow music, drones most obviously, either with random elements so it's non-repeating and/or layering in of elements as the game is prolonged... the reward of the drums or some such...
- Ways to artificially say "oh you're so deep in this, you're so meditating" that perhaps invite or trick or cause meditation for real?

Currently there's no score - does it need one? Yes I suppose so, though it feels like it's not the point? Finishing the game wouldn't be interesting... it's about the movement... I think I'm talking myself out of the score.

What happens when you miss? What slow thing could happen? The ball teleporting back and starting again feels incorrect?

I'm currently: happy with this.

Can I move so fast that the whole thing is done really soon and I don't second guess myself out of happiness? Let's just see.

## Erotica; Music; Suite; Open Source (2026-02-02)

I have a basic implementation of three of the games already and it felt like something more or less immediately, as I wrote. 

At least in Pong, there was the potential for an "erotic charge" version of slowness, the anticipation of physical touch essentially. The meditative thing I think can be felt as well. All through just the slow minimalist version. I wonder the extent to which Pong being two player creates the eroticism of it? Will need to investigate that.

The question becomes (for this and the rest) how I seek to emphasize and shape the experience toward a specific experience of time. Maybe the most fundamental question is just: well, how do you get someone to *stay with it*? Erotic anticipation is an answer, something that fills the attention *in between* key moments is another, pre-emphasis on a meditative state is still another. And they're not all incompatible.

Music has come up as a key question - would some sort of procedural/generative musical accompaniment help to make the in-between time "engaging enough". Do I even want to walk into that territory of feeling responsible for the player's engagement or do I want to pull the old trick of saying "be engaged" and relying on the conceptual layer to do it (losing most people in the process)?

In calling these a "suite" I'm realizing the inheritance/influence of the Nothings Suite which I think I like - a different tradition of variation for me, one where you take known quantities and modify them all in the same way (by generating them from nothing, by slowing them down, by x'ing them). This is turning into a journal entry so let me relocate.

The "in between" is key, and ties very well to meditation and erotic experience. Anticipation on the erotic end, and being-in-the-moment on the meditation end? That seems like a huge part of the "investigation" involved in this then.

In the last commit I found myself thinking about using/wanting to use open source versions of the games as a starting point and just slowing them down and pulling them toward what I need - with the caveat/worry about using a different level of materials meaning I maybe miss affordances/opportunities I would have seen if I'd been paying attention at the deeper level. Also just the classic thing of it taking longer/being a worse experience using existing code than rolling your own.

But I did resolve to try it out, so I will with Tetris at least. No real reason not to.

## Scrutiny, Missiles and UFOs (2026-02-10)

### Scrutiny

I got circle colliders working on my asteroids this morning because I couldn't bear them to be otherwise. And the reason for that is that when they were square (but the asteroids themselves circles to try to keep with a rectangles-and-circles aesthetic) the missile would of course often collide before visually touching the asteroid. Which in the fast-paced hectic world of normal play you don't really notice (or you make the hitbox smaller that the asteroid and so you get the opposite where the missile collides "late"). But one of the key practical outcomes of slowness is that you *see* any of those compromises really distinctly. 

I'm actually in two minds about it - one way is to hew to the "reality" of the original games and have flawed collisions etc. become visible to the player in a way they wouldn't normally be. Another is to embrace slowness as they operating factor and have things "make sense" in that slow world. Currently I'm leaning to the latter because I still have it in mind that this is "about" relaxing/calming/meditating and distractions like odd collisions would seem to distract from that.

So there are kind of different factors of slowness I hadn't anticipated that now rear their heads, scrutiny being a big one. Players have the *time* to examine (and find wanting?) the game. The game seems more vulnerable to the player's gaze? Even at the same time that the game is being sort of "muscular" in asserting an "inhuman" (or at least "non-gamer") timescale? It reminds me a bit of the CPU edition of Ancient Greek Punishment, that tension between the unbeatable/eternal Sisyphus and simultaneously his vulnerability once the timescale is huge to things like electricity shutdowns and hardware degradation.

### Missiles and UFOs

I took a look at the Atari version of Asteroids to check on what the missiles look like and they're just dots. I also saw that the cooldown is way *less* than I thought. I'd imagined a single missile at a time, but in fact you could shoot tons of them! So that needs to be worked in (and indicated?). 

Also recalled the existence of the UFO so need to contemplate how I approach that.
