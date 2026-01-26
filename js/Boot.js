class Boot extends Phaser.Scene {

  constructor(config) {
    super({
      key: 'boot'
    });
  }

  preload() {

  }

  create() {
    this.game.scene.start(`preloader`);
  }
}