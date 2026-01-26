class Preloader extends Phaser.Scene {

  constructor(config) {
    super({
      key: `preloader`
    });
  }

  preload() {

  }

  create() {
    setTimeout(() => {
      this.scene.start(START_SCENE);
    }, 1000);
  }
}
