class Pong extends Game {

    constructor(config) {
        super({
            key: "pong"
        });

        this.ballLaunchDelay = 6000 * TIME_SCALE;
        this.ballReviveDealy = 5000 * TIME_SCALE;
    }

    create() {
        const TOUCH_INSTRUCTIONS = "Touch the sides of the screen to move your paddle left and right.";
        const KEYBOARD_INSTRUCTIONS = "Use the arrow keys to move your paddle left and right.";

        this.instructions = this.sys.game.device.input.touch ? TOUCH_INSTRUCTIONS : KEYBOARD_INSTRUCTIONS;

        super.create();

        this.BALL_SPEED = 20 / TIME_SCALE;
        this.PADDLE_SPEED = 20 / TIME_SCALE;
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

        // this.handleInput();
        this.handleTopPaddle();

        if (this.ball.y > this.height + this.ball.displayHeight || this.ball.y < -this.ball.displayHeight) {
            // this.addTimePenalty();
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
            }, this.ballReviveDealy);
        }
    }

    // handleInput() {
    //     // Handles mouse and touch
    //     this.bottomPaddle.x = Phaser.Math.Clamp(this.input.activePointer.x, this.PADDLE_WIDTH * 0.5, this.width - this.PADDLE_WIDTH * 0.5);
    // }

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
        // let vx = this.ball.body.velocity.x;
        // let vy = this.ball.body.velocity.y;
        // let x = this.ball.x;
        // let y = this.ball.y;

        // // If the ball is coming towards the top paddle
        // if (vy < 0) {
        //     // Calculate where it will hit on x when it gets there
        //     while (y > this.topPaddle.y) {
        //         y += vy;
        //         x += vx;
        //         // Simulate hitting the walls and reversing vx
        //         if (x < 0 || x > this.width) {
        //             x -= vx;
        //             vx *= -1;
        //         }
        //     }
        // }
        // else {
        //     x = this.bottomPaddle.x;
        // }

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
        ball.body.velocity.x += (0.1 / TIME_SCALE) * dx; // This is good at 0.1 so if we're 10x slower...
    }
}