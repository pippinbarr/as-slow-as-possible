class DifficultyMenu extends Menu {

  constructor(config) {
    super({
      key: "difficultymenu"
    });
  }

  init(data) {
    this.title = data.title;
    this.gameScene = data.state;
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
          locked: true
        }
      ]
    };

    super.create();

    this.createTitle(data.title);

    this.createMenu(data.menuItems);
  }
}