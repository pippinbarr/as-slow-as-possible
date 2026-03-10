const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const TIME_SCALE = urlParams.get('timescale') || 1;

const DEBUG = false;
const START_SCENE = "gamemenu";
const WIDTH = 480;
const HEIGHT = 850;
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
    autoCenter: Phaser.Scale.BOTH,
    width: WIDTH,
    height: HEIGHT,
  },
};

initStrudel({
  prebake: () => samples('github:tidalcycles/dirt-samples'),
});
// document.addEventListener('click', () => s('bd sd').play());

document.addEventListener("mousedown", startTheMusic)
document.addEventListener("touchstart", startTheMusic)

let game = new Phaser.Game(config);

function startTheMusic() {
  stack(
    chord("<C G Am Am7 F7 Am C G F>")
      .voicing()
      // .sound("supersaw"),
      // .add(-24)
      .sound("sine")
      .gain(0)
      .sometimes(x => x.gain("0.8"))
      // .sometimesBy(0.7, x => x.gain("0.8"))
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
  document.removeEventListener("click", startTheMusic);
}