class GameMenu extends Menu {

  constructor(config) {
    super({
      key: "gamemenu"
    });
  }

  create() {
    this.input.setDefaultCursor('default');

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
          text: "Missile Command",
          title: "Missile Command",
          state: "missilecommand",
          toState: "difficultymenu"
        }
      ]
    };

    super.create();

    // Load data
    // localStorage.removeItem("as-slow-as-possible-data")
    const playerDataString = localStorage.getItem("as-slow-as-possible-data");

    const playerData = JSON.parse(playerDataString);
    if (playerData) {
      this.registry.set(playerData);
    }
    else {
      const freshData = {
        pong: true,
        missilecommand: true,
        breakout: true,
        spaceinvaders: true
      };
      this.registry.set(freshData);
      localStorage.setItem("as-slow-as-possible-data", JSON.stringify(freshData))
    }

    this.createTitle(data.title);

    this.createMenu(data.menuItems);
  }
}