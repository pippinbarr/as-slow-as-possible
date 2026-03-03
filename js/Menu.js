class Menu extends Phaser.Scene {

  constructor(config) {
    super({
      key: "menu"
    });
  }

  create() {
    this.width = this.game.canvas.width;
    this.height = this.game.canvas.height;

    this.cameras.main.setBackgroundColor(BG_COLOR);

    this.titleText = this.add.text(10, 10, "As Slow As Possible", {
      font: "24px sans-serif",
      color: TEXT_COLOR,
      padding: {
        top: 0,
        bottom: 0,
      },
    }).setOrigin(0, 0);

    const menuItems = [
      {
        text: "Pong",
        state: "pong"
      },
      {
        text: "Breakout",
        state: "breakout"
      },
      {
        text: "Space Invaders",
        state: "spaceinvaders"
      },
      {
        text: "Missile Command",
        state: "missilecommand"
      }
    ]

    for (let i = 0; i < menuItems.length; i++) {
      const item = menuItems[i];
      const menuItem = this.add.text(10, 110 + 50 * i, item.text, {
        font: "24px sans-serif",
        color: TEXT_COLOR,
        // backgroundColor: FG_COLOR,
        padding: {
          top: 0,
          bottom: 0,
        },
      }).setOrigin(0, 0);
      menuItem.state = item.state;

      menuItem.setInteractive(new Phaser.Geom.Rectangle(0, 0, menuItem.width, menuItem.height), Phaser.Geom.Rectangle.Contains);

      menuItem.on('pointerover', () => {
        menuItem.setTint(HIGHLIGHT_COLOR);
      });

      menuItem.on('pointerout', () => {
        menuItem.setTint(0xffffff);
      });

      menuItem.on('pointerdown', () => {
        menuItem.y += 2;
        menuItem.x += 2;
      });

      menuItem.on('pointerup', () => {
        menuItem.y -= 2;
        menuItem.x -= 2;
        this.cameras.main.fade(FADE_TIME, 0, 0, 255, false, (camera, progress) => {
          if (progress == 1) this.scene.start(menuItem.state);
        });
      });
    }
  }
}