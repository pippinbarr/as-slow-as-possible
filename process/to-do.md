# To-dos

## Overall

- **It's at least 16:9 now for better or worse... let's see how it holds up** ~~Maybe more of a screen size agnostic approach? Or at least aim to fill the window a bit better on mobile? What did I use for the phone game? 16:9, so that would be more like 480x720 at least.~~
- ~~Fix everything that got broken by the dimensions (layouts mostly, but does breakout columns etc. work?)~~
- ~~Figure out input (mobile especially) -- is it that a hold-press on left or right side moves paddle/ship and a tap in the centre "fires" (or tap in specific location for MC)? Relatively simple at least. Make it the same for desktop or do that with keyboard?~~
- ~~Resurrect cursor input for desktop~~
- ~~Instructions for input? (Where? When? Always?)~~
- ~~z-index of instructions~~

- Leaving a game back to the menu / game over stuff / no escape though right?

## Difficulty levels

- **I think it's better and less complex to leave it as duration** ~~That rather lovely idea of difficulty being reflected in either how long you play or how slow it is or both...~~
- ~~Implement Nightmare's count up (based on duration of -1)~~
- ~~Implement Nightmare unlock when you win on Hard~~

- Make it *slower* as well in difficulty levels, or don't want to suggest slowness is a nightmare?

## Sound/music

- **Well there's something now** ~~Right?~~

- Work on the music

## Menu

- **Basic menu up and running without too much agony** ~~We need a menu system for choosing the game~~
- **Looks awesome too** ~~Some kind of crossfade or other fade to make it slow to go between menu and next thing etc. Probably yes.~~
- ~~and the difficulty~~
- ~~add red underline to title?~~
- ~~Indicate under Nightmare that it can be unlocked (remove text when it's unlocked)~~
- **Nah let's not overthink it** ~~Fancy UX to indicate when Nightmare unlocked but they haven't tried?~~

## Pong

- ~~How to handle the reset when someone misses? One weird option is simply not to (per Missile Command? Seems really weird but also refocuses what the game means?)~~
- ~~Add spin off the paddle~~
- ~~Ball fades back in after a miss + time goes up (30 seconds?)~~

## Breakout
- **I think the answer here is repeated: Nothing would happen, there would just not be anything left to do if you reached it** ~~Game over? Could you ever win? ~~
- ~~How to handle the reset when someone misses? (See Pong above)~~
- ~~Add spin off the paddle~~
- ~~Ball fades back in after a miss + time goes up (30 seconds?)~~

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

- Work on the timing
- Missiles are just cooldown (no limit)
- Time added when bases/turrets destroys (30 seconds?)
- When both player turrets destroyed, game resets


## Space Invaders
- **Did this and then found it kind of too much so started making my own** ~~Find an open source implementation, take it, slow it down~~
- **Still need to work out cooldowns** ~~Confirm with a "real space invaders" things like cool down, whether missile hits missile, when you die, etc.~~
- **Finally did the obvious and it's quite nice.** ~~Missile cooldown for player (just try something)~~

- Work on the timing
- Ship fades back in after death (may need to destroy incoming missiles to make it not happen) + add 30 seconds to time
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