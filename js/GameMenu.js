class GameMenu extends Menu {

  constructor(config) {
    super({
      key: "gamemenu"
    });
  }

  create() {
    const data = {
      title: "As Slow As Possible",
      menuItems: [
        {
          text: "Pong",
          title: "Pong",
          state: "pong",
          toState: "difficultymenu"
        },
        {
          text: "Breakout",
          title: "Breakout",
          state: "breakout",
          toState: "difficultymenu"

        },
        {
          text: "Space Invaders",
          title: "Space Invaders",
          state: "spaceinvaders",
          toState: "difficultymenu"

        },
        {
          text: "Missile Command",
          title: "Missile Command",
          state: "missilecommand",
          toState: "difficultymenu"
        }
      ]
    };

    super.create();

    this.createTitle(data.title);

    this.createMenu(data.menuItems);
  }
}