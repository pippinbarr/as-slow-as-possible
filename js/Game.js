class Game extends Phaser.Scene {
    constructor(config) {
        super({
            key: config.key
        });
    }

    init(data) {
        this.duration = data.duration;
        this.key = data.toState;
    }

    create() {
        this.width = this.game.canvas.width;
        this.height = this.game.canvas.height;

        this.gameOver = false;

        this.cameras.main.setBackgroundColor(BG_COLOR);

        // samples('github:tidalcycles/dirt-samples');

        // document.addEventListener('click', () => {
        //     stack(
        //         note('<c a f e>(3,8)').jux(rev).lpf(700),
        //         s("[bd sd bd <sd sd sd sd*2>]").lpf(1500),
        //         s("[hh*4 hh*2 hh*2 hh*2]").lpf(sine.range(1000, 1500).slow(4))
        //     ).play();
        // });

        this.timer = this.duration > 0 ? this.duration : 0;

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

        if (!this.gameOver) {
            this.timer += this.duration > 0 ? -delta / 1000 : delta / 1000;

            if (this.timer < 0) {
                this.timer = 0;

                this.gameOver = true;

                const freshData = {
                    pong: this.registry.get("pong"),
                    missilecommand: this.registry.get("missilecommand"),
                    breakout: this.registry.get("breakout"),
                    spaceinvaders: this.registry.get("spaceinvaders")
                };
                freshData[this.key] = false;
                this.registry.set(freshData);
                localStorage.setItem("as-slow-as-possible-data", JSON.stringify(freshData))

                this.scene.start("gamemenu");
            }
            this.updateTimerText();
        }
    }


    updateTimerText() {
        const hours = Math.floor(this.timer / 60 / 60);
        const hoursText = (hours < 10) ? "0" + hours : hours;

        const minutes = Math.floor(this.timer / 60) - (hours * 60);
        const minutesText = (minutes < 10) ? "0" + minutes : minutes;

        const seconds = Math.floor(this.timer) - (hours * 60 * 60) - (minutes * 60);
        const secondsText = (seconds < 10) ? "0" + seconds : seconds;


        if (this.duration > 0) {
            this.timerText.text = `${minutesText}:${secondsText}`;
        }
        else {
            this.timerText.text = `${hoursText}:${minutesText}:${secondsText}`;
        }
    }
}