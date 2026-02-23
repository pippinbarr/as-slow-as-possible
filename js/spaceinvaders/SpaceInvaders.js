class SpaceInvaders extends Game {
    constructor(config) {
        super({
            key: "spaceinvaders"
        });

        this.playerSpeed = 20 * (FAST_MODE ? 50 : 1);
        this.invaderSpeed = 0.2 * (FAST_MODE ? 50 : 1);
        this.playerMissileSpeed = 20 * (FAST_MODE ? 50 : 1);
        this.invaderMissileSpeed = 20 * (FAST_MODE ? 50 : 1);
    }

    create() {
        super.create();

        // Player
        const playerTriangle = this.add.triangle(0, 0, 0, 50, 50, 50, 25, 0, this.fgColour);
        this.player = this.physics.add.existing(playerTriangle);
        this.player.setPosition(this.width / 2, this.height - this.player.displayHeight / 2 - 80);
        this.player.body.setCollideWorldBounds(true);

        // Player missiles
        this.playerMissilesGroup = this.physics.add.group();

        // Walls (for Invader direction change)
        const leftWall = this.add.rectangle(-5, this.height / 2, 10, this.height, 0xff0000);
        this.leftWall = this.physics.add.existing(leftWall);

        const rightWall = this.add.rectangle(this.width + 5, this.height / 2, 10, this.height, 0xff0000);
        this.rightWall = this.physics.add.existing(rightWall);

        this.wallsGroup = this.physics.add.group();
        this.wallsGroup.add(this.leftWall);
        this.wallsGroup.add(this.rightWall);

        // Invaders
        this.invadersGroup = this.physics.add.group();
        this.invaderMissilesGroup = this.physics.add.group();
        const offsetX = 100;
        const offsetY = 100;
        const rows = 4;
        const cols = 5;
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                // const invaderShape = this.add.triangle(0, 0, 0, 30, 30, 30, 15, 0, this.fgColour);
                // const invaderShape = this.add.circle(0, 0, 15, this.fgColour);
                const invaderShape = this.add.rectangle(0, 0, 30, 30, this.fgColour);
                const invader = this.physics.add.existing(invaderShape);
                invader.setPosition(offsetX + col * 40, offsetY + row * 40);
                this.invadersGroup.add(invader);
            }
        }
        this.invadersGroup.dir = 1;

        // Bases
        this.basesGroup = this.physics.add.group();
        for (let col = 0; col < cols; col++) {
            const baseShape = this.add.rectangle(0, 0, 30, 10, this.fgColour);
            const base = this.physics.add.existing(baseShape);
            base.setPosition(offsetX + col * 40, this.player.y - this.player.displayHeight);
            this.basesGroup.add(base);
        }

        // Controls
        this.cursors = this.input.keyboard.createCursorKeys()
        this.inputEnabled = true;

        // Overlaps
        this.physics.add.overlap(this.invadersGroup, this.wallsGroup, this.invadersHitWall, null, this);
        this.physics.add.overlap(this.playerMissilesGroup, this.invadersGroup, this.missileHitInvader, null, this);
        this.physics.add.overlap(this.playerMissilesGroup, this.basesGroup, this.missileHitBase, null, this);
        this.physics.add.overlap(this.invaderMissilesGroup, this.basesGroup, this.missileHitBase, null, this);
        this.physics.add.overlap(this.invaderMissilesGroup, this.player, this.missileHitPlayer, null, this);
    }

    update(time, delta) {
        super.update(time, delta);

        this.invadersMovementHandled = false;

        this.handleInput();

        this.invadersGroup.incX(this.invaderSpeed * this.invadersGroup.dir);

        if (Math.random() < 0.01) {
            const invader = Phaser.Math.RND.pick(this.invadersGroup.getChildren());
            const missile = this.add.rectangle(invader.x, invader.y + invader.displayHeight / 2, 4, 4, this.highlightColour);
            this.physics.add.existing(missile);
            this.invaderMissilesGroup.add(missile);
            missile.body.setVelocity(0, this.invaderMissileSpeed);
        }
    }

    handleInput() {
        if (!this.inputEnabled) return;

        if (this.cursors.left.isDown) {
            this.player.body.setVelocity(-this.playerSpeed, 0)
        } else if (this.cursors.right.isDown) {
            this.player.body.setVelocity(this.playerSpeed, 0)
        } else {
            this.player.body.setVelocity(0, 0)
        }

        if (Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
            const missile = this.add.rectangle(this.player.x, this.player.y - this.player.displayHeight / 2, 4, 4, this.highlightColour);
            this.physics.add.existing(missile);
            this.playerMissilesGroup.add(missile);
            missile.body.setVelocity(0, -this.playerMissileSpeed);
        }
    }

    invadersHitWall(invader, wall) {
        if (!this.invadersMovementHandled) {
            this.invadersGroup.dir *= -1;
            this.invadersGroup.incY(40);
            this.invadersMovementHandled = true;
        }
    }

    missileHitInvader(missile, invader) {
        invader.destroy();
        missile.destroy();
    }

    missileHitBase(missile, base) {
        base.displayHeight -= 5;
        if (base.displayHeight <= 0) {
            base.destroy();
        }
        missile.destroy();
    }

    missileHitPlayer(missile, player) {
        player.setActive(false);
        player.setVisible(false);
        this.inputEnabled = false;
        missile.destroy();
    }
}