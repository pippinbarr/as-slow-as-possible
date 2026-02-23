const PART_SHIELD_CONF = {
    frame: "Particle-yellow",
    lifespan: 600,
    speed: { min: 10, max: 20 },
    scale: { max: 1, min: 0.5 },
    alpha: { start: 1, end: 0 },
    gravityY: 4,
    emitting: false
};

const PART_SMOKE_CONF = {
    frame: "Smoke-0",
    lifespan: 3000,
    scale: { start: 0.5, end: 0 },
    alpha: { max: 0.8, min: 0.3 },
    speed: 6,
    angle: { min: -160, max: -84 },
    gravityY: -10,
    emitting: false
};

const PART_EXPLOSION_CONF = {
    frame: "Particle-yellow",
    lifespan: 2000,
    speed: { min: 20, max: 90 },
    scale: { max: 2, min: 0.5 },
    alpha: { start: 1, end: 0 },
    blendMode: "add",
    emitting: false,
    rotate: { max: 359, min: 0 }
};

const PART_CRASH_CONF = {
    frame: "Smoke-0",
    lifespan: 1000,
    speed: { min: 10, max: 20 },
    scale: { max: 2, min: 0.5 },
    alpha: { start: 1, end: 0 },
    gravityY: 4,
    emitting: false
};

const HIT_SCORE = 200;
const SND_HITS = ["shield_hit1", "shield_hit2", "shield_hit3"];
const FADE_DURATION = 1000;

class SpaceInvadersNotMine extends Game {
    constructor() {
        super({
            key: "spaceinvadersnotmine"
        });
    };

    init() {
        this.score = 0;
        this.totalShoots = 0;
        this.hits = 0;
        this.best = 0;
        // this.accuracy = 0;
    }

    create() {
        super.create();

        this.cursors = this.input.keyboard.createCursorKeys()


        // Initial camera fadein effect
        this.cameras.main.fadeIn(FADE_DURATION);
        // Initialize persistent high score
        const best = window.localStorage.getItem("best");
        if (best == null) {
            window.localStorage.setItem("best", "0");
        } else {
            this.best = best;
        }
        // Background image layer
        this.add.image(0, 0, "atlas", "Background-0").setOrigin(0).setTint(0x888888);
        // Second image layer
        this.add.image(0, this.scale.height, "atlas", "Ruins3-0").setOrigin(0, 1).setTint(0x666666);
        // Player smoke effect after hit
        this.prtSmoke = this.add.particles(49, this.scale.height - 20, "atlas", PART_SMOKE_CONF);
        // Player ship
        this.player = this.add.existing(new Player(this, this.width / 2, this.scale.height - 20));
        // Group of enemies
        this.enemies = new Enemies(this);
        // Shield hit effect
        this.prtShieldHit = this.add.particles(0, 0, "atlas", PART_SHIELD_CONF);
        // Groups of shields
        this.shields = new Shields(this, this.player.y - 40);
        // Explosion effect
        this.prtExplosion = this.add.particles(0, 0, "atlas", PART_EXPLOSION_CONF);
        // Crash effect on the ground
        this.prtCrash = this.add.particles(0, 0, "atlas", PART_CRASH_CONF);
        // Front image layer
        this.add.image(0, this.scale.height, "atlas", "Floor-0").setOrigin(0, 1);
        // Colliders
        this.addColliders();
        // Camera effect used in game over
        this.cameraFX = this.cameras.main.postFX.addColorMatrix();
        // Events
        this.addEvents();

    }

    addColliders() {
        this.physics.world.on("worldbounds", (body, up, down) => {
            if (down) {
                body.enable = false;
                this.sound.play("ground", { volume: SOUND_LEVELS.crash, pan: getPan(body.x, this.scale.width) });
                this.prtCrash.emitParticle(10, body.x, body.y);
                if (body.width == this.player.width) {
                    this.prtSmoke.x = this.player.x;
                    this.prtSmoke.y = this.player.y;
                    this.prtSmoke.emitting = true;
                }
                this.cameras.main.shake(100, 0.01);
            }
        });

        const bulletCollider = this.physics.add.collider(this.player.bullet, this.enemies.activeEnemies, (bullet, enemy) => {
            bullet.reset();
            this.prtExplosion.emitParticle(40, enemy.x, enemy.y);
            this.sound.play("explode", { volume: SOUND_LEVELS.explode, pan: getPan(enemy.x, this.scale.width) });
            this.enemies.explode(enemy);
            this.hits++;
            // this.updateAccuracy();
            // this.updateScore(Math.round(HIT_SCORE * this.accuracy));
            if (!this.enemies.activeEnemies.length) {
                this.gameWin();
            }
        });

        this.physics.add.collider(this.player, [this.enemies.bullets, ...this.enemies.activeEnemies], () => {
            this.prtExplosion.emitParticle(60, this.player.x, this.player.y);
            this.player.explode();
            bulletCollider.active = false;
            this.gameOver();
        });

        this.physics.add.collider(this.shields.activeShields, this.enemies.bullets, (shield, bullet) => {
            bullet.reset();
            this.prtShieldHit.setPosition(shield.x, shield.y - shield.height / 2);
            this.prtShieldHit.particleAngle = { min: -135, max: -45 };
            this.prtShieldHit.emitParticle(10);
            this.sound.play(SND_HITS[Phaser.Math.Between(0, 2)], { volume: SOUND_LEVELS.metal, pan: getPan(shield.x, this.scale.width) });
            this.shields.hit(shield);
        });

        this.physics.add.collider(this.player.bullet, this.shields.activeShields, (bullet, shield) => {
            bullet.reset();
            this.prtShieldHit.setPosition(shield.x, shield.y + shield.height / 2);
            this.prtShieldHit.particleAngle = { min: 135, max: 45 };
            this.prtShieldHit.emitParticle(10);
            // this.sound.play(SND_HITS[Phaser.Math.Between(0, 2)], { volume: SOUND_LEVELS.metal, pan: getPan(shield.x, this.scale.width) });
            this.shields.hit(shield);
            // this.updateAccuracy();
        });
    }

    addEvents() {
        this.events.once("enemies-ready", this.onEnemiesReady, this);
        this.events.on("player-shoot", () => this.totalShoots++);
        this.events.once("shutdown", () => {
            this.events.off("enemies-ready");
            this.events.off("player-shoot");
            this.enemiesShootTimer.remove(false);
            this.enemies = null;
            this.player = null;
        });
    }

    // updateAccuracy() {
    //     this.accuracy = Math.round((this.hits / this.totalShoots) * 100) / 100;
    //     const txt = this.accuracy * 100;
    //     this.txtAccuracy.setText(txt + "%");
    // }

    onEnemiesReady() {
        this.enemiesShootTimer = this.time.addEvent({
            delay: 1000,
            callback: () => {
                this.enemies.shoot();
            },
            callbackScope: this,
            loop: true
        });
    }

    update(time, delta) {
        this.enemies.update(delta);
    }
}