class Game extends Phaser.Scene {
    constructor(config) {
        super({
            key: config.key
        });
    }

    init(data) {
        this.duration = data.duration;
        this.timescale = data.timescale;
        this.key = data.toState;
        this.players = data.players;
    }

    create() {
        this.input.setDefaultCursor('none');

        this.width = this.game.canvas.width;
        this.height = this.game.canvas.height;

        this.gameOver = false;

        this.cameras.main.setBackgroundColor(BG_COLOR);

        this.timer = this.duration > 0 ? this.duration : 0;

        this.timerText = this.add.text(this.width - 20, this.height - 20, "3:00", {
            font: "48px sans-serif",
            color: FG_COLOR_STRING,
            padding: {
                top: 0,
                bottom: 0,
            },
        }).setOrigin(1, 1);
        this.updateTimerText();
        this.timerText.setVisible(false);

        this.timerBar = this.add.image(0, this.height, `particle`)
            .setTint(HIGHLIGHT_COLOR)
            .setOrigin(0, 1)
            .setScale(this.width, 8)
            .setDepth(10000000)
        const TOUCH_INTERACTION = "Tap here to continue.";
        const KEYBOARD_INTERACTION = "Press space to continue."
        this.baseInteraction = this.sys.game.device.input.touch ? TOUCH_INTERACTION : KEYBOARD_INTERACTION;

        this.instructionsText = this.add.text(this.width * 0.5, this.height * 0.5, this.instructions, {
            font: "36px sans-serif",
            color: BG_COLOR_STRING,
            padding: 10,
            backgroundColor: HIGHLIGHT_COLOR_STRING,
            wordWrap: {
                width: this.width * 0.8
            }
        })
            .setOrigin(0.5, 0.5)
            .setAlpha(0)
            .setDepth(1000);

        this.continueText = this.add.text(this.instructionsText.x, this.instructionsText.y + this.instructionsText.height * 1.5, this.baseInteraction, {
            font: "36px sans-serif",
            color: BG_COLOR_STRING,
            padding: 10,
            backgroundColor: HIGHLIGHT_COLOR_STRING,
            wordWrap: {
                width: this.width * 0.8
            }
        })
            .setOrigin(0.5, 0.5)
            .setAlpha(0)
            .setDepth(1000);

        this.continueText.y = this.instructionsText.y + this.instructionsText.height / 2 + this.continueText.height * 0.75;


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

        this.states = {
            FADE_IN: "fadein",
            INSTRUCTIONS: "instructions",
            PLAY: "play",
            GAME_OVER: "gameover",
            FADE_OUT: "fadeout"
        };
        this.state = this.states.FADE_IN;

        this.fadeIn();
    }

    fadeIn() {
        this.setupInput();
        this.stopTimer();
        this.physics.pause();

        this.cameras.main.once('camerafadeincomplete', (camera) => {
            this.state = this.states.INSTRUCTIONS;
            this.showInstructions();
        }, this);

        this.cameras.main.fadeIn(FADE_TIME, 0, 0, 255);
    }

    showInstructions() {
        this.tweens.add({
            targets: [this.instructionsText, this.continueText],
            alpha: 1,
            onComplete: () => {
                if (this.sys.game.device.input.touch) {
                    this.input.once('pointerdown', () => {
                        this.startPlay();
                    });
                }
                else {
                    this.input.keyboard.once("keydown-SPACE", () => {
                        this.startPlay();
                    });
                }
            }
        })
    }

    setupInput() {
        this.input.on('pointerdown', () => {
            this.tapAt(this.input.activePointer.x, this.input.activePointer.y);
        });

        if (!this.sys.game.device.input.touch) {
            this.cursors = this.input.keyboard.createCursorKeys();
        }

        this.inputEnabled = false;
    }

    startPlay() {
        this.tweens.add({
            targets: [this.instructionsText, this.continueText],
            alpha: 0,
            duration: FADE_TIME,
            onComplete: () => {
                this.startTimer();
                this.physics.resume();
                this.inputEnabled = true;
                this.state = this.states.PLAY;
            }
        })
    }

    handleInput() {
        if (this.sys.game.device.input.touch) {
            this.handleTouchInput();
        }
        else {
            this.handleKeyboardInput();
        }
    }

    handleTouchInput() {
        if (this.input.activePointer.isDown) {
            if (this.input.activePointer.x < this.width * 0.33) {
                this.left();
            }
            else if (this.input.activePointer.x > this.width * 0.66) {
                this.right();
            }
            else {
                this.noInput();
            }
        }
        else {
            this.noInput();
        }
    }

    handleKeyboardInput() {
        if (this.cursors.left.isDown) {
            this.left();
        }
        else if (this.cursors.right.isDown) {
            this.right();
        }
        else {
            this.noInput();
        }

        if (Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
            this.space();
        }
    }

    start() {
        this.physics.resume();
        this.startTimer();
        this.inputEnabled = true;
    }

    update(time, delta) {
        super.update();

        if (this.inputEnabled) {
            this.handleInput();
        }

        if (!this.gameOver) {

            if (this.timerOn) {
                this.timer += this.duration > 0 ? -delta / 1000 : delta / 1000;
            }

            if (this.timer < 0) {
                this.timer = 0;

                this.stopPlay();
            }
            this.updateTimerText();
            this.updateTimerBar();
        }
    }

    stopPlay() {
        this.gameOver = true;

        this.tweens.killAll();

        const freshData = {
            "pong-slower": this.registry.get("pong-slower"),
            "pong-slowest": this.registry.get("pong-slowest"),
            "breakout-slower": this.registry.get("breakout-slower"),
            "breakout-slowest": this.registry.get("breakout-slowest"),
            "missilecommand-slower": this.registry.get("missilecommand-slower"),
            "missilecommand-slowest": this.registry.get("missile-command-slowest"),
        };

        if (this.duration === SLOW_DURATION) {
            freshData[`${this.key}-slower`] = false;
        }
        else if (this.duration === SLOWER_DURATION) {
            freshData[`${this.key}-slowest`] = false;
        }

        this.registry.set(freshData);
        localStorage.setItem("as-slow-as-possible-data", JSON.stringify(freshData))

        this.stopTimer();
        this.physics.pause();
        this.inputEnabled = false;
        this.state = this.states.GAME_OVER;

        this.instructionsText.text = `Done.`;
        this.instructionsText.setAlpha(0);
        this.instructionsText.setVisible(true);

        this.continueText.y = this.instructionsText.y + this.instructionsText.height / 2 + this.continueText.height * 0.75;

        this.tweens.add({
            targets: [this.instructionsText, this.continueText],
            alpha: 1,
            duration: FADE_TIME,
            onComplete: () => {
                if (this.sys.game.device.input.touch) {
                    this.input.once('pointerdown', () => {
                        this.toMenu();
                    });
                }
                else {
                    this.input.keyboard.once("keydown-SPACE", () => {
                        this.toMenu();
                    });
                }
            },
        })
    }

    toMenu() {
        this.cameras.main.fade(FADE_TIME, 0, 0, 255, false, (camera, progress) => {
            if (progress == 1) {
                this.scene.start("gamemenu");
            }
        });
    }

    startTimer() {
        this.timerOn = true;
    }

    stopTimer() {
        this.timerOn = false;
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

    updateTimerBar() {
        this.timerBar.setScale(this.width * (this.timer / this.duration), 8);
    }

    left() {
        // To be implemented by child
    }

    right() {
        // To be implemented by child
    }

    tapAt(x, y) {
        // To be implemented by child
    }

    space() {
        // To be implemented by child
    }

    noInput() {
        // To be implemented by child
    }
}