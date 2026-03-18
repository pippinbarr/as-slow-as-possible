const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const TIME_SCALE = urlParams.get('timescale') || 1;
const START_SCENE = urlParams.get('scene') || "clicktostart";
const DEBUG = urlParams.get('debug') || false;

const HEIGHT = 720 * 2;
const WIDTH = 405 * 2;
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
    ClickToStart,
    GameMenu,
    PlayersMenu,
    DifficultyMenu,

    Pong,
    Breakout,
    MissileCommand,
    // SpaceInvaders
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
  stack(
    chord("<C G Am Am7 F7 Am C G F>")
      .voicing()
      // .sound("gm_piano")
      // .add(-24)
      // .sound("sine")
      .gain(0)
      .transpose(-12)
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
      .fast(6.28)
      .room(2)
  ).play();
  document.removeEventListener("mousedown", startTheMusic);
  document.removeEventListener("touchstart", startTheMusic);
}