class Tetris extends Game {

    constructor(config) {
        super({
            key: "tetris"
        });

        this.piecesData = [
            [
                [
                    "0110",
                    "0110",
                    "0000",
                    "0000"
                ],
            ],

            [
                [
                    "000",
                    "111",
                    "100"
                ],
                [
                    "010",
                    "010",
                    "011"
                ],
                [
                    "001",
                    "111",
                    "000"
                ],
                [
                    "110",
                    "010",
                    "010"
                ],

            ]
        ];
    }

    create() {
        super.create();

        this.tileSize = 32;

        this.currentPiece = this.spawnPiece(this.width / 2, 0);

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update(time, delta) {
        this.handleInput();

        this.currentPiece.incY(0.001 * delta);
        this.currentPiece.y += 0.001 * delta;
    }

    handleInput() {
        // Handles keyboard/touch
        if (Phaser.Input.Keyboard.JustDown(this.cursors.left)) {
            this.currentPiece.incX(-this.tileSize);
            this.currentPiece.x -= this.tileSize;
        }
        else if (Phaser.Input.Keyboard.JustDown(this.cursors.right)) {
            this.currentPiece.incX(this.tileSize);
            this.currentPiece.x += this.tileSize;
        }
        else if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
            this.rotatePiece(-1);
        }
        else if (Phaser.Input.Keyboard.JustDown(this.cursors.down)) {
            this.rotatePiece(1);
        }
    }

    rotatePiece(dir) {
        let newIndex = this.currentPiece.pieceTypeDataIndex + dir;
        console.log(newIndex);
        if (newIndex < 0) {
            newIndex = this.currentPiece.pieceTypeData.length - 1;
        }
        else if (newIndex >= this.currentPiece.pieceTypeData.length) {
            newIndex = 0;
        }
        const newData = [...this.currentPiece.pieceTypeData[newIndex]];
        let i = 0;
        let blocks = this.currentPiece.getChildren();
        for (let y = 0; y < newData.length; y++) {
            for (let x = 0; x < newData[y].length; x++) {
                if (newData[y].charAt(x) === "1") {
                    const block = blocks[i];
                    block.x = this.currentPiece.x + x * this.tileSize;
                    block.y = this.currentPiece.y + y * this.tileSize;
                    i++;
                }
            }
        }
        this.currentPiece.pieceTypeDataIndex = newIndex;
    }

    spawnPiece(startX, startY) {
        const piece = this.physics.add.group();
        const pieceTypeData = Phaser.Math.RND.pick(this.piecesData);
        const pieceTypeDataIndex = Math.floor(Math.random() * pieceTypeData.length);
        const pieceData = pieceTypeData[pieceTypeDataIndex];

        for (let y = 0; y < pieceData.length; y++) {
            for (let x = 0; x < pieceData[y].length; x++) {
                if (pieceData[y].charAt(x) === "1") {
                    const block = piece.create(startX + x * this.tileSize, startY + y * this.tileSize, 'particle')
                        .setScale(this.tileSize)
                        .setTint(0x6666ff)
                }
            }
        }
        // piece.setVelocity(0, 10);

        piece.x = startX;
        piece.y = startY;
        piece.pieceTypeDataIndex = pieceTypeDataIndex;
        piece.pieceTypeData = pieceTypeData;

        return piece;
    }

    createBlock() {
        const block = this.physics.add.image(this.width / 2, 0, 'particle')
            .setScale(this.tileSize);
        return block;
    }
}