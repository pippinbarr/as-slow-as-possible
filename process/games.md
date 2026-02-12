# Games v2

Since writing v1 below I've settled more clearly on the specific suite of games, so let me reduce the space here by only dealing with them (can always re-expand if I need to later on).

## Pong

We have two paddles, one player (mouse/touch) and one "AI" (perfect), and we have a ball moving extremely slowly (the AI player moves slowly in consequence which is interesting - they could also move instantly to the predicted endpoint of the ball, which could be calculated and might be worth checking).

Questions (relevant in general, but just writing them here as a practical matter):
- Score? Do you have a score in this? If you do what does it do and mean? Does it help or hinder the slowness? Should the score be a timer (meditation)?
- Reset? What happens if the player misses the ball (assuming for now the AI won't)? How do we visually depict the reset in a world of slowness? A (slow) fade? The standard teleport (which will appear even faster I guess)? Some kind of tweening back into place but faster than the standard motion (quite confusing even as I write that)?
- Music? I currently have (just by convention of example code) quite peppy music which serves as a contrast to the direction of play. I've thought more about drone music, about slow procedural music, about minimal music, maybe about more unpatterned/mostly unpatterned music?
- In/out? How do you get in and out of the game? Is there an explicit invitation to quit? Is there an endpoint (timer? points?). In this moment I'm drawn to the idea of committing to, say, two minutes of play, five minutes of play, ten minutes of play, leaning into the meditation concept. I like the idea of there being a different measure of play when we move more slowly.

## Breakout

We have the paddle, ball, and breakable bricks. Thus it's kind of in the same situation as Pong, except for being a different game. It technically has both a higher frequency of meaningful action (a break breaks) and also an oddly more frustrating sense of time (the bricks themselves represent time and seem totally overwhelming).

Questions:
- As above, and
- Quantity of bricks? How many bricks is somehow too forbidding? If a "normal amount" then how to I help the player cope with the incompleteness of the task? A lack of score presumable helps - just the timer, but here the timer could easily be read as the time you have to eliminate the bricks and thus more frustrating, not less...

## Tetris

- As above, and
- Instant lateral movement? Right now lateral movement is instant which is true to Tetris in general but really odd somehow in the context of it's slow downward movement. I don't think it's a bad thing, it's just something to remain aware of...

## Asteroids

Basics of this are now in place.

- As above, and

## Missile Command

Of all of them this is the least established but I'm including it because it's the one I *want* to include the most. Space Invaders remains a competitor here.

I haven't made it, regardless, but I feel there's "something there" in the motion and nature of input, the idea of calculating trajectories and intersections coming to the fore. Will have to make and try it to know though.

# Games v1

The point here is to have a place I can do some good old design thinking about specific games within the collection. As well as to come up with which games those might be.

## Pong

This is the one that starts it for me because I've advised students to try it out and I advise it in the current draft of the current book (*Playing the Variation Game*). In short: when I slow down the ball massively it feels like something.

One observation here is that I imagine slowing down the *ball* only, not the paddle, so that the player would still have immediate and "normal" agency in the sense of affecting something in play, but has to wait because there's a secondary object they are affecting.

That said, maybe there's room for that being a point of variation: *what* is slow.

I had a vision while sitting in this café (*Even*) of clouds slowly moving across the playfield for some reason and I kind of like it, but it's purely intuitive. I imagined it marking some kind of separate time, the clouds being faster than the ball and slower than the paddle. As well as perhaps being a repeated visual "refrain" across the games potentially. Though why?

There's a big question about AI here, or otherwise there's a big question about multiplayer.

## Breakout

Pretty similar to *Pong* ultimately, maybe not illustrating anything else? Well apart from the multiplayer bit, so maybe that's fine. 

The occurrence in *Breakout* where the ball gets up behind the bricks is interesting/potent in the context of slowness? 

## Snake

Party just because I already have an implementation? But also because it's pretty funny. BUT because Snake is tile-based, how do you control the snake? My assumption when I briefly thought about this was that there's an arrow in the snake's head pointing to the next direction and that's what you can change by pressing keys. Less immediacy of agency than the paddle in the other two, but not necessarily a bad thing?

## Asteroids

This is a nice one somehow, but what is slow? The ship *and* the asteroids? Only the ship's acceleration? Complexities in this one because of the freedom of movement? But I do like it in principle...

## Pac-Man

Kind of beautiful to imagine this one. Again either needs the arrow for changing direction per tile or something else?

## Space Invaders

Lovely. Slow invaders and slow bullets? And some kind of cool-down I guess right?

## Duck Hunt

Just because

## Tetris

This was on my original list... it seems like a pretty good one?

## Flappy bird

I wonder

## Chess

Have I already done this?

## Missile Command

Mostly here because it's a fairly simple game but I confess I don't really know if/how to create it.

## Frogger

Somehow feels like this "won't work" for reasons I'm not sure about... but maybe it would? Tile by tile movement right? Seems okay?

## ...