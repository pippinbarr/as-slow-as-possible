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
        const width = this.cameras.main.width
        const height = this.cameras.main.height

        this.score = 0

        // this.background = this.add.image(0, 0, 'starfield').setOrigin(0, 0)

        this.player = this.physics.add.image(200, 200, 'particle').setScale(50)
        this.player.setDrag(0.99)
        this.player.setMaxVelocity(5)
        // this.player.setScale(0.5)
        this.player.setCollideWorldBounds(true)

        // generate our meteors
        this.meteorGroup = this.physics.add.group()
        this.meteorArray = []

        for (let i = 0; i < 10; i++) {
            const meteor = new Meteor(this, 300, 300)

            const xPos = Phaser.Math.RND.between(0, 800)
            const yPos = Phaser.Math.RND.between(0, 600)
            meteor.setPosition(xPos, yPos)
            meteor.setActive(true)
            meteor.setVisible(true)

            this.meteorGroup.add(meteor, true)
            this.meteorArray.push(meteor)
        }

        this.laserGroup = this.physics.add.group({
            classType: Laser,
            maxSize: 1,
            runChildUpdate: true
        })

        this.physics.add.overlap(this.laserGroup, this.meteorGroup, this.collision, null, this)

        // this.scoreText = this.add
        // .bitmapText(width - 200, 20, 'arcade', 'Score: 0000', 24)
        // .setOrigin(0.5)

        this.cursors = this.input.keyboard.createCursorKeys()
    }

    update(time, delta) {

        if (this.cursors.up.isDown) {
            this.physics.velocityFromRotation(this.player.rotation, 150, this.player.body.acceleration)
        } else {
            this.player.setAcceleration(0)
        }

        if (this.cursors.left.isDown) {
            this.player.setAngularVelocity(-300)
        } else if (this.cursors.right.isDown) {
            this.player.setAngularVelocity(300)
        } else {
            this.player.setAngularVelocity(0)
        }

        if (this.cursors.space.isDown) {
            const shoot = this.laserGroup.get()
            if (shoot) {
                shoot.fire(this.player.x, this.player.y, this.player.rotation)
                // this.sound.play('shoot')
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