class Breakout extends Game {

    constructor(config) {
        super({
            key: "breakout"
        });


    }

    create() {
        super.create();

        this.BALL_SPEED = 5 / TIME_SCALE;
        this.PADDLE_SPEED = 5;
        this.PADDLE_WIDTH = this.width / 4;
        this.PADDLE_HEIGHT = this.PADDLE_WIDTH * 0.1;


        const paddle = this.add.rectangle(this.width / 2, this.height - this.PADDLE_HEIGHT * 4, this.PADDLE_WIDTH, this.PADDLE_HEIGHT, FG_COLOR);
        this.paddle = this.physics.add.existing(paddle);
        this.paddle.body.setImmovable(true);

        // this.walls = this.physics.add.group();
        // const leftWall = this.add.rectangle(-this.PADDLE_WIDTH * 0.5, this.height / 2, this.PADDLE_WIDTH, this.height);
        // this.leftWall = this.physics.add.existing(leftWall);
        // this.leftWall.body.setImmovable(true);
        // this.walls.add(this.leftWall)

        // const rightWall = this.add.rectangle(this.width + this.PADDLE_WIDTH * 0.5, this.height / 2, this.PADDLE_WIDTH, this.height, 0xffffff);
        // this.rightWall = this.physics.add.existing(rightWall);
        // this.rightWall.body.setImmovable(true);
        // this.walls.add(this.rightWall)

        const ball = this.add.circle(this.width / 2, this.height / 1.4, this.PADDLE_HEIGHT * 0.75, HIGHLIGHT_COLOR);
        this.ball = this.physics.add.existing(ball)

        this.physics.world.setBounds(0, 0, this.width, this.height * 3);

        this.ball.body
            .setMaxVelocity(this.BALL_SPEED * 2, this.BALL_SPEED)
            .setVelocity(Phaser.Math.Between(-this.BALL_SPEED, this.BALL_SPEED), this.BALL_SPEED)
            .setBounce(1, 1)
            .setCollideWorldBounds(true)

        this.bricks = this.physics.add.group();
        const cols = 10;
        const rows = 6;
        const padding = 4;
        const cellWidth = this.width / cols;
        const cellHeight = this.PADDLE_HEIGHT + padding;
        const brickWidth = cellWidth - padding;
        const brickHeight = this.PADDLE_HEIGHT;
        let x = brickWidth / 2;
        let y = brickHeight;

        for (let set = 0; set < 3; set++) {
            const bricks = [];
            for (let i = 0; i < cols * rows; i++) {
                const brick = this.bricks.create(300, 400, 'particle');
                brick.setDisplaySize(brickWidth, brickHeight)
                brick.setImmovable(true);
                brick.setTint(0x6666ff);
                bricks.push(brick);
            }

            Phaser.Actions.GridAlign(bricks, {
                width: cols,
                height: rows,
                cellWidth: cellWidth,
                cellHeight: cellHeight,
                x: cellWidth / 2,
                y: 100 + set * 180
            });
        }


        this.physics.add.collider(this.ball, this.paddle, this.paddleHit);
        this.physics.add.collider(this.ball, this.bricks, this.brickHit, null, this);
        // this.physics.add.collider(this.ball, this.walls, this.wallHit, null, this);

    }

    update(time, delta) {
        super.update(time, delta);

        this.handleInput();

        if (this.ball.y > this.height + this.ball.displayHeight) {
            this.ball.body.setVelocity(0, 0);
            this.ball.setAlpha(0);
            this.ball.setPosition(this.width / 2, this.height / 1.4);

            this.addTimePenalty();

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

    handleInput() {
        // Handles mouse and touch
        this.paddle.x = Phaser.Math.Clamp(this.input.activePointer.x, this.PADDLE_WIDTH * 0.5, this.width - this.PADDLE_WIDTH * 0.5);
    }

    paddleHit(ball, paddle) {
        // May want to include "spin" here?
        const dx = ball.x - paddle.x;
        ball.body.velocity.x += dx * 2;
    }

    brickHit(ball, brick) {
        brick.destroy();
    }

    wallHit(ball, wall) {

    }
}