
const PLAYER_SPEED = 120;
const PLAYER_BULLET_SPEED = 250;

class Player extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, "atlas", "Player-0");

        this.isAlive = true;

        // Texture animation
        this.play("player_idle");

        // Physics
        this.scene.physics.add.existing(this);
        this.enableBody();
        this.setCollideWorldBounds(true);

        // Bullet
        this.bullet = scene.add.existing(new Bullet("Bullet-0", -PLAYER_BULLET_SPEED, scene));

        // Controls
        this.controls = new Controls(scene);

    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        if (!this.isAlive) return;

        this.controls.update();

        if (this.controls.fire && !this.bullet.active) {
            // this.chain(["player_shoot", "player_idle"]);
            // this.stop();
            // this.scene.sound.play("player_shoot", { volume: SOUND_LEVELS.shoot, pan: getPan(this.x, this.scene.scale.width) });
            this.bullet.shoot(this.x, this.y);
            this.scene.events.emit("player-shoot");
        }
        if (this.controls.left) {
            this.setVelocityX(-PLAYER_SPEED);
            return;
        }

        if (this.controls.right) {
            this.setVelocityX(PLAYER_SPEED);
            return;
        }


        this.setVelocityX(0);
    }

    explode() {
        this.setDirectControl(false);
        this.body.setGravityY(100);
        this.body.setAngularVelocity(Phaser.Math.Between(-30, 30));
        this.setCollideWorldBounds(true, 0, 0, true);
        this.play("player_hit");
        this.isAlive = false;
    }

} // End class Player