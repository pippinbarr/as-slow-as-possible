class SpaceInvaders extends Game {
    constructor(config) {
        super({
            key: "spaceinvaders"
        });

        this.playerSpeed = 20 * (FAST_MODE ? 50 : 1);
        this.invaderSpeed = 0.1 * (FAST_MODE ? 50 : 1);
        this.playerMissileSpeed = 20 * (FAST_MODE ? 50 : 1);
        this.invaderMissileSpeed = 20 * (FAST_MODE ? 50 : 1);
        this.playerMissileCooldown = 500 * (FAST_MODE ? 1 : 10);
        this.invaderUnit = 36;
        this.invaders = [];
    }

    create() {
        super.create();

        // Player
        const playerUnit = 42;
        const playerTriangle = this.add.triangle(0, 0, 0, playerUnit, playerUnit, playerUnit, playerUnit / 2, 0, this.fgColour);
        this.player = this.physics.add.existing(playerTriangle);
        this.player.setPosition(this.width / 2, this.height - this.player.displayHeight / 2 - 80);
        this.player.body.setCollideWorldBounds(true);

        this.addPlayerMissile();

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

        this.createInvaders();

        this.createBases();

        // Controls
        this.cursors = this.input.keyboard.createCursorKeys()
        this.inputEnabled = true;

        // Overlaps
        this.physics.add.overlap(this.invadersGroup, this.wallsGroup, this.invadersHitWall, null, this);
        this.physics.add.overlap(this.invadersGroup, this.player, this.invadersHitPlayer, null, this);

        this.physics.add.overlap(this.playerMissilesGroup, this.invadersGroup, this.missileHitInvader, null, this);
        this.physics.add.overlap(this.playerMissilesGroup, this.basesGroup, this.missileHitBase, null, this);

        this.physics.add.overlap(this.invaderMissilesGroup, this.basesGroup, this.missileHitBase, null, this);
        this.physics.add.overlap(this.invaderMissilesGroup, this.player, this.missileHitPlayer, null, this);
    }

    createInvaders() {
        // Invaders
        this.invadersGroup = this.physics.add.group();
        this.invaderMissilesGroup = this.physics.add.group();
        const offsetX = 50;
        const offsetY = 100;
        const rows = 5;
        const cols = 11;
        for (let row = 0; row < rows; row++) {
            this.invaders.push([]);
            for (let col = 0; col < cols; col++) {
                const invaderShape = this.getInvaderShape(row, this.invaderUnit);
                const invader = this.physics.add.existing(invaderShape);
                invader.setPosition(offsetX + col * this.invaderUnit, offsetY + row * this.invaderUnit);
                this.invadersGroup.add(invader);
                invader.row = row;
                invader.col = col;
                this.invaders[row][col] = invader;
            }
        }
        this.invadersGroup.dir = 1;
    }

    getInvaderShape(row, unit) {
        const mainSize = unit * 0.8;
        if (row % 3 === 0) {
            return this.add.rectangle(0, 0, mainSize, mainSize, this.fgColour);
        }
        else if ((row + 1) % 3 === 0) {
            return this.add.triangle(0, 0, 0, mainSize, mainSize, mainSize, mainSize * 0.5, 0, this.fgColour)
        }
        else if ((row + 2) % 3 == 0) {
            return this.add.circle(0, 0, mainSize * 0.5, this.fgColour);
        }
        else console.error("Whoops... no matching shape.")
    }

    createBases() {
        // Bases
        const bases = 4;
        const baseUnit = this.width / 9;
        const offsetX = baseUnit * 1.5;
        this.basesGroup = this.physics.add.group();
        for (let baseNum = 0; baseNum < bases; baseNum++) {
            const baseShape = this.add.rectangle(0, 0, baseUnit, baseUnit / 2, this.fgColour);
            const base = this.physics.add.existing(baseShape);
            base.setPosition(offsetX + baseNum * 2 * baseUnit, this.player.y - this.player.displayHeight);
            this.basesGroup.add(base);
        }
    }

    update(time, delta) {
        super.update(time, delta);

        this.invadersMovementHandled = false;

        this.handleInput();

        this.invadersGroup.incX(this.invaderSpeed * this.invadersGroup.dir);

        if (Math.random() < 0.05) {
            const invader = Phaser.Math.RND.pick(this.invadersGroup.getChildren());

            let canFire = true;
            for (let row = invader.row + 1; row < this.invaders.length; row++) {
                if (this.invaders[row][invader.col] !== null) {
                    canFire = false;
                    break;
                }
            }
            if (canFire) {
                this.fireMissile(invader);
            }
        }
    }

    fireMissile(invader) {
        const missile = this.add.rectangle(invader.x, invader.y + invader.displayHeight / 2, 4, 4, this.highlightColour);
        this.physics.add.existing(missile);
        this.invaderMissilesGroup.add(missile);
        missile.body.setVelocity(0, this.invaderMissileSpeed);
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

        if (this.player.missile) {
            this.player.missile.x = this.player.body.x + this.player.body.width / 2;
        }

        if (Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
            if (this.player.missile !== null) {
                this.playerMissilesGroup.add(this.player.missile);
                this.player.missile.body.setVelocity(0, -this.playerMissileSpeed);
                this.player.missile = null;
                setTimeout(() => {
                    this.addPlayerMissile();
                }, this.playerMissileCooldown)
            }

        }
    }

    addPlayerMissile() {
        const missile = this.add.rectangle(this.player.x, this.player.y - this.player.displayHeight / 2, 4, 4, this.highlightColour);
        this.physics.add.existing(missile);
        this.player.missile = missile;
    }

    invadersHitWall(invader, wall) {
        if (!this.invadersMovementHandled) {
            this.invadersGroup.dir *= -1;
            this.invadersGroup.incY(this.invaderUnit * 0.8);
            this.invadersMovementHandled = true;
        }
    }

    invadersHitPlayer(invader, player) {
        this.player.setActive(false);
        this.player.setVisible(false);
        this.inputEnabled = false;

    }

    missileHitInvader(missile, invader) {
        this.invaders[invader.row][invader.col] = null;
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