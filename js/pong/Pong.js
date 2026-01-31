class Pong extends Phaser.Scene {

    constructor(config) {
        super({
            key: "pong"
        });


    }

    create() {
        this.width = this.game.canvas.width;
        this.height = this.game.canvas.height;

        this.BALL_SPEED = 5;
        this.PADDLE_SPEED = 5;
        this.PADDLE_WIDTH = this.width / 4;
        this.PADDLE_HEIGHT = this.PADDLE_WIDTH * 0.1;

        this.cameras.main.setBackgroundColor(0x0000dd);

        const bottomPaddle = this.add.rectangle(this.width / 2, this.height - this.PADDLE_HEIGHT * 2, this.PADDLE_WIDTH, this.PADDLE_HEIGHT, 0x6666ff);
        this.bottomPaddle = this.physics.add.existing(bottomPaddle);
        this.bottomPaddle.body.setImmovable(true);

        const topPaddle = this.add.rectangle(this.width / 2, this.PADDLE_HEIGHT * 2, this.PADDLE_WIDTH, this.PADDLE_HEIGHT, 0x6666ff);
        this.topPaddle = this.physics.add.existing(topPaddle);
        this.topPaddle.body.setImmovable(true);

        const leftWall = this.add.rectangle(-this.PADDLE_WIDTH * 0.5, this.height / 2, this.PADDLE_WIDTH, this.height);
        this.leftWall = this.physics.add.existing(leftWall);
        this.leftWall.body.setImmovable(true);

        const rightWall = this.add.rectangle(this.width + this.PADDLE_WIDTH * 0.5, this.height / 2, this.PADDLE_WIDTH, this.height, 0xffffff);
        this.rightWall = this.physics.add.existing(rightWall);
        this.rightWall.body.setImmovable(true);

        const ball = this.add.circle(this.width / 2, this.height / 2, this.PADDLE_HEIGHT * 0.75, 0x6666ff);
        this.ball = this.physics.add.existing(ball)

        this.ball.body.setVelocity(this.BALL_SPEED, this.BALL_SPEED)
            .setBounce(1, 1);

        this.physics.add.collider(this.ball, this.rightWall);
        this.physics.add.collider(this.ball, this.leftWall);
        this.physics.add.collider(this.ball, this.topPaddle);
        this.physics.add.collider(this.ball, this.bottomPaddle);

        samples('github:tidalcycles/dirt-samples');

        document.addEventListener('click', () => {
            stack(
                note('<c a f e>(3,8)').jux(rev).lpf(700),
                s("[bd sd bd <sd sd sd sd*2>]").lpf(1500),
                s("[hh*4 hh*2 hh*2 hh*2]").lpf(sine.range(1000, 1500).slow(4))
            ).play();
        });
    }

    update() {
        this.handleInput();
        this.handleTopPaddle();
    }

    handleInput() {
        // Handles mouse and touch
        this.bottomPaddle.x = Phaser.Math.Clamp(this.input.activePointer.x, this.PADDLE_WIDTH * 0.5, this.width - this.PADDLE_WIDTH * 0.5);
    }

    handleTopPaddle() {
        if (this.ball.x < this.topPaddle.x) {
            this.topPaddle.body.setVelocity(-this.PADDLE_SPEED, 0);
        }
        else if (this.ball.x > this.topPaddle.x) {
            this.topPaddle.body.setVelocity(this.PADDLE_SPEED, 0);
        }
        this.topPaddle.x = Phaser.Math.Clamp(this.topPaddle.x, this.PADDLE_WIDTH * 0.5, this.width - this.PADDLE_WIDTH * 0.5);
    }

    paddleHit(paddle, ball) {
        // May want to include "spin" here?
    }
}