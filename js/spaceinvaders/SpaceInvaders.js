class SpaceInvaders extends Game {
    constructor(config) {
        super({
            key: "spaceinvaders"
        });

        this.playerSpeed = 20 / TIME_SCALE;
        this.invaderSpeed = 0.1 / TIME_SCALE;

        this.playerMissileSpeed = 20 / TIME_SCALE;
        this.invaderMissileSpeed = 20 / TIME_SCALE;

        this.playerMissileCooldown = 5000 * TIME_SCALE;

        this.invaders = [];
    }

    create() {
        const TOUCH_INSTRUCTIONS = "Touch the sides of the screen to move your laser cannon left and right. Tap in the center of the screen to fire.\n\nTap here to begin.";
        const KEYBOARD_INSTRUCTIONS = "Use the arrow keys to move your laser cannon left and right. Press space to fire. \n\nPress space to begin.";

        this.instructions = this.sys.game.device.input.touch ? TOUCH_INSTRUCTIONS : KEYBOARD_INSTRUCTIONS;

        super.create();

        this.invaderUnit = this.width / 16;

        // Player
        const playerUnit = this.width / 16;
        const playerTriangle = this.add.triangle(0, 0, 0, playerUnit, playerUnit, playerUnit, playerUnit / 2, 0, FG_COLOR);
        this.player = this.physics.add.existing(playerTriangle);
        this.player.setPosition(this.width / 2, this.height - this.player.displayHeight * 2);
        this.player.body.setCollideWorldBounds(true);
        this.player.lives = 3;

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

        this.invadersGroup = this.physics.add.group();
        this.invaderMissilesGroup = this.physics.add.group();
        this.createInvaders();

        this.basesGroup = this.physics.add.group();
        this.createBases();

        // Controls
        // this.cursors = this.input.keyboard.createCursorKeys()
        this.inputEnabled = true;

        // Overlaps
        this.physics.add.overlap(this.invadersGroup, this.wallsGroup, this.invadersHitWall, null, this);
        this.physics.add.overlap(this.invadersGroup, this.player, this.invadersHitPlayer, null, this);

        this.physics.add.overlap(this.playerMissilesGroup, this.invadersGroup, this.missileHitInvader, null, this);
        this.physics.add.overlap(this.playerMissilesGroup, this.basesGroup, this.missileHitBase, null, this);

        this.physics.add.overlap(this.invaderMissilesGroup, this.basesGroup, this.missileHitBase, null, this);
        this.physics.add.overlap(this.invaderMissilesGroup, this.player, this.missileHitPlayer, null, this);

        this.invadersPaused = true;
    }

    createInvaders() {
        // Invaders
        const offsetX = this.width * 0.1;
        const offsetY = this.width * 0.3;
        const rows = 5;
        const cols = 11;
        for (let row = 0; row < rows; row++) {
            this.invaders.push([]);
            for (let col = 0; col < cols; col++) {
                const invaderShape = this.getInvaderShape(row, this.invaderUnit);
                const invader = this.physics.add.existing(invaderShape);
                invader.setPosition(offsetX + col * this.invaderUnit, offsetY + 1.5 * row * this.invaderUnit);
                this.invadersGroup.add(invader);
                invader.row = row;
                invader.col = col;
                this.invaders[row][col] = invader;
            }
        }
        this.invadersGroup.dir = 0;
    }

    getInvaderShape(row, unit) {
        const mainSize = unit * 0.8;
        if (row % 3 === 0) {
            return this.add.rectangle(0, 0, mainSize, mainSize, FG_COLOR);
        }
        else if ((row + 1) % 3 === 0) {
            return this.add.triangle(0, 0, 0, mainSize, mainSize, mainSize, mainSize * 0.5, 0, FG_COLOR)
        }
        else if ((row + 2) % 3 == 0) {
            return this.add.circle(0, 0, mainSize * 0.5, FG_COLOR);
        }
        else console.error("Whoops... no matching shape.")
    }

    createBases() {
        // Bases
        const bases = 0//4;
        const baseUnit = this.width / 9;
        const offsetX = baseUnit * 1.5;
        for (let baseNum = 0; baseNum < bases; baseNum++) {
            const baseShape = this.add.rectangle(0, 0, baseUnit, baseUnit / 2, FG_COLOR);
            const base = this.physics.add.existing(baseShape);
            base.setPosition(offsetX + baseNum * 2 * baseUnit, this.player.y - this.player.displayHeight * 1.5);
            this.basesGroup.add(base);
        }
    }

    startPlay() {
        super.startPlay();
        this.invadersGroup.dir = 1;
        this.invadersPaused = false;
    }

    update(time, delta) {
        super.update(time, delta);

        this.invadersMovementHandled = false;

        // this.handleInput();

        if (this.player.missile) {
            this.player.missile.x = this.player.body.x + this.player.body.width / 2;
        }

        if (!this.invadersPaused) {
            this.invadersGroup.incX(this.invaderSpeed * this.invadersGroup.dir);

            if (Math.random() < 0.04) {
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
    }

    fireMissile(invader) {
        const missile = this.add.rectangle(invader.x, invader.y + invader.displayHeight / 2, 4, 4, HIGHLIGHT_COLOR);
        this.physics.add.existing(missile);
        this.invaderMissilesGroup.add(missile);
        missile.body.setVelocity(0, this.invaderMissileSpeed);
    }

    addPlayerMissile() {
        const missile = this.add.rectangle(this.player.body.x, this.player.body.y, 4, 4, HIGHLIGHT_COLOR);
        this.physics.add.existing(missile);
        this.player.missile = missile;
    }

    invadersHitWall(invader, wall) {
        if (!this.invadersMovementHandled) {
            this.invadersMovementHandled = true;
            this.invadersGroup.incX(-this.invadersGroup.dir * this.invaderSpeed);
            this.invadersGroup.nextDir = -this.invadersGroup.dir;
            this.invadersGroup.dir = 0;

            const fps = this.game.loop.actualFps;
            const downDistance = this.invaderUnit / 2;
            const duration = (downDistance / this.invaderSpeed) * fps * 0.5;

            this.tweens.add({
                targets: [...this.invadersGroup.getChildren()],
                y: `+=${downDistance}`,
                duration: duration,
                onComplete: () => {
                    this.invadersGroup.dir = this.invadersGroup.nextDir;
                }
            })
        }
    }

    invadersHitPlayer(invader, player) {
        this.killPlayer();
        // But we also then need to reset the game (as if 0 lives I guess)
    }

    invadersReachedBottom() {
        // Can this happen without the player being there? Yes, if there are very
        // few invaders? Or should they just not go down at the end and eventually sweep
        // over the player, killing them
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

    missileHitPlayer(player, missile) {
        // player.setActive(false);
        this.killPlayer(player, missile);
        missile.destroy();

        // this.time.addEvent({
        //     delay: 2000,
        //     callback: this.newPlayer,
        //     callbackScope: this
        // });
    }

    killPlayer() {
        this.player.lives--;

        this.player.setVisible(false);
        this.player.body.enable = false;

        this.player.body.setVelocity(0, 0);
        this.invaderMissilesGroup.clear(true, true);

        if (this.player.missile) this.player.missile.destroy();
        this.player.missile = null;

        this.inputEnabled = false;
        this.invadersPaused = true;

        const lifespan = 1000;
        const particles = this.add.particles(0, 0, 'particle', {
            speed: { min: -100, max: 100 },
            lifespan: lifespan,
            scale: 4,
            tint: FG_COLOR,
            gravityY: 0,
            alpha: { start: 1, end: 0 },
            emitting: false // Do not start automatically
        });

        this.time.addEvent({
            delay: lifespan,
            callback: this.resurrectPlayer,
            callbackScope: this
        });

        // Trigger the explosion at coordinates (x, y)
        particles.explode(20, this.player.x, this.player.y);
    }

    resurrectPlayer() {
        console.log(this.player.lives);

        if (this.player.lives > 0) {
            this.newPlayer();
        }
        else {
            this.resetGame();
        }
    }

    newPlayer() {
        this.player.body.enable = true;
        this.player.setVisible(true);
        this.inputEnabled = true;
        this.addPlayerMissile();
        this.invadersPaused = false;
        this.invadersGroup.dir = 1;
    }

    resetGame() {
        console.log("Resetting...")
        this.invadersGroup.clear(true, true);
        this.invaders = [];
        this.createInvaders();
        this.basesGroup.clear(true, true);
        this.createBases();

        if (this.player.missile) this.player.missile.destroy();
        this.player.x = this.width / 2;
        this.player.lives = 3;
        this.resurrectPlayer();

        this.invadersPaused = false;
    }

    left() {
        this.player.body.setVelocity(-this.playerSpeed, 0);
    }

    right() {
        this.player.body.setVelocity(this.playerSpeed, 0);
    }

    tapAt(x, y) {
        if (x < this.width * 0.33 || x > this.width * 0.66) return;

        this.fire();
    }

    space() {
        this.fire();
    }

    fire() {
        if (!this.invadersPaused && this.player.missile !== null) {
            this.playerMissilesGroup.add(this.player.missile);
            this.player.missile.body.setVelocity(0, -this.playerMissileSpeed);
            this.player.missile = null;
            setTimeout(() => {
                this.addPlayerMissile();
            }, this.playerMissileCooldown)
        }
    }

    noInput() {
        this.player.body.setVelocity(0, 0);
    }

}