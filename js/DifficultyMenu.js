const EASY_DURATION = 3 * 60;
const NORMAL_DURATION = 7 * 60;
const HARD_DURATION = 20 * 60;

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
          duration: EASY_DURATION
        },
        {
          text: "Normal",
          toState: this.gameScene,
          duration: NORMAL_DURATION
        },
        {
          text: "Hard",
          toState: this.gameScene,
          duration: HARD_DURATION
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