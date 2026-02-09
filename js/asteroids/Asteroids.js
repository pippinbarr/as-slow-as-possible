// Implementation from:
// https://github.com/wazooinc/phaser-meteor-swarm
// Has a basic license in the README

class Asteroids extends Game {
    constructor(config) {
        super({
            key: "asteroids"
        })
    }

    create() {
        super.create();

        const width = this.cameras.main.width
        const height = this.cameras.main.height

        this.score = 0

        // this.background = this.add.image(0, 0, 'starfield').setOrigin(0, 0)

        // this.player = this.physics.add.image(200, 200, 'particle').setScale(50)

        // this.player.setScale(0.5)
        // this.player.setCollideWorldBounds(true)

        const x = this.width / 2;
        const y = this.height / 2;

        this.player = this.add.triangle(x, y, 0, 0, 0, 20, 20, 10, 0x6666ff, 1);
        this.physics.add.existing(this.player);
        this.player.body.setDrag(0.99)
        this.player.body.setMaxVelocity(5)

        // generate our meteors
        this.meteorGroup = this.physics.add.group()
        this.meteorArray = []

        for (let i = 0; i < 10; i++) {
            // const meteor = new Meteor(this, 300, 300)

            const x = Phaser.Math.RND.between(0, this.width)
            const y = Phaser.Math.RND.between(0, this.height)
            const size = Phaser.Math.RND.pick([10, 20, 40]);

            const circle = this.add.circle(x, y, size, 0x6666ff, 1.0);
            this.meteorGroup.add(circle);
            circle.body.setCircle(x, y, size / 2);
        }

        this.laserGroup = this.physics.add.group({
            classType: Laser,
            maxSize: 1,
            runChildUpdate: true
        })

        this.physics.add.overlap(this.laserGroup, this.meteorGroup, this.collision, null, this)

        this.cursors = this.input.keyboard.createCursorKeys()
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

        if (this.cursors.space.isDown) {
            const shoot = this.laserGroup.get()
            if (shoot) {
                shoot.fire(this.player.x, this.player.y, this.player.rotation)
            }
        }


        for (const meteor of this.meteorArray) {
            meteor.update(time, delta)
        }

        // this.scoreText.setText('Score: ' + this.score)

    }

    collision(laser, meteor) {
        laser.destroy()
        meteor.destroy()
        // this.score += 10
        // this.sound.play('explosion')

        // if (this.meteorGroup.countActive() === 0) {
        //     this.scene.switch('game-over-scene')
        // }
    }
}