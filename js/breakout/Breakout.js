class Breakout extends Phaser.Scene {

    constructor(config) {
        super({
            key: "breakout"
        });


    }

    create() {
        this.width = this.game.canvas.width;
        this.height = this.game.canvas.height;

        this.BALL_SPEED = FAST_MODE ? 100 : 5;
        this.PADDLE_SPEED = 5;
        this.PADDLE_WIDTH = this.width / 4;
        this.PADDLE_HEIGHT = this.PADDLE_WIDTH * 0.1;

        this.cameras.main.setBackgroundColor(0x0000dd);

        const paddle = this.add.rectangle(this.width / 2, this.height - this.PADDLE_HEIGHT * 2, this.PADDLE_WIDTH, this.PADDLE_HEIGHT, 0x6666ff);
        this.paddle = this.physics.add.existing(paddle);
        this.paddle.body.setImmovable(true);

        // const leftWall = this.add.rectangle(-this.PADDLE_WIDTH * 0.5, this.height / 2, this.PADDLE_WIDTH, this.height);
        // this.leftWall = this.physics.add.existing(leftWall);
        // this.leftWall.body.setImmovable(true);

        // const rightWall = this.add.rectangle(this.width + this.PADDLE_WIDTH * 0.5, this.height / 2, this.PADDLE_WIDTH, this.height, 0xffffff);
        // this.rightWall = this.physics.add.existing(rightWall);
        // this.rightWall.body.setImmovable(true);

        const ball = this.add.circle(this.width / 2, this.height / 1.6, this.PADDLE_HEIGHT * 0.75, 0x6666ff);
        this.ball = this.physics.add.existing(ball)

        this.ball.body
            .setVelocity(this.BALL_SPEED * 0.8, this.BALL_SPEED)
            .setBounce(1, 1)
            .setCollideWorldBounds(true)

        this.bricks = this.physics.add.group();
        const cols = 8;
        const rows = 16;
        const padding = 4;
        const cellWidth = this.width / cols;
        const cellHeight = this.PADDLE_HEIGHT + padding;
        const brickWidth = cellWidth - padding;
        const brickHeight = this.PADDLE_HEIGHT;
        let x = brickWidth / 2;
        let y = brickHeight;
        for (let i = 0; i < cols * rows; i++) {
            const brick = this.bricks.create(300, 400, 'particle');
            brick.setDisplaySize(brickWidth, brickHeight)
            brick.setImmovable(true);
            brick.setTint(0x6666ff);
        }

        Phaser.Actions.GridAlign(this.bricks.getChildren(), {
            width: cols,
            height: rows,
            cellWidth: cellWidth,
            cellHeight: cellHeight,
            x: cellWidth / 2,
            y: 100
        });

        this.physics.add.collider(this.ball, this.paddle);
        this.physics.add.collider(this.ball, this.bricks, this.brickHit, null, this);

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
    }

    handleInput() {
        // Handles mouse and touch
        this.paddle.x = Phaser.Math.Clamp(this.input.activePointer.x, this.PADDLE_WIDTH * 0.5, this.width - this.PADDLE_WIDTH * 0.5);
    }

    paddleHit(paddle, ball) {
        // May want to include "spin" here?
    }

    brickHit(ball, brick) {
        console.log("Hit")
        brick.destroy();
        // ball.body.velocity.y *= -1;
    }
}