class Game extends Phaser.Scene {
    constructor(config) {
        super({
            key: config.key
        });
    }

    create() {
        this.width = this.game.canvas.width;
        this.height = this.game.canvas.height;

        this.cameras.main.setBackgroundColor(0x0000dd);

        samples('github:tidalcycles/dirt-samples');

        document.addEventListener('click', () => {
            stack(
                note('<c a f e>(3,8)').jux(rev).lpf(700),
                s("[bd sd bd <sd sd sd sd*2>]").lpf(1500),
                s("[hh*4 hh*2 hh*2 hh*2]").lpf(sine.range(1000, 1500).slow(4))
            ).play();
        });
    }
}