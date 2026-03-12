const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const TIME_SCALE = urlParams.get('timescale') || 1;

const DEBUG = false;
const START_SCENE = "spaceinvaders";
const HEIGHT = 720;
const WIDTH = 405;
const LANG = "en";

const FG_COLOR = 0x7777ff;
const FG_COLOR_STRING = "#7777ff";
const HIGHLIGHT_COLOR = 0xff77ff;
const HIGHLIGHT_COLOR_STRING = "#ff77ff";
const BG_COLOR = 0x0000ff;
const BG_COLOR_STRING = "#0000ff";

const FADE_TIME = 5000 * TIME_SCALE;

let config = {
  type: Phaser.AUTO,
  parent: "game",

  width: WIDTH,
  height: HEIGHT,

  backgroundColor: "#000000",
  scene: [
    Boot,
    Preloader,
    GameMenu,
    DifficultyMenu,

    Pong,
    Breakout,
    MissileCommand,
    SpaceInvaders
  ],
  render: {
    // pixelArt: true,
  },
  // pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      debug: DEBUG
    }
  },

  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    parent: "game",
    width: WIDTH,
    height: HEIGHT,
  },
};

let game = new Phaser.Game(config);


// Music music music

initStrudel({
  prebake: () => samples('github:tidalcycles/dirt-samples'),
});

document.body.addEventListener("mousedown", startTheMusic)
document.body.addEventListener("touchstart", startTheMusic)


function startTheMusic() {
  // document.body.style.backgroundColor = "#ff0000"
  // s("bd bd sd bd").play();

  // setTime(0);
  // register('oneshot', (grid, pat) => {
  //   const t = getTime();
  //   const qt = Math.ceil(t / grid) * grid;
  //   return pat.filterWhen((t) => t >= qt && t < qt + 1);
  // });

  // sound("sd").oneshot(1).play();

  // return;
  stack(
    chord("<C G Am Am7 F7 Am C G F>")
      .voicing()
      // .sound("supersaw"),
      // .add(-24)
      // .sound("sine")
      .gain(0)
      // .sometimes(x => x.gain("0.8"))
      .sometimesBy(0.6, x => x.gain("0.8"))
      // .vibrato(20)
      // .octave(-2)
      .clip(1.8)
      .slow(3.14)
      .attack(1).decay(7)
      .hpf(1000),
    stack(s("<bd ~ ~ [hh hh] ~ bd ~ bd ~ ~ ~ bd hh bd ~ ~ ~ ~ bd>")
      .gain(0)
      .sometimes(x => x.gain("0.5 0.4 0.3 0.5 0.6 1 0.4")),
      s("<~ sd ~ [~ ~] ~ ~ ~ ~ ~ sd ~ ~ ~ ~ ~ ~ sd ~ ~>")
        .gain(0)
        .sometimes(x => x.gain("0.2 0.2")),
    )
      // .bank("dr")
      // .sometimesBy(0.628, x => x.gain("1"))
      .fast(6.28)
      .room(2)
  ).play();
  document.removeEventListener("mousedown", startTheMusic);
  document.removeEventListener("touchstart", startTheMusic);
}