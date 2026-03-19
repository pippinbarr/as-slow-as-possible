class Title extends Phaser.Scene {

  constructor(config) {
    super({
      key: "title"
    });

    this.indent = 100;
  }

  create() {
    const title = "As Slow As Possible";

    this.width = this.game.canvas.width;
    this.height = this.game.canvas.height;

    this.cameras.main.setBackgroundColor(BG_COLOR);

    this.createTitle(title);

    // this.createHelp();

    this.cameras.main.once('camerafadeincomplete', function (camera) {

    }, this);
    this.cameras.main.fadeIn(FADE_TIME, 0, 0, 255, (camera, progress) => {
      this.fadeInProgress = progress;
    });

    this.inputEnabled = true;
  }

  createTitle(title) {
    // Title
    this.titleText = this.add.text(0, 0, title, {
      font: "56px sans-serif",
      color: FG_COLOR_STRING,
      padding: {
        top: 0,
        bottom: 0,
      },
    }).setOrigin(0, 0);

    // Underline
    this.underline = this.add.line(this.titleText.x, this.titleText.y + this.titleText.displayHeight, 0, 0, this.titleText.displayWidth, 0, HIGHLIGHT_COLOR)
      .setOrigin(0, 0);

    this.authorText = this.add.text(this.underline.x + this.underline.width, this.underline.y + this.underline.height, "by Pippin Barr", {
      font: "36px sans-serif",
      color: FG_COLOR_STRING,
      padding: {
        top: 0,
        bottom: 0,
      },
    }).setOrigin(1, 0);

    this.titleContainer = this.add.container(this.indent, this.height * 0.45);
    this.titleContainer.add(this.titleText);
    this.titleContainer.add(this.underline);
    this.titleContainer.add(this.authorText);

    this.headphonesText = this.add.text(this.width - this.indent, this.height - this.indent, "(Headphones recommended.)", {
      font: "36px sans-serif",
      color: FG_COLOR_STRING,
      padding: {
        top: 0,
        bottom: 0,
      },
    }).setOrigin(1, 1);


    // this.titleText.setInteractive(new Phaser.Geom.Rectangle(0, 0, this.titleText.width, this.titleText.height), Phaser.Geom.Rectangle.Contains);

    // this.titleText.on('pointerover', () => {
    //   if (!this.inputEnabled) return;
    //   this.titleText.setTint(HIGHLIGHT_COLOR);
    // });

    // this.titleText.on('pointerout', () => {
    //   if (!this.inputEnabled) return;
    //   this.titleText.setTint(0xffffff);
    // });

    // this.input.activePointer.on('pointerdown', () => {
    //   if (!this.inputEnabled) return;
    //   this.titleText.y += 2;
    //   this.titleText.x += 2;
    // });

    this.input.once('pointerup', () => {
      if (!this.inputEnabled) return;
      // this.titleText.y -= 2;
      // this.titleText.x -= 2;
      // this.titleText.setTint(HIGHLIGHT_COLOR);

      this.inputEnabled = false;
      // this.cameras.main.fadeEffect.reset();
      // this.cameras.main.setAlpha(this.fadeInProgress);
      // this.cameras.main.fade(FADE_TIME, 0, 0, 255, false, (camera, progress) => {
      //   if (progress == 1) {
      //     this.scene.start(itemData.toState, itemData);
      //   }
      // });

      // this.instructionsText.setAlpha(0)

      this.tweens.add({
        targets: this.titleContainer,
        y: this.indent,
        duration: FADE_TIME,
        onComplete: () => {
          this.scene.start("gamemenu");
        }
      })
    });

  }

  createHelp() {
    const instruction = this.sys.game.device.input.touch ? "Tap to begin" : "Click to begin";

    this.instructionsText = this.add.text(this.width - this.indent * 0.25, this.height - this.indent * 0.25, instruction, {
      font: "36px sans-serif",
      color: BG_COLOR_STRING,
      padding: 2,
      backgroundColor: HIGHLIGHT_COLOR_STRING,
    })
      .setOrigin(1, 1)
      .setAlpha(0)
      .setDepth(1000)

    this.time.addEvent({
      delay: FADE_TIME * 2,
      callback: () => {
        if (this.inputEnabled) {
          this.instructionsText.setAlpha(1);
        }
      }
    })
  }
}