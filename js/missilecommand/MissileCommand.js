class MissileCommand extends Game {
    constructor(config) {
        super({
            key: "missilecommand"
        });

        this.enemyMissileSpeed = 14 / TIME_SCALE;
        this.playerMissileSpeed = 40 / TIME_SCALE;
        this.enemyMissileDelay = 10000 * TIME_SCALE;
        this.explodeDuration = 10000 * TIME_SCALE;
        this.towerMissileCooldown = 250 * TIME_SCALE;
    }

    create() {
        super.create();

        this.input.setDefaultCursor('crosshair');
        this.input.on('pointerdown', () => {
            this.launchMissile(this.input.activePointer);
        });

        this.ground = this.add.rectangle(this.width / 2, this.height * 0.9, this.width, 60, FG_COLOR);
        this.physics.add.existing(this.ground);
        // this.ground.setStrokeStyle(2, 0x111111);

        this.enemyMissiles = [];

        this.towers = [];
        this.towers.push(this.newTower(this.width * 0.15, this.height * 0.82));
        this.towers.push(this.newTower(this.width * 0.85, this.height * 0.82));

        this.cities = [];
        this.cities.push(this.newCity(this.width * 0.33, this.height * 0.85));
        this.cities.push(this.newCity(this.width * 0.5, this.height * 0.85));
        this.cities.push(this.newCity(this.width * 0.66, this.height * 0.85));

        this.targets = [];
        this.targets = this.targets.concat(this.towers);
        this.targets = this.targets.concat(this.cities);

        this.targetGroup = this.physics.add.group(this.targets.concat(this.ground));
        this.explosionGroup = this.physics.add.group([]);

        this.launchEnemyMissile();
        this.time.addEvent({ delay: this.enemyMissileDelay, callback: this.launchEnemyMissile, loop: true, callbackScope: this });
    }

    update(time, delta) {
        super.update(time, delta);

        for (let m of this.enemyMissiles) {
            m.trace.line.setTo(m.trace.startX, m.trace.startY, m.x, m.y);
        }
    }

    newCity(x, y) {
        const top = this.add.arc(0, 0, 30, 180, 360, false, FG_COLOR);
        // top.setStrokeStyle(2, 0x11111100);
        // const bottom = this.add.rectangle(0, 20, 40, 40, FG_COLOR)
        // bottom.setStrokeStyle(2, 0x11111100);

        const container = this.add.container(x, y, [top]);
        container.setSize(40, 60);
        this.physics.add.existing(container);
        return container;
    }

    newTower(x, y) {
        const city = this.add.triangle(0, 0, 0, 50, 50, 50, 25, 0, FG_COLOR);
        // city.setStrokeStyle(2, 0x111111);
        const tower = this.add.container(x, y, [city]);
        tower.setSize(50, 25);
        this.physics.add.existing(tower);

        tower.missilesRemaining = 10;
        tower.missiles = [];
        for (let m = 0; m < tower.missilesRemaining; m++) {
            const missile = this.add.rectangle(tower.x - tower.width * 0.4 + (m * 5), tower.y + tower.displayHeight * 1.25, 4, 4, HIGHLIGHT_COLOR);
            tower.missiles.push(missile);
        }

        this.addMissileTo(tower);

        return tower;
    }

    launchMissile(pointer) {
        const tower = this.selectLaunchTower(pointer);
        if (tower === null) {
            return;
        }

        this.physics.moveToObject(tower.missile, pointer, this.playerMissileSpeed);

        const dest_line_1 = this.add.line(0, 0, 0, 0, 0, 20, FG_COLOR);
        const dest_line_2 = this.add.line(0, 0, 0, 0, 20, 0, FG_COLOR);
        const dest = this.add.container(pointer.x, pointer.y, [dest_line_1, dest_line_2]);
        dest.setSize(2, 2);
        dest.setRotation(Math.PI / 4);
        this.physics.add.existing(dest);
        const missile = tower.missile;

        const collider = this.physics.add.overlap(missile, dest, (missileOnDest) => {
            missileOnDest.body.stop();
            this.physics.world.removeCollider(collider);
            missile.destroy();
            dest.destroy();
            this.explode(dest.x, dest.y, 25, FG_COLOR);
        });

        tower.missile = null;
        setTimeout(() => {
            this.addMissileTo(tower);
        }, this.towerMissileCooldown)
    }

    addMissileTo(tower) {
        if (tower.missiles.length > 0) {
            const missile = this.add.rectangle(tower.x, tower.y - tower.displayHeight, 4, 4, HIGHLIGHT_COLOR);
            this.physics.add.existing(missile);
            tower.missile = missile;

            const missileIcon = tower.missiles.pop();
            missileIcon.destroy();
        }
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
            }
        });
    }

    selectLaunchTower(pointer) {
        if (pointer.y > 500) {
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
        //randomly target one of the cities or towers
        const target = this.targets[this.getRndInteger(0, this.targets.length)];
        //start outside the viewport
        const startY = 0;
        const startX = this.getRndInteger(0, this.width)

        const missile = this.add.circle(startX, startY, 5, HIGHLIGHT_COLOR)
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

        const collTarget = this.physics.add.overlap(missile, this.targetGroup, (msl, tgt) => {
            msl.body.stop();
            msl.trace.line.destroy();
            msl.destroy();
            this.enemyMissiles.splice(this.enemyMissiles.indexOf(msl), 1)
            if (tgt != this.ground) {

                if (tgt.missile) {
                    tgt.missile.destroy();
                    tgt.missile = null;
                }
                if (tgt.missiles) {
                    for (let m of tgt.missiles) {
                        m.destroy();
                    }
                }

                tgt.body.setEnable(false);
                tgt.setVisible(false);
            }
            this.physics.world.removeCollider(collTarget);
            this.explode(msl.x, msl.y, 80, HIGHLIGHT_COLOR);
        });

        const collExplosion = this.physics.add.overlap(missile, this.explosionGroup, (msl, exp) => {
            msl.body.stop();
            msl.trace.line.destroy();
            msl.destroy();
            this.enemyMissiles.splice(this.enemyMissiles.indexOf(msl), 1)
            this.physics.world.removeCollider(collExplosion);
            this.explode(msl.x, msl.y, 50, HIGHLIGHT_COLOR);
        });

    }

}


