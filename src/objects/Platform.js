export default class Platform extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'platform');

        // Add to scene and physics
        scene.add.existing(this);
        scene.physics.add.existing(this);

        // Physics properties
        this.body.setAllowGravity(false);
        this.body.setImmovable(true);
        // Important for landing on top
        this.body.checkCollision.down = false;
        this.body.checkCollision.left = false;
        this.body.checkCollision.right = false;

        // Visuals
        this.setScale(0.12); // Much smaller, more like a "patinete"
        this.refreshBody(); // Important after scaling physics objects
    }
}
