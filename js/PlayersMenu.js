class PlayersMenu extends Menu {

    constructor(config) {
        super({
            key: "playersmenu"
        });
    }

    create() {
        this.input.setDefaultCursor('default');

        const data = {
            title: "Pong",
            menuItems: [
                {
                    text: "One player",
                    title: "Pong (1P)",
                    state: "pong",
                    toState: "difficultymenu",
                    players: 1
                },
                {
                    text: "Two players",
                    title: "Pong (2P)",
                    state: "pong",
                    toState: "difficultymenu",
                    players: 2

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