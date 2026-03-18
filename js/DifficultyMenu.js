class DifficultyMenu extends Menu {

  constructor(config) {
    super({
      key: "difficultymenu"
    });
  }

  init(data) {
    this.title = data.title;
    this.gameScene = data.state;
    this.players = data.players;
  }

  create() {
    const data = {
      title: this.title,
      menuItems: [
        {
          text: "Easy",
          toState: this.gameScene,
          duration: 60 * 2
        },
        {
          text: "Normal",
          toState: this.gameScene,
          duration: 60 * 5
        },
        {
          text: "Hard",
          toState: this.gameScene,
          duration: 60 * 15
        },
        {
          text: "Nightmare",
          toState: this.gameScene,
          duration: -1,
          locked: this.registry.get(this.gameScene),
          subtext: "Unlock by completing the game on Hard"
        },
        {
          text: "←",
          toState: "gamemenu",
          duration: 0
        }
      ]
    };
    for (let item of data.menuItems) {
      item.players = this.players;
    }

    super.create();

    this.createTitle(data.title);

    this.createMenu(data.menuItems);
  }
}