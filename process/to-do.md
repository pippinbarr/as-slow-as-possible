# To-dos ("final" )

## Music
- Looks like it'll be too hard for me to bother ~~One-time triggering of sounds for events? Or not worth it?~~

- One more pass

## General

- Transition from game over to any kind of message to menu? Maybe just the same style as instructions but "Game Over. Tap/space to return to the menu" ?

## Pong

- Syrup level

## Breakout

- Syrup level

## Space Invaders
- ~~Tween the invaders down rather than jump~~
- ~~Action on player death by missile (everything stops then respawn?)~~
- ~~Action on three player deaths by missile (everything stops then reset?)~~
- ~~Particle effects for player death~~
- ~~Action on player death by invaders (everything stops then reset?)~~
- ~~Action on invaders reach bottom in general (everything stops then reset?)~~
- ~~Action on all invaders dead (reset)~~
- ~~Particle effects for invader death~~

- Syrup level (it's not *bad* at the moment but I can maybe do better - ship might be too fast?)
- Enemy Firing rate based on speed (realizing it can't just be a probability tied to framerate) <- I tried this and it didn't seem quite right. Worst case I can tune it for TIME_SCALE of 1 though
- Still some weird shit around resets looking proper and not stupid

## Missile command

- Syrup level

---

# To-dos (pre end-game)

## Overall

- **It's at least 16:9 now for better or worse... let's see how it holds up** ~~Maybe more of a screen size agnostic approach? Or at least aim to fill the window a bit better on mobile? What did I use for the phone game? 16:9, so that would be more like 480x720 at least.~~
- ~~Fix everything that got broken by the dimensions (layouts mostly, but does breakout columns etc. work?)~~
- ~~Figure out input (mobile especially) -- is it that a hold-press on left or right side moves paddle/ship and a tap in the centre "fires" (or tap in specific location for MC)? Relatively simple at least. Make it the same for desktop or do that with keyboard?~~
- ~~Resurrect cursor input for desktop~~
- ~~Instructions for input? (Where? When? Always?)~~
- ~~z-index of instructions~~
- **Fixed I think?** ~~[x] 2026-03-11 Asap not fitting on mobile mobile~~

## Difficulty levels

- **I think it's better and less complex to leave it as duration** ~~That rather lovely idea of difficulty being reflected in either how long you play or how slow it is or both...~~
- ~~Implement Nightmare's count up (based on duration of -1)~~
- ~~Implement Nightmare unlock when you win on Hard~~
- **No I think it's too much, no need to double the same joke/idea** ~~Make it *slower* as well in difficulty levels, or don't want to suggest slowness is a nightmare?~~

## Sound/music

- **Well there's something now** ~~Right?~~
- **Couldn't work this out** ~~[~] 2026-03-11 Asap sound when you navigate away ands back on mobile?~~

- Work on the music // Though I'm starting to feel like it probably does the trick?

## Menu

- **Basic menu up and running without too much agony** ~~We need a menu system for choosing the game~~
- **Looks awesome too** ~~Some kind of crossfade or other fade to make it slow to go between menu and next thing etc. Probably yes.~~
- ~~and the difficulty~~
- ~~add red underline to title?~~
- ~~Indicate under Nightmare that it can be unlocked (remove text when it's unlocked)~~
- **Nah let's not overthink it** ~~Fancy UX to indicate when Nightmare unlocked but they haven't tried?~~
- ~~Leave selected element highlighted (disable input)~
- ~~Allow selection during fade in~~
- ~~Add back button to get to main menu again~~

## Pong

- ~~How to handle the reset when someone misses? One weird option is simply not to (per Missile Command? Seems really weird but also refocuses what the game means?)~~
- ~~Add spin off the paddle~~
- ~~Ball fades back in after a miss + time goes up (30 seconds?)~~

- Rethink the punitive thing?
- Timing?

## Breakout
- **I think the answer here is repeated: Nothing would happen, there would just not be anything left to do if you reached it** ~~Game over? Could you ever win? ~~
- ~~How to handle the reset when someone misses? (See Pong above)~~
- ~~Add spin off the paddle~~
- ~~Ball fades back in after a miss + time goes up (30 seconds?)~~

- Rethink the punitive thing?
- Timing?

## Missile Command
- ~~Targeting the x is a bit off~~
- ~~Explosions aren't disappearing~~
- ~~Missiles appear inside launchers which looks stupid to my eye~~
- ~~Launcher shape? Check original game.~~
- **Better now but maybe not yet correct** What is the right speed for this thing?
- **And it's fairly beautiful** ~~Do get a line going behind the enemy missiles~~
- **Genius level: nothing happens until the timer runs down** Handling game over? 
- ~~Blue line for player misiles?~~
- **Added Space Invaders way of showing missile availability** ~~Show the missile when it's ready to launch~~
- **Each tower has 10 missiles** ~~Maximum number of missiles? I think so? - but then how to indicate? (A little row of dots below each tower showing quantity I suppose...)~~
- ~~Destroy missile stocks on tower destroyed~~
- ~~Missiles are just cooldown (no limit)~~
- ~~When both player turrets destroyed, game resets~~
- **Nah I don't think this works.** ~~Do I still believe in this? // Time added when bases/turrets destroys (30 seconds?)~~

- Work on the timing


## Space Invaders
- **Did this and then found it kind of too much so started making my own** ~~Find an open source implementation, take it, slow it down~~
- **Still need to work out cooldowns** ~~Confirm with a "real space invaders" things like cool down, whether missile hits missile, when you die, etc.~~
- **Finally did the obvious and it's quite nice.** ~~Missile cooldown for player (just try something)~~
- **I do not think so** ~~Do I still believe in this? // Add 30 seconds to time on death~~

- Work on the timing
- Ship fades back in after death (may need to destroy incoming missiles to make it not happen)
- Game resets if invaders reach player
- Game resets if player kills all invaders

## Retired for now

### Asteroids
- ~~Add a flame to the back of the player when accelerating (could tie to progress toward max velocity for visual effect? Can it be redish? If so should I have a highlight colour throughout for just one element? Ball, flame, something?)~~
- ~~Add timer~~
- ~~Player-asteroid collision~~
- ~~Improve asteroid velocity~~
- **Kind of a half-way thing... feeling slow but not so slow it's dumb** ~~Rotation in slow motion?~~
- **Created irregular polygonal asteroids and they're lovely** ~~Why do circular asteroids feel kind of dumb?~~
- ~~Player explosions that would look right in slow motion? Recompose player at death out of multiple triangles for instance? Sounds like a horrible math experience, but could be worthwhile. (Or maybe I just create a particle effect for it, a bit easier...)~~
- **Maybe it's good enough? Otherwise we're talking Matter.js** ~~Improve hit zone stuff with player-asteroid collision (looks weird)~~

- Improve asteroid breakup positioning and motion?
- Add timing limit to missiles (at least create the same spatial cap if you spam? How to signal the missile is not ready to fire? Attach it to the front of the ship all the time and fire? Something else?)