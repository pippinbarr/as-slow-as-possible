class Controls {
    constructor(scene) {
        this.scene = scene;
        this.left = 0;
        this.right = 0;
        this.fire = 0;
    }

    update() {
        this.reset();

        if (Phaser.Input.Keyboard.JustDown(this.scene.cursors.space)) {
            this.fire = 1;
        }

        if (this.scene.cursors.left.isDown) {
            this.left = 1;
            return;
        }

        if (this.scene.cursors.right.isDown) {
            this.right = 1;
            return;
        }
    }

    reset() {
        this.left = this.right = this.fire = 0;
    }
}