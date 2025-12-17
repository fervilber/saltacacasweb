export default class Collectible extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'fruit');

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(false);
        this.body.allowGravity = false;

        // Reasonable scale for generated image
        this.setScale(0.03); // Half of 0.06
    }

}
