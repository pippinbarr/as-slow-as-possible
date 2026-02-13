class Pong extends Game {

    constructor(config) {
        super({
            key: "pong"
        });


    }

    create() {
        super.create();

        this.BALL_SPEED = 5;
        this.PADDLE_SPEED = 5;
        this.PADDLE_WIDTH = this.width / 4;
        this.PADDLE_HEIGHT = this.PADDLE_WIDTH * 0.1;

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

        const ball = this.add.circle(this.width / 2, this.height / 2, this.PADDLE_HEIGHT * 0.75, 0xff66ff);
        this.ball = this.physics.add.existing(ball)

        this.ball.body.setVelocity(this.BALL_SPEED, this.BALL_SPEED)
            .setBounce(1, 1);

        this.physics.add.collider(this.ball, this.rightWall);
        this.physics.add.collider(this.ball, this.leftWall);
        this.physics.add.collider(this.ball, this.topPaddle);
        this.physics.add.collider(this.ball, this.bottomPaddle);


    }

    update(time, delta) {
        super.update(time, delta);

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