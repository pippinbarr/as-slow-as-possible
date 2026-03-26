class Pong extends Game {

    constructor(config) {
        super({
            key: "pong"
        });

    }

    create() {
        const TOUCH_INSTRUCTIONS = "Touch the sides of the screen to move your paddle left and right.";
        const KEYBOARD_INSTRUCTIONS = "Use the arrow keys to move your paddle left and right.";

        this.instructions = this.sys.game.device.input.touch ? TOUCH_INSTRUCTIONS : KEYBOARD_INSTRUCTIONS;

        this.ballLaunchDelay = 6000 * this.timescale;
        this.ballReviveDelay = 5000 * this.timescale;

        super.create();

        this.BALL_SPEED = 20 / this.timescale;
        this.PADDLE_SPEED = 20 / this.timescale;
        this.PADDLE_WIDTH = this.width / 4;
        this.PADDLE_HEIGHT = this.PADDLE_WIDTH * 0.1;

        const bottomPaddle = this.add.rectangle(this.width / 2, this.height - this.PADDLE_HEIGHT * 4, this.PADDLE_WIDTH, this.PADDLE_HEIGHT, FG_COLOR);
        this.bottomPaddle = this.physics.add.existing(bottomPaddle);
        this.bottomPaddle.body.setImmovable(true)
            .setCollideWorldBounds(true)

        const topPaddle = this.add.rectangle(this.width / 2, this.PADDLE_HEIGHT * 4, this.PADDLE_WIDTH, this.PADDLE_HEIGHT, FG_COLOR);
        this.topPaddle = this.physics.add.existing(topPaddle);
        this.topPaddle.body.setImmovable(true)
            .setCollideWorldBounds(true)

        const leftWall = this.add.rectangle(-this.PADDLE_WIDTH * 0.5, this.height / 2, this.PADDLE_WIDTH, this.height);
        this.leftWall = this.physics.add.existing(leftWall);
        this.leftWall.body.setImmovable(true);

        const rightWall = this.add.rectangle(this.width + this.PADDLE_WIDTH * 0.5, this.height / 2, this.PADDLE_WIDTH, this.height, 0xffffff);
        this.rightWall = this.physics.add.existing(rightWall);
        this.rightWall.body.setImmovable(true);

        const ball = this.add.circle(this.width / 2, this.height / 2, this.PADDLE_HEIGHT * 0.75, HIGHLIGHT_COLOR);
        this.ball = this.physics.add.existing(ball)
        this.ball.body.setMaxVelocity(this.BALL_SPEED * 2, this.BALL_SPEED)
            .setBounce(1, 1);

        this.ball.body.setVelocity(Phaser.Math.Between(-this.BALL_SPEED, this.BALL_SPEED), this.BALL_SPEED)

        this.physics.add.collider(this.ball, this.rightWall, this.wallHit, null, this);
        this.physics.add.collider(this.ball, this.leftWall, this.wallHit, null, this);
        this.physics.add.collider(this.ball, this.topPaddle, this.paddleHit, null, this);
        this.physics.add.collider(this.ball, this.bottomPaddle, this.paddleHit, null, this);
    }

    update(time, delta) {
        super.update(time, delta);

        this.handleTopPaddle();

        if (this.ball.y > this.height + this.ball.displayHeight || this.ball.y < -this.ball.displayHeight) {
            this.ball.body.setVelocity(0, 0);
            this.ball.setAlpha(0);
            this.ball.setPosition(this.width / 2, this.height / 2);
            setTimeout(() => {
                this.tweens.add({
                    targets: this.ball,
                    alpha: 1,
                    onComplete: () => {
                        this.ball.body.setVelocity(Phaser.Math.Between(-this.BALL_SPEED, this.BALL_SPEED), this.BALL_SPEED)
                            .setBounce(1, 1);
                    },
                    duration: this.ballLaunchDelay
                })
            }, this.ballReviveDelay);
        }
    }

    left() {
        this.bottomPaddle.body.setVelocity(-this.PADDLE_SPEED, 0);
    }

    right() {
        this.bottomPaddle.body.setVelocity(this.PADDLE_SPEED, 0);
    }

    noInput() {
        this.bottomPaddle.body.setVelocity(0, 0);
    }

    handleTopPaddle() {

        if (this.ball.x < this.topPaddle.x) {
            this.topPaddle.body.setVelocity(-this.PADDLE_SPEED * 1.05, 0);
        }
        else if (this.ball.x > this.topPaddle.x) {
            this.topPaddle.body.setVelocity(this.PADDLE_SPEED * 1.05, 0);
        }
        this.topPaddle.x = Phaser.Math.Clamp(this.topPaddle.x, this.PADDLE_WIDTH * 0.5, this.width - this.PADDLE_WIDTH * 0.5);
    }

    wallHit(ball, wall) {

    }

    paddleHit(ball, paddle) {
        const dx = ball.x - paddle.x;
        ball.body.velocity.x += (0.1 / this.timescale) * dx; // This is good at 0.1 so if we're 10x slower...
    }
}