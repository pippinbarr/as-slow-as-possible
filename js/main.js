const DEBUG = true;
const FAST_MODE = true;
const START_SCENE = "asteroids";
const WIDTH = 480;
const HEIGHT = 640;
const LANG = "en";

let config = {
  type: Phaser.AUTO,
  width: WIDTH,
  height: HEIGHT,
  backgroundColor: "#000000",
  scene: [
    Boot,
    Preloader,
    Menu,

    Pong,
    Breakout,
    Tetris,
    Asteroids,
    MissileCommand,
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