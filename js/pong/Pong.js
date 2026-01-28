class Pong extends Phaser.Scene {

    constructor(config) {
        super({
            key: "pong"
        });


    }

    create() {
        this.width = this.game.canvas.width;
        this.height = this.game.canvas.height;

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

        this.ball.body.setVelocity(5, 5)
            .setBounce(1, 1);

        this.physics.add.collider(this.ball, this.rightWall);
        this.physics.add.collider(this.ball, this.leftWall);
        this.physics.add.collider(this.ball, this.topPaddle);
        this.physics.add.collider(this.ball, this.bottomPaddle);
    }

    update() {
        this.bottomPaddle.x = this.input.activePointer.x;
    }

    paddleHit(paddle, ball) {
        // ball.body.velocity.y = -ball.body.velocity.y;
    }

    wallHit(wall, ball) {
        // ball.body.velocity.x = -ball.body.velocity.x;
    }
}