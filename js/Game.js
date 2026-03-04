class Game extends Phaser.Scene {
    constructor(config) {
        super({
            key: config.key
        });
    }

    init(data) {
        this.duration = data.duration;
    }

    create() {
        this.width = this.game.canvas.width;
        this.height = this.game.canvas.height;

        this.cameras.main.setBackgroundColor(BG_COLOR);

        // samples('github:tidalcycles/dirt-samples');

        // document.addEventListener('click', () => {
        //     stack(
        //         note('<c a f e>(3,8)').jux(rev).lpf(700),
        //         s("[bd sd bd <sd sd sd sd*2>]").lpf(1500),
        //         s("[hh*4 hh*2 hh*2 hh*2]").lpf(sine.range(1000, 1500).slow(4))
        //     ).play();
        // });

        this.timer = this.duration;

        this.timerText = this.add.text(this.width - 10, this.height - 10, "3:00", {
            font: "24px sans-serif",
            color: TEXT_COLOR,
            padding: {
                top: 0,
                bottom: 0,
            },
        }).setOrigin(1, 1);
        this.updateTimerText();

        this.input.keyboard.on('keydown-ONE', () => {
            this.scene.start("pong");
        }, this);
        this.input.keyboard.on('keydown-TWO', () => {
            this.scene.start("breakout");
        }, this);
        this.input.keyboard.on('keydown-THREE', () => {
            this.scene.start("spaceinvaders");
        }, this);
        this.input.keyboard.on('keydown-FOUR', () => {
            this.scene.start("missilecommand");
        }, this);

        this.cameras.main.once('camerafadeincomplete', (camera) => {
            this.start();
        }, this);

        this.cameras.main.fadeIn(FADE_TIME, 0, 0, 255);

        this.physics.pause()
    }

    start() {
        this.physics.resume()
    }

    update(time, delta) {
        super.update();

        this.timer -= delta / 1000;
        if (this.timer < 0) {
            this.timer = 0;
            // And end...
        }
        this.updateTimerText();
    }


    updateTimerText() {
        const minutes = Math.floor(this.timer / 60)
        const seconds = Math.floor(this.timer - minutes * 60);
        this.timerText.text = `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
    }
}