class Preloader extends Phaser.Scene {

  constructor(config) {
    super({
      key: `preloader`
    });
  }

  preload() {
    this.load.image(`particle`, `assets/images/particle.png`);
  }

  create() {
    setTimeout(() => {
      this.scene.start(START_SCENE);
    }, 1000);
  }
}
