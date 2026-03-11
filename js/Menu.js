class Menu extends Phaser.Scene {

  constructor(config) {
    super(config);

    this.indent = 50;
  }

  create() {
    this.width = this.game.canvas.width;
    this.height = this.game.canvas.height;

    this.cameras.main.setBackgroundColor(BG_COLOR);

    this.cameras.main.once('camerafadeincomplete', function (camera) {

    }, this);
    this.cameras.main.fadeIn(FADE_TIME, 0, 0, 255, (camera, progress) => {
      this.fadeInProgress = progress;
    });

    this.inputEnabled = true;
  }

  createTitle(title) {
    // Title
    this.titleText = this.add.text(this.indent, this.indent, title, {
      font: "28px sans-serif",
      color: FG_COLOR_STRING,
      padding: {
        top: 0,
        bottom: 0,
      },
    }).setOrigin(0, 0);

    // Underline
    this.add.line(this.titleText.x, this.titleText.y + this.titleText.displayHeight, 0, 0, this.titleText.displayWidth, 0, HIGHLIGHT_COLOR)
      .setOrigin(0, 0);
  }

  createMenu(data) {
    // Go through the menu data and create menu items for each entry
    for (let i = 0; i < data.length; i++) {
      const itemData = data[i];
      const menuItemText = this.add.text(this.indent, this.indent + 32 + 32 + (32 * 2 * i), itemData.text, {
        font: "28px sans-serif",
        color: FG_COLOR_STRING,
        padding: {
          top: 0,
          bottom: 0,
        },
      }).setOrigin(0, 0);
      menuItemText.setPadding(0, 0, 0, 5);


      if (itemData.subtext && itemData.locked) {
        const menuItemSubtext = this.add.text(menuItemText.x, menuItemText.y + menuItemText.height * 0.9, itemData.subtext, {
          font: "16px sans-serif",
          color: FG_COLOR_STRING,
          padding: {
            top: 0,
            bottom: 0,
          },
        }).setOrigin(0, 0);
        // menuItemSubtext.setAlpha(0.666);
      }

      if (itemData.locked) {
        menuItemText.setAlpha(0.666);
        // return;
      }
      else {

        menuItemText.setInteractive(new Phaser.Geom.Rectangle(0, 0, menuItemText.width, menuItemText.height), Phaser.Geom.Rectangle.Contains);

        menuItemText.on('pointerover', () => {
          if (!this.inputEnabled) return;
          menuItemText.setTint(HIGHLIGHT_COLOR);
        });

        menuItemText.on('pointerout', () => {
          if (!this.inputEnabled) return;
          menuItemText.setTint(0xffffff);
        });

        menuItemText.on('pointerdown', () => {
          if (!this.inputEnabled) return;
          menuItemText.y += 2;
          menuItemText.x += 2;
        });

        menuItemText.on('pointerup', () => {
          if (!this.inputEnabled) return;
          menuItemText.y -= 2;
          menuItemText.x -= 2;
          menuItemText.setTint(HIGHLIGHT_COLOR);

          this.inputEnabled = false;
          this.cameras.main.fadeEffect.reset();
          this.cameras.main.setAlpha(this.fadeInProgress);
          this.cameras.main.fade(FADE_TIME, 0, 0, 255, false, (camera, progress) => {
            if (progress == 1) {
              this.scene.start(itemData.toState, itemData);
            }
          });
        });
      }
    }
  }
}