class MissileCommand extends Game {
    constructor(config) {
        super({
            key: "missilecommand"
        });

        this.enemyMissileSpeed = 7 * (FAST_MODE ? 10 : 1);
        this.playerMissileSpeed = 10 * (FAST_MODE ? 10 : 1);
        this.enemyMissileDelay = 2000 * (FAST_MODE ? 1 : 5);
        this.explodeDuration = 2000 * (FAST_MODE ? 1 : 5);
    }

    create() {
        super.create();

        this.input.setDefaultCursor('crosshair');
        this.input.on('pointerdown', () => {
            this.launchMissile(this.input.activePointer);
        });

        this.ground = this.add.rectangle(this.width / 2, this.height - 80, this.width, 60, this.fgColour);
        this.physics.add.existing(this.ground);
        // this.ground.setStrokeStyle(2, 0x111111);

        this.enemyMissiles = [];

        this.towers = [];
        this.towers.push(this.newTower(80, 500));
        this.towers.push(this.newTower(400, 500));
        // this.towers.push(this.newTower(720, 500));

        this.cities = [];
        this.cities.push(this.newCity(160, 515));
        this.cities.push(this.newCity(240, 515));
        this.cities.push(this.newCity(320, 515));
        // this.cities.push(this.newCity(480, 515));
        // this.cities.push(this.newCity(560, 515));
        // this.cities.push(this.newCity(640, 515));

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
    }

    newTower(x, y) {
        const top = this.add.arc(0, 0, 20, 180, 360, false, this.fgColour);
        // top.setStrokeStyle(2, 0x11111100);
        const bottom = this.add.rectangle(0, 20, 40, 40, this.fgColour)
        // bottom.setStrokeStyle(2, 0x11111100);

        const container = this.add.container(x, y, [top, bottom]);
        container.setSize(40, 60);
        this.physics.add.existing(container);
        return container;
    }

    newCity(x, y) {
        const city = this.add.triangle(0, 0, 0, 50, 50, 50, 25, 0, this.fgColour);
        // city.setStrokeStyle(2, 0x111111);
        const container = this.add.container(x, y, [city]);
        container.setSize(50, 25);
        this.physics.add.existing(container);
        return container;
    }

    launchMissile(pointer) {
        const launchPos = this.selectLaunchPos(pointer);
        if (launchPos == null) {
            return;
        }

        const missile = this.add.rectangle(launchPos.x, launchPos.y - launchPos.displayHeight * 0.4, 5, 5, this.highlightColour)
        this.physics.add.existing(missile);
        // this.physics.accelerateTo(missile, pointer.x, pointer.y, this.playerMissileSpeed / 2, this.playerMissileSpeed / 2, this.playerMissileSpeed);
        this.physics.moveToObject(missile, pointer, this.playerMissileSpeed);

        const dest_line_1 = this.add.line(0, 0, 0, 0, 0, 20, this.highlightColour);
        const dest_line_2 = this.add.line(0, 0, 0, 0, 20, 0, this.highlightColour);
        const dest = this.add.container(pointer.x, pointer.y, [dest_line_1, dest_line_2]);
        dest.setSize(2, 2);
        dest.setRotation(Math.PI / 4);
        this.physics.add.existing(dest);

        const collider = this.physics.add.overlap(missile, dest, (missileOnDest) => {
            missileOnDest.body.stop();
            this.physics.world.removeCollider(collider);
            missile.destroy();
            dest.destroy();
            this.explode(dest.x, dest.y, 25, this.highlightColour);
        });
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

    selectLaunchPos(pointer) {
        if (pointer.y > 500) {
            return null;
        }

        // return the closest tower that is not destroyed yet
        const closestTower = (twrs) => {
            if (twrs.length === 0) {
                return null;
            }
            const twrCandidate = this.physics.closest(pointer, twrs);
            if (twrCandidate.visible) {
                return twrCandidate;
            } else {
                const remainingTowers = twrs.filter((value, index, arr) => value != twrCandidate);
                return closestTower(remainingTowers);
            }
        }

        return closestTower(this.towers);
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

        const missile = this.add.rectangle(startX, startY, 5, 5, this.highlightColour)

        this.enemyMissiles.push(missile);
        this.physics.add.existing(missile);
        this.physics.moveToObject(missile, target, this.enemyMissileSpeed);


        const collTarget = this.physics.add.overlap(missile, this.targetGroup, (msl, tgt) => {
            msl.body.stop();
            // msl.line.destroy();
            msl.destroy();
            if (tgt != this.ground) {
                tgt.body.setEnable(false);
                tgt.setVisible(false);
            }
            this.physics.world.removeCollider(collTarget);
            this.explode(msl.x, msl.y, 80, this.highlightColour);
        });

        const collExplosion = this.physics.add.overlap(missile, this.explosionGroup, (msl, exp) => {
            msl.body.stop();
            msl.destroy();
            this.physics.world.removeCollider(collExplosion);
            this.explode(msl.x, msl.y, 50, this.highlightColour);
        });

    }

}


