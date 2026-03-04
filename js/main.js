const DEBUG = false;
const FAST_MODE = false;
const START_SCENE = "gamemenu";
const WIDTH = 480;
const HEIGHT = 640;
const LANG = "en";

const FG_COLOR = 0x7777ff;
const TEXT_COLOR = "#7777ff";
const HIGHLIGHT_COLOR = 0xff77ff;
const BG_COLOR = 0x0000ff;

const FADE_TIME = FAST_MODE ? 1000 : 5000;

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
    Tetris,
    Asteroids,
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

// initStrudel();

let game = new Phaser.Game(config);