class Game extends Phaser.Scene {
    constructor(config) {
        super({
            key: config.key
        });

        this.fgColour = 0x7777ff;
        this.textColour = "#7777ff";
        this.highlightColour = 0xff77ff;
        this.bgColour = 0x0000ff;
    }

    create() {
        this.width = this.game.canvas.width;
        this.height = this.game.canvas.height;

        this.cameras.main.setBackgroundColor(this.bgColour);

        // samples('github:tidalcycles/dirt-samples');

        // document.addEventListener('click', () => {
        //     stack(
        //         note('<c a f e>(3,8)').jux(rev).lpf(700),
        //         s("[bd sd bd <sd sd sd sd*2>]").lpf(1500),
        //         s("[hh*4 hh*2 hh*2 hh*2]").lpf(sine.range(1000, 1500).slow(4))
        //     ).play();
        // });

        this.timer = 3 * 60 + 3;
        this.timerText = this.add.text(this.width - 10, this.height - 10, "hi", {
            font: "24px sans-serif",
            color: this.textColour,
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
            this.scene.start("asteroids");
        }, this);
        this.input.keyboard.on('keydown-FOUR', () => {
            this.scene.start("missilecommand");
        }, this);

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