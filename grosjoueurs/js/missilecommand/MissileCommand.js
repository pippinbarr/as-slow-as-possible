class MissileCommand extends Game {
    constructor(config) {
        super({
            key: "missilecommand"
        });
    }

    create() {
        this.enemyMissileSpeed = 14 / this.timescale;
        this.playerMissileSpeed = 40 / this.timescale;
        this.enemyMissileDelay = 10000 * this.timescale;
        this.explodeDuration = 10000 * this.timescale;
        this.towerMissileCooldown = 3000 * this.timescale;
        this.restartFadeDuration = 5000 * this.timescale;


        const KEYBOARD_INSTRUCTIONS = "Use the D-Pad to move your crosshair.\nPress A to launch a missile from one of your missile batteries.";

        this.instructions = this.sys.game.device.input.touch ? TOUCH_INSTRUCTIONS : KEYBOARD_INSTRUCTIONS;

        super.create();

        this.input.setDefaultCursor('crosshair');

        this.ground = this.add.rectangle(this.width / 2, this.height * 0.95, this.width, 123 * 2, FG_COLOR)
        this.physics.add.existing(this.ground);

        this.enemyMissiles = [];
        this.pauseEnemyMissiles = false;

        this.playerMissiles = [];

        this.towers = [];
        this.towers.push(this.newTower(this.width * 0.15, this.height * 0.83));
        this.towers.push(this.newTower(this.width * 0.85, this.height * 0.83));

        this.cities = [];
        this.cities.push(this.newCity(this.width * 0.33, this.height * 0.86));
        this.cities.push(this.newCity(this.width * 0.5, this.height * 0.86));
        this.cities.push(this.newCity(this.width * 0.66, this.height * 0.86));

        this.targets = [];
        this.targets = this.targets.concat(this.towers);
        this.targets = this.targets.concat(this.cities);

        this.targetGroup = this.physics.add.group(this.targets);
        this.enemyMissileCollidableGroup = this.physics.add.group(this.targets.concat(this.ground));
        this.explosionGroup = this.physics.add.group([]);

        // this.playerMissileGroup = this.physics.add.group();
        // this.enemyMissilesGroup = this.physics.add.group();

        this.crosshair = this.add.sprite(WIDTH * 0.5, HEIGHT * 0.33, 'crosshairs');
        this.cursors.space.on("down", () => {
            if (this.inputEnabled)
                this.launchMissile(this.crosshair);
        }, this);

    }

    startPlay() {
        super.startPlay();

        this.launchEnemyMissile();
        this.time.addEvent({ delay: this.enemyMissileDelay, callback: this.launchEnemyMissile, loop: true, callbackScope: this });
    }

    update(time, delta) {
        super.update(time, delta);

        for (let m of this.enemyMissiles) {
            m.trace.line.setTo(m.trace.startX, m.trace.startY, m.x, m.y);
        }

        if (this.inputEnabled) {

            if (this.cursors.left.isDown) {
                this.crosshair.x -= 1 / this.timescale;
            }
            else if (this.cursors.right.isDown) {
                this.crosshair.x += 1 / this.timescale;
            }

            if (this.cursors.up.isDown) {
                this.crosshair.y -= 1 / this.timescale;
            }
            else if (this.cursors.down.isDown) {
                this.crosshair.y += 1 / this.timescale;
            }

            this.crosshair.x = Phaser.Math.Clamp(this.crosshair.x, 0, WIDTH);
            this.crosshair.y = Phaser.Math.Clamp(this.crosshair.y, 0, this.height * 0.75);
        }
    }

    newCity(x, y) {
        const top = this.add.arc(0, 0, 30 * 2, 180 * 2, 360 * 2, false, FG_COLOR);

        const container = this.add.container(x, y, [top]);
        container.setSize(40 * 2, 60 * 2);
        this.physics.add.existing(container);
        container.type = "city";
        return container;
    }

    newTower(x, y) {
        const city = this.add.triangle(0, 0, 0, 50 * 2, 50 * 2, 50 * 2, 25 * 2, 0, FG_COLOR);
        const tower = this.add.container(x, y, [city]);
        tower.setSize(50 * 2, 25 * 2);
        this.physics.add.existing(tower);
        tower.type = "tower";

        this.addMissileTo(tower);

        return tower;
    }

    launchMissile(pointer) {
        const tower = this.selectLaunchTower(pointer);
        if (tower === null) {
            return;
        }

        this.physics.moveToObject(tower.missile, pointer, this.playerMissileSpeed);

        // console.log("Launching " + tower.missile + " at " + pointer.x + "," + pointer.y + " at " + this.playerMissileSpeed)

        const dest_line_1 = this.add.line(0, 0, 0, 0, 0, 20 * 2, FG_COLOR);
        const dest_line_2 = this.add.line(0, 0, 0, 0, 20 * 2, 0, FG_COLOR);
        dest_line_1.setLineWidth(4);
        dest_line_2.setLineWidth(4);
        const dest = this.add.container(pointer.x, pointer.y, [dest_line_1, dest_line_2]);
        dest.setSize(2, 2);
        dest.setRotation(Math.PI / 4);
        this.physics.add.existing(dest);

        const missile = tower.missile;
        // this.playerMissileGroup.add(missile);
        this.playerMissiles.push(missile);

        const collider = this.physics.add.overlap(missile, dest, (missileOnDest) => {
            // this.playerMissileGroup.remove(missile);
            this.playerMissiles.splice(this.playerMissiles.indexOf(missile), 1);
            missileOnDest.body.stop();
            this.physics.world.removeCollider(collider);
            missile.destroy();
            dest.destroy();
            this.explode(dest.x, dest.y, 25 * 2, FG_COLOR);
        });

        tower.missile = null;

        setTimeout(() => {
            this.addMissileTo(tower);
        }, this.towerMissileCooldown)
    }

    addMissileTo(tower) {
        if (!tower.visible) {
            return;
        }
        const missile = this.add.rectangle(tower.x, tower.y - tower.displayHeight, 4 * 2, 4 * 2, HIGHLIGHT_COLOR);
        this.physics.add.existing(missile);
        tower.missile = missile;
    }

    explode(x, y, radius, color) {
        const explosion = this.add.circle(x, y, 1, color, 1);
        this.physics.add.existing(explosion);
        explosion.body.setCircle(1);
        this.explosionGroup.add(explosion);

        const tween = this.tweens.add({
            targets: explosion,
            radius: radius,
            ease: 'sine',
            duration: this.explodeDuration,
            yoyo: true,
            onUpdate: (tween, target) => {
                target.body.setCircle(target.radius);
            },
            onComplete: () => {
                this.explosionGroup.remove(explosion);
                explosion.destroy();
                tween.stop();

                if (this.targetGroup.getChildren().filter(a => a.visible).length === 0) {
                    this.pauseEnemyMissiles = true;
                    if (this.enemyMissiles.length === 0 && this.explosionGroup.getChildren().length === 0) {
                        setTimeout(() => {
                            this.restartGame();
                        }, 1000)
                    }
                }
            }
        });
    }

    restartGame() {
        for (let thing of this.targetGroup.getChildren()) {
            thing.setVisible(true);
            thing.body.setEnable(true);
            thing.setAlpha(0);
            if (thing.type === "tower") {
                this.addMissileTo(thing);
                thing.missile.setAlpha(0);
                this.tweens.add({
                    targets: thing.missile,
                    alpha: 1,
                    duration: this.restartFadeDuration
                })
            }
        }

        // for (let thing of this.playerMissilesGroup.getChildren()) {
        //     thing.trace.line.destroy();
        //     this.playerMissilesGroup.remove(thing);
        //     thing.destroy();
        // }

        for (let enemyMissile of this.enemyMissiles) {
            enemyMissile.body.stop();
            enemyMissile.trace.line.destroy();
            enemyMissile.destroy();
            this.enemyMissiles.splice(this.enemyMissiles.indexOf(enemyMissile), 1)
        }

        this.tweens.add({
            targets: this.targetGroup.getChildren(),
            alpha: 1,
            duration: this.restartFadeDuration,
            onComplete: () => {
                this.pauseEnemyMissiles = false;
            }
        })
    }

    selectLaunchTower(pointer) {
        if (pointer.y > this.height * 0.75) {
            return null;
        }

        // return the closest tower that is not destroyed yet
        const closestTower = (twrs) => {
            if (twrs.length === 0) {
                return null;
            }
            const twrCandidate = this.physics.closest(pointer, twrs);
            if (twrCandidate.visible && twrCandidate.missile !== null) {
                return twrCandidate;
            } else {
                const remainingTowers = twrs.filter((value, index, arr) => value != twrCandidate);
                return closestTower(remainingTowers);
            }
        }

        const selectedTower = closestTower(this.towers);
        return selectedTower;
    }

    getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    launchEnemyMissile() {
        if (this.pauseEnemyMissiles) return;

        const numTargetsRemaining = this.targets.filter((t) => t.visible).length;
        if (numTargetsRemaining === 0) {
            return;
        }

        //randomly target one of the cities or towers
        const target = this.targets[this.getRndInteger(0, this.targets.length)];
        //start outside the viewport
        const startY = 0;
        const startX = this.getRndInteger(0, this.width)

        const missile = this.add.circle(startX, startY, 5 * 2, HIGHLIGHT_COLOR)
        const line = this.add.line(0, 0, 0, 0, 0, 0, HIGHLIGHT_COLOR)
            .setOrigin(0, 0);
        missile.trace = {
            line: line,
            startX: startX,
            startY: startY
        };

        this.enemyMissiles.push(missile);
        this.physics.add.existing(missile);
        this.physics.moveToObject(missile, target, this.enemyMissileSpeed);

        // this.enemyMissilesGroup.add(missile);

        const collTarget = this.physics.add.overlap(missile, this.enemyMissileCollidableGroup, (msl, tgt) => {
            // this.enemyMissilesGroup.remove(missile);
            msl.body.stop();
            msl.trace.line.destroy();
            msl.destroy();
            this.enemyMissiles.splice(this.enemyMissiles.indexOf(msl), 1)
            if (tgt != this.ground) {

                if (tgt.missile) {
                    tgt.missile.destroy();
                    tgt.missile = null;
                }

                tgt.body.setEnable(false);
                tgt.setVisible(false);
            }
            this.physics.world.removeCollider(collTarget);
            this.explode(msl.x, msl.y, 80 * 2, HIGHLIGHT_COLOR);
        });

        const collExplosion = this.physics.add.overlap(missile, this.explosionGroup, (msl, exp) => {
            // this.enemyMissilesGroup.remove(missile);

            msl.body.stop();
            msl.trace.line.destroy();
            msl.destroy();
            this.enemyMissiles.splice(this.enemyMissiles.indexOf(msl), 1)
            this.physics.world.removeCollider(collExplosion);
            this.explode(msl.x, msl.y, 50 * 2, HIGHLIGHT_COLOR);
        });

    }

    // tapAt(x, y) {
    //     if (this.state != this.states.PLAY) return;

    //     this.launchMissile({ x: x, y: y });
    // }

    space() {

    }

}


