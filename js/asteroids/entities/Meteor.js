class Meteor extends Phaser.GameObjects.Graphics {

  constructor(scene, x, y) {
    super(scene, {
      x: x,
      y: y
    });

    this.meteorType = Phaser.Math.RND.between(0, 2)

    switch (this.meteorType) {
      case 0:
        // this.setScale(50);
        break;
      case 1:
        // this.setScale(25);
        break;
      case 2:
        // this.setScale(10);
        break;
    }

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.speed = 0.001;
    this.direction = Phaser.Math.RND.angle()
    this.angleRotation = 0.1;
    this.active = false
    this.visible = false
    this.factor = 1
  }

  update(time, delta) {
    if (this.active) {
      this.x += this.factor * Math.cos(this.direction) * this.speed * delta
      this.y += Math.cos(this.direction) * this.speed * delta
      this.angle += this.angleRotation

      if (this.x < 0) {
        this.x = 800
      } else if (this.x > 800) {
        this.x = 0
      }

      if (this.y < 0) {
        this.y = 600
      } else if (this.y > 600) {
        this.y = 0
      }
    }
  }
}