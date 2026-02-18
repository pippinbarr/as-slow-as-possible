// Original implementation from:
// https://github.com/wazooinc/phaser-meteor-swarm
// Put their license into this folder

class Asteroids extends Game {
    constructor(config) {
        super({
            key: "asteroids"
        })

        this.missileSpeed = 5 * (FAST_MODE ? 50 : 1);
        this.asteroidSpeed = 0.5 * (FAST_MODE ? 50 : 1);
        this.shipSpeed = 3 * (FAST_MODE ? 50 : 2);
        this.shipSpinSpeed = 6 * (FAST_MODE ? 50 : 5);
        this.asteroidSpinSpeed = 0.25 * (FAST_MODE ? 50 : 1);
        this.explosionVelocity = 1 * (FAST_MODE ? 50 : 1);
        this.explosionDuration = 50 * (FAST_MODE ? 50 : 500);
    }

    create() {
        super.create();

        const x = this.width / 2;
        const y = this.height / 2;

        // Create the player's rocket flame?
        this.playerFlame = this.add.triangle(x, y, 0, 0, 0, 20, -20, 10, this.highlightColour, 1);
        this.physics.add.existing(this.playerFlame)
        this.playerFlame.setOrigin(0.5, 0.5);
        this.playerFlame.setScale(0);

        // Create the player
        this.player = this.add.triangle(x, y, 0, 0, 0, 20, 20, 10, this.fgColour, 1);
        this.physics.add.existing(this.player);
        this.player.body.setDrag(0.99)
        this.player.body.setMaxVelocity(this.shipSpeed)

        // generate our asteroids
        this.asteroidGroup = this.physics.add.group()
        for (let i = 0; i < 5; i++) {
            const x = Phaser.Math.RND.between(0, this.width)
            const y = Phaser.Math.RND.between(0, this.height)
            const size = 40;

            this.addAsteroid(x, y, size);
        }

        this.missileGroup = this.physics.add.group()

        this.physics.add.overlap(this.missileGroup, this.asteroidGroup, this.missileAsteroidCollision, null, this)
        this.physics.add.overlap(this.player, this.asteroidGroup, this.playerAsteroidCollision, null, this)

        this.cursors = this.input.keyboard.createCursorKeys()
        this.inputEnabled = true;
    }

    addAsteroid(x, y, size) {
        const angle = Math.random() * 2 * Math.PI;
        const vx = Math.cos(angle) * this.asteroidSpeed * 40 / size;
        const vy = Math.sin(angle) * this.asteroidSpeed * 40 / size;

        const asteroid = this.add.graphics();
        asteroid.fillStyle(this.fgColour, 1)
        asteroid.beginPath();
        asteroid.moveTo(size + Phaser.Math.Between(-size / 8, size / 2), 0);
        let a = 0;
        const verts = 6 + Math.floor(Math.random() * 4)
        let maxD = 0;
        for (let p = 0; p < verts - 1; p++) {
            a += 2 * Math.PI / verts;
            let d = size + Phaser.Math.Between(-size / 8, size / 2);
            if (d > maxD) maxD = d;
            const x = Math.cos(a) * d;
            const y = Math.sin(a) * d;
            asteroid.lineTo(x, y);
        }
        asteroid.closePath();
        asteroid.fillPath();

        asteroid.x = x;
        asteroid.y = y;

        const physicsAsteroid = this.physics.add.existing(asteroid);
        this.asteroidGroup.add(physicsAsteroid)

        const bodySize = maxD * 0.75
        physicsAsteroid.body.setCircle(bodySize, -bodySize, -bodySize);
        physicsAsteroid.body.setVelocity(vx, vy);
        physicsAsteroid.body.setAngularVelocity(this.asteroidSpinSpeed)

        physicsAsteroid.size = size;
    }

    update(time, delta) {
        super.update(time, delta);

        this.playerFlame.body.x = this.player.body.x;
        this.playerFlame.body.y = this.player.body.y;
        this.playerFlame.body.rotation = this.player.body.rotation;


        this.handleInput();


        for (let asteroid of this.asteroidGroup.getChildren()) {
            if (asteroid.x < 0 || asteroid.x > this.width) {
                asteroid.x = this.width - asteroid.x;
            }
            if (asteroid.y < 0 || asteroid.y > this.height) {
                asteroid.y = this.height - asteroid.y;
            }
        }

        if (this.player.x < 0 || this.player.x > this.width) {
            this.player.x = this.width - this.player.x;
        }
        if (this.player.y < 0 || this.player.y > this.height) {
            this.player.y = this.height - this.player.y;
        }

        for (let missile of this.missileGroup.getChildren()) {
            if (missile.x < 0 || missile.x > this.width || missile.y < 0 || missile.y > this.height) {
                missile.destroy();
            }
        }
    }

    handleInput() {
        if (!this.inputEnabled) return;

        if (this.cursors.up.isDown) {
            this.physics.velocityFromRotation(this.player.rotation, this.shipSpeed, this.player.body.acceleration);
            this.playerFlame.setScale(1, 1);

        } else {
            this.player.body.setAcceleration(0)
            this.playerFlame.setScale(0);
        }

        if (this.cursors.left.isDown) {
            this.player.body.setAngularVelocity(-this.shipSpinSpeed)
        } else if (this.cursors.right.isDown) {
            this.player.body.setAngularVelocity(this.shipSpinSpeed)
        } else {
            this.player.body.setAngularVelocity(0)
        }

        if (Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
            const angle = this.player.rotation;
            const x = this.player.x + Math.cos(angle) * 10;
            const y = this.player.y + Math.sin(angle) * 10;
            const vx = Math.cos(angle) * this.missileSpeed;
            const vy = Math.sin(angle) * this.missileSpeed;
            const missile = this.add.rectangle(x, y, 4, 4, this.highlightColour);
            this.physics.add.existing(missile);
            this.missileGroup.add(missile);
            missile.body.setVelocity(vx, vy);
        }
    }

    missileAsteroidCollision(missile, asteroid) {
        // World's most hopeless Asteroids splitting algorithm
        if (asteroid.size === 40) {
            this.addAsteroid(asteroid.x + Phaser.Math.Between(-20, 20), asteroid.y + Phaser.Math.Between(-20, 20), 20);
            this.addAsteroid(asteroid.x + Phaser.Math.Between(-20, 20), asteroid.y + Phaser.Math.Between(-20, 20), 20);
        }
        else if (asteroid.size === 20) {
            this.addAsteroid(asteroid.x + Phaser.Math.Between(-10, 10), asteroid.y + Phaser.Math.Between(-10, 10), 10);
            this.addAsteroid(asteroid.x + Phaser.Math.Between(-10, 10), asteroid.y + Phaser.Math.Between(-10, 10), 10);
        }
        missile.destroy();
        asteroid.destroy();
    }

    playerAsteroidCollision(player, asteroid) {
        if (this.player.visible) {
            const emitter = this.add.particles(player.x, player.y, 'particle', {
                lifespan: this.explosionDuration,
                speed: { min: this.explosionVelocity, max: this.explosionVelocity * 1.2 },
                scale: { start: 4, end: 4 },
                emitting: false,
                alpha: { start: 1, end: 0.2 },
                tint: this.highlightColour
            });
            emitter.addEmitZone({
                type: 'random',
                source: this.player.geom,
            })
            emitter.explode(20)
        }


        this.player.setVisible(false);
        this.playerFlame.setVisible(false);
        this.inputEnabled = false;
    }


}