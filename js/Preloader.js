class Preloader extends Phaser.Scene {

  constructor(config) {
    super({
      key: `preloader`
    });
  }

  preload() {
    this.load.image(`particle`, `assets/images/particle.png`);
    this.load.image(`clown`, `assets/images/clown.png`);
  }

  create() {
    const clown = this.add.image(this.game.canvas.width / 2, this.game.canvas.height / 2, "clown");
    clown.setRotation(Math.PI);
    this.add.tween({
      targets: clown,
      rotation: 0,
      duration: 3000,
      // loop: true
    })
    setTimeout(() => {
      this.scene.start(START_SCENE);
    }, PRELOADER_DELAY);
  }
}
