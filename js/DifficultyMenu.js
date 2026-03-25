
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
          text: "Slow",
          toState: this.gameScene,
          duration: SLOW_DURATION,
          timescale: SLOW_TIMESCALE
        },
        {
          text: "Slower",
          toState: this.gameScene,
          duration: SLOWER_DURATION,
          timescale: SLOWER_TIMESCALE,
          locked: this.registry.get(`${this.gameScene}-slower`),
          subtext: "Unlock by completing the game on Slow"
        },
        {
          text: "Slowest",
          toState: this.gameScene,
          duration: SLOWEST_DURATION,
          timescale: SLOWEST_TIMESCALE,
          locked: this.registry.get(`${this.gameScene}-slowest`),
          subtext: "Unlock by completing the game on Slower"
        },
        {
          text: "As Slow As Possible",
          toState: this.gameScene,
          duration: -1,
          timescale: SLOWEST_TIMESCALE
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

