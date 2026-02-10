// Implementation from:
// https://github.com/wazooinc/phaser-meteor-swarm
// Has a basic license in the README

class Asteroids extends Game {
    constructor(config) {
        super({
            key: "asteroids"
        })

        this.missileSpeed = 5 * (FAST_MODE ? 50 : 1);
        this.asteroidSpeed = 1 * (FAST_MODE ? 50 : 1);
    }

    create() {
        super.create();

        const x = this.width / 2;
        const y = this.height / 2;

        this.player = this.add.triangle(x, y, 0, 0, 0, 20, 20, 10, 0x6666ff, 1);
        this.physics.add.existing(this.player);
        this.player.body.setDrag(0.99)
        this.player.body.setMaxVelocity(5)

        // generate our meteors
        this.meteorGroup = this.physics.add.group()
        for (let i = 0; i < 10; i++) {
            const x = Phaser.Math.RND.between(0, this.width)
            const y = Phaser.Math.RND.between(0, this.height)
            const size = Phaser.Math.RND.pick([10, 20, 40]);

            this.addAsteroid(x, y, size);
        }

        this.missileGroup = this.physics.add.group()

        this.physics.add.overlap(this.missileGroup, this.meteorGroup, this.collision, null, this)

        this.cursors = this.input.keyboard.createCursorKeys()
    }

    addAsteroid(x, y, size) {
        const angle = Math.random() * Math.PI;
        const vx = Math.cos(angle) * this.missileSpeed;
        const vy = Math.sin(angle) * this.missileSpeed;

        const circle = this.add.circle(x, y, size, 0x6666ff, 1.0);

        this.meteorGroup.add(circle);
        circle.body.setCircle(size);
        circle.size = size;
        circle.body.setVelocity(vx, vy);
    }

    update(time, delta) {

        if (this.cursors.up.isDown) {
            this.physics.velocityFromRotation(this.player.rotation, 150, this.player.body.acceleration)
        } else {
            this.player.body.setAcceleration(0)
        }

        if (this.cursors.left.isDown) {
            this.player.body.setAngularVelocity(-300)
        } else if (this.cursors.right.isDown) {
            this.player.body.setAngularVelocity(300)
        } else {
            this.player.body.setAngularVelocity(0)
        }

        if (Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
            const angle = this.player.rotation;
            const x = this.player.x + Math.cos(angle) * 10;
            const y = this.player.y + Math.sin(angle) * 10;
            const vx = Math.cos(angle) * this.missileSpeed;
            const vy = Math.sin(angle) * this.missileSpeed;
            const missile = this.add.rectangle(x, y, 4, 4, 0x6666ff);
            this.physics.add.existing(missile);
            this.missileGroup.add(missile);
            missile.body.setVelocity(vx, vy);
        }

        for (let asteroid of this.meteorGroup.getChildren()) {
            if (asteroid.x < 0 || asteroid.x > this.width) {
                asteroid.x = this.width - asteroid.x;
            }
            if (asteroid.y < 0 || asteroid.y > this.height) {
                asteroid.y = this.height - asteroid.y;
            }
        }
    }

    collision(missile, asteroid) {
        // World's most hopeless Asteroids splitting algorithm
        if (asteroid.size === 40) {
            this.addAsteroid(asteroid.x + 50, asteroid.y, 20);
            this.addAsteroid(asteroid.x - 50, asteroid.y, 20);
        }
        else if (asteroid.size === 20) {
            this.addAsteroid(asteroid.x + 50, asteroid.y, 10);
            this.addAsteroid(asteroid.x - 50, asteroid.y, 10);

        }
        missile.destroy();
        asteroid.destroy();
    }
}