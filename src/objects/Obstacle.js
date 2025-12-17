export default class Obstacle extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, type = 'poop') {
        super(scene, x, y, type);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(false);
        this.body.allowGravity = false;

        // Reasonable scale for generated images
        if (type === 'car') {
            this.setScale(0.03); // Half of 0.1
        } else if (type === 'poop') {
            this.setScale(0.02); // Half of 0.08
        }

        // Refresh body after scaling
        this.refreshBody();
    }

}
