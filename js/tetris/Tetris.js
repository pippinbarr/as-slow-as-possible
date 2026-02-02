/**
 * Tetris version from here: https://github.com/onigetoc/tetris
 */

class Tetris extends Game {
    constructor(config) {
        super({
            key: "tetris"
        });
    }

    // Préchargement des ressources audio
    preload() {
        // this.load.audio('bgMusic', 'mp3/tetris_theme.mp3');
        // this.load.audio('startSound', 'mp3/next-level.mp3');
        // this.load.audio('landSound', 'mp3/land.mp3');
        // this.load.audio('clearLineSound', 'mp3/clear.mp3');
        // this.load.audio('gameOverSound', 'mp3/game-over.mp3');
    }

    // Création des éléments du jeu
    create() {
        // Ajout des sons
        // this.bgMusic = this.sound.add('bgMusic', { loop: true });
        // this.startSound = this.sound.add('startSound');
        // this.landSound = this.sound.add('landSound');
        // this.clearLineSound = this.sound.add('clearLineSound');
        // this.gameOverSound = this.sound.add('gameOverSound');

        // Initialisation des dimensions du plateau
        this.boardWidth = 10;
        this.boardHeight = 20;
        this.blockSize = 37.5; // Ajusté pour s'adapter à la nouvelle largeur (450 / 12)

        // Création du plateau de jeu
        this.board = Array(this.boardHeight).fill().map(() => Array(this.boardWidth).fill(0));

        // Calcul des dimensions et position du plateau
        const gameAreaWidth = this.boardWidth * this.blockSize;
        const gameAreaHeight = this.boardHeight * this.blockSize;
        const gameAreaX = (this.game.config.width - gameAreaWidth) / 2;
        const gameAreaY = (this.game.config.height - gameAreaHeight) / 2;
        this.add.rectangle(gameAreaX, gameAreaY, gameAreaWidth, gameAreaHeight, 0x000000).setOrigin(0);

        // Création des graphiques pour dessiner les pièces
        this.graphics = this.add.graphics();
        this.graphics.setX(gameAreaX);
        this.graphics.setY(gameAreaY);

        // Initialisation des variables de jeu
        this.currentPiece = null;
        this.score = 0;
        this.scoreText = this.add.text(this.game.config.width - 50, 30, 'Score: 0', { font: "18px Arial", fill: '#fff' })
            .setOrigin(1, 0);

        // Création des boutons et instructions
        // this.createPlayButton();
        // this.createInstructions();

        this.startGame();
    }

    // Création du bouton de jeu
    createPlayButton() {
        this.playButton = this.add.text(this.game.config.width / 2, this.game.config.height / 2, 'PLAY', {
            font: "28px Arial",
            fill: '#fff',
            backgroundColor: '#00FF00',
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5).setInteractive();

        this.playButton.setStyle({ backgroundColor: '#00FF00', borderRadius: '10px' });

        this.playButton.on('pointerdown', () => {
            this.startGame();
        });
    }

    // Création des instructions de jeu
    createInstructions() {
        const instructions = [
            'CONTROLS:',
            '* Left Arrow (←): Move the Tetrimino left.',
            '* Right Arrow (→): Move the Tetrimino right.',
            '* Up Arrow (↑): Rotate the Tetrimino clockwise.',
            '* Down Arrow (↓): Move the Tetrimino down faster.\n',
            '* Spacebar: Drop the Tetrimino instantly to the bottom.'
        ];

        const instructionsText = this.add.text(this.game.config.width / 2, this.game.config.height / 2 + 70, instructions, {
            font: '15px Arial',
            fill: '#fff',
            align: 'left',
            lineSpacing: 10,
            wordWrap: {
                width: 320,
                useAdvancedWrap: true
            }

        }).setOrigin(0.5, 0);

        this.instructionsText = instructionsText;
    }

    // Démarrage du jeu
    startGame() {
        if (this.playButton) {
            this.playButton.destroy();
            this.instructionsText.destroy();
        }
        // this.startSound.play();
        this.spawnPiece();
        // console.log(this.currentPiece);

        setTimeout(() => {

            // setTimeout(() => { this.bgMusic.play(); }, 900);
            // this.bgMusic.play();
            // }, 1500);

            // Ajout des contrôles clavier
            this.input.keyboard.on('keydown-LEFT', () => this.movePiece(-1, 0));
            this.input.keyboard.on('keydown-RIGHT', () => this.movePiece(1, 0));
            // this.input.keyboard.on('keydown-DOWN', () => this.movePiece(0, 1));
            this.input.keyboard.on('keydown-UP', () => this.rotatePiece());
            // this.input.keyboard.on('keydown-SPACE', () => this.dropPiece());

            // Timer pour faire descendre les pièces
            // this.dropTimer = this.time.addEvent({
            //     delay: 1000,
            //     callback: this.moveDown,
            //     callbackScope: this,
            //     loop: true
            // });
        }, 500);
    }

    // Apparition d'une nouvelle pièce
    spawnPiece() {
        const pieces = [
            { shape: [[1, 1, 1, 1]], color: 0x00FFFF },
            { shape: [[1, 1], [1, 1]], color: 0xFFFF00 },
            { shape: [[1, 1, 1], [0, 1, 0]], color: 0x800080 },
            { shape: [[1, 1, 1], [1, 0, 0]], color: 0xFF8000 },
            { shape: [[1, 1, 1], [0, 0, 1]], color: 0x0000FF },
            { shape: [[1, 1, 0], [0, 1, 1]], color: 0x00FF00 },
            { shape: [[0, 1, 1], [1, 1, 0]], color: 0xFF0000 }
        ];

        const randomPiece = Phaser.Utils.Array.GetRandom(pieces);
        this.currentPiece = {
            shape: randomPiece.shape,
            color: randomPiece.color,
            x: Math.floor(this.boardWidth / 2) - 1,
            y: 0,
            dy: 0
        };

        if (this.checkCollision()) {
            this.gameOver();
        }
    }

    dropPiece() {
        while (!this.checkCollision()) {
            this.currentPiece.y++;
        }
        this.currentPiece.y--;
        this.lockPiece();
        this.clearLines();
        this.spawnPiece();
    }

    // Déplacement de la pièce
    movePiece(dx, dy) {
        console.log(this.currentPiece.dy);
        this.currentPiece.x += dx;

        this.currentPiece.dy += 0.1;

        if (this.currentPiece.dy >= 1) {
            this.currentPiece.dy = 0;
            this.currentPiece.y += 1;
        }

        if (this.checkCollision()) {
            this.currentPiece.x -= dx;
            this.currentPiece.y -= dy;
            this.currentPiece.dy = 0;
            if (dy > 0) {
                // this.landSound.play();
                this.lockPiece();
                this.clearLines();
                this.spawnPiece();
            }
        }
        this.drawPiece();
    }

    moveDown() {
        this.movePiece(0, 1);
    }

    rotatePiece() {
        const originalShape = this.currentPiece.shape;
        const originalX = this.currentPiece.x;
        const originalY = this.currentPiece.y;
        const rotated = this.currentPiece.shape[0].map((_, i) =>
            this.currentPiece.shape.map(row => row[i]).reverse()
        );
        this.currentPiece.shape = rotated;
        const kicks = this.getWallKicks(originalShape, this.currentPiece.shape);
        for (const [dx, dy] of kicks) {
            this.currentPiece.x += dx;
            this.currentPiece.y += dy;
            if (!this.checkCollision()) {
                this.drawPiece();
                return;
            }
            this.currentPiece.x -= dx;
            this.currentPiece.y -= dy;
        }
        this.currentPiece.shape = originalShape;
        this.currentPiece.x = originalX;
        this.currentPiece.y = originalY;
    }

    getWallKicks(oldShape, newShape) {
        return [
            [0, 0],
            [-1, 0],
            [1, 0],
            [0, -1],
            [-1, -1],
            [1, -1],
            [0, 1],
        ];
    }

    // Vérification des collisions
    checkCollision() {
        for (let y = 0; y < this.currentPiece.shape.length; y++) {
            for (let x = 0; x < this.currentPiece.shape[y].length; x++) {
                if (this.currentPiece.shape[y][x]) {
                    const boardX = this.currentPiece.x + x;
                    const boardY = this.currentPiece.y + y;
                    if (boardX < 0 || boardX >= this.boardWidth || boardY >= this.boardHeight || (boardY >= 0 && this.board[boardY][boardX])) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    lockPiece() {
        for (let y = 0; y < this.currentPiece.shape.length; y++) {
            for (let x = 0; x < this.currentPiece.shape[y].length; x++) {
                if (this.currentPiece.shape[y][x]) {
                    const boardX = this.currentPiece.x + x;
                    const boardY = this.currentPiece.y + y;
                    if (boardY >= 0) {
                        this.board[boardY][boardX] = this.currentPiece.color;
                    }
                }
            }
        }
        // this.landSound.play();
    }

    clearLines() {
        let linesCleared = 0;
        for (let y = this.boardHeight - 1; y >= 0; y--) {
            if (this.board[y].every(cell => cell !== 0)) {
                this.board.splice(y, 1);
                this.board.unshift(Array(this.boardWidth).fill(0));
                y++;
                linesCleared++;
            }
        }
        if (linesCleared > 0) {
            // this.clearLineSound.play();
            this.updateScore(linesCleared);
        }
    }

    updateScore(linesCleared) {
        const points = [0, 100, 300, 500, 800][linesCleared];
        this.score += points;
        this.scoreText.setText(`Score: ${this.score}`);
    }

    // Dessin de la pièce actuelle
    drawPiece() {
        this.graphics.clear();

        for (let y = 0; y < this.boardHeight; y++) {
            for (let x = 0; x < this.boardWidth; x++) {
                if (this.board[y][x]) {
                    this.graphics.fillStyle(this.board[y][x]);
                    this.graphics.fillRect(x * this.blockSize, y * this.blockSize, this.blockSize - 1, this.blockSize - 1);
                }
            }
        }

        if (this.currentPiece) {
            this.graphics.fillStyle(this.currentPiece.color);
            for (let y = 0; y < this.currentPiece.shape.length; y++) {
                for (let x = 0; x < this.currentPiece.shape[y].length; x++) {
                    if (this.currentPiece.shape[y][x]) {
                        const boardX = this.currentPiece.x + x;
                        const boardY = this.currentPiece.y + y;
                        this.graphics.fillRect(boardX * this.blockSize, boardY * this.blockSize, this.blockSize - 1, this.blockSize - 1);
                    }
                }
            }
        }
    }

    gameOver() {
        // this.bgMusic.stop();
        // this.gameOverSound.play();
        this.dropTimer.remove();
        this.input.keyboard.removeAllListeners();

        this.gameOverBackground = this.add.rectangle(0, 0, this.game.config.width, this.game.config.height, 0x000000, 0.7).setOrigin(0);

        this.gameOverText = this.add.text(this.game.config.width / 2, this.game.config.height / 2 - 50, 'Game Over', { font: "32px Arial", fill: '#fff' }).setOrigin(0.5);

        this.replayButton = this.add.text(this.game.config.width / 2, this.game.config.height / 2 + 50, 'REPLAY', {
            font: "28px Arial",

            fill: '#fff',
            backgroundColor: '#00FF00',
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5).setInteractive();

        this.replayButton.setStyle({ backgroundColor: '#00FF00', borderRadius: '10px' });

        this.replayButton.on('pointerdown', () => {
            this.resetGame();
        });
    }

    resetGame() {

        if (this.gameOverBackground) this.gameOverBackground.destroy();
        if (this.gameOverText) this.gameOverText.destroy();
        if (this.replayButton) this.replayButton.destroy();

        this.board = Array(this.boardHeight).fill().map(() => Array(this.boardWidth).fill(0));
        this.score = 0;
        this.scoreText.setText('Score: 0');
        this.graphics.clear();

        this.startGame();
    }

    update() {
        this.moveDown();
        this.drawPiece();
    }
}