export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, textureKey = 'sofia') {
        super(scene, x, y, textureKey);

        this.textureKey = textureKey;
        this.scene = scene;

        // Character definitions
        this.charConfigs = {
            'sofia': { frameCount: 4, runFrames: [0, 1, 2, 3], idleFrame: 2, height: 88, targetHeight: 80 },
            'eva': { frameCount: 7, runFrames: [0, 1, 2, 3, 4, 5, 6], idleFrame: 3, height: 322, targetHeight: 80 }
        };

        const charConfig = this.charConfigs[this.textureKey] || this.charConfigs['sofia'];

        // Add to scene and physics
        scene.add.existing(this);
        scene.physics.add.existing(this);

        // Physics properties
        this.setCollideWorldBounds(true);
        this.setGravityY(300);

        this.baseVelocity = 200;

        this.initAnimations(charConfig);

        // Dynamic Visual Scale to match 80px target height
        const scaleFactor = charConfig.targetHeight / charConfig.height;
        this.setScale(scaleFactor);
        this.refreshBody();

        // Jump state
        this.jumpCount = 0;
        this.canJumpAgain = true;
    }

    initAnimations(config) {
        const animLeftKey = `${this.textureKey}_left`;
        const animRightKey = `${this.textureKey}_right`;
        const animTurnKey = `${this.textureKey}_turn`;

        if (!this.scene.anims.exists(animRightKey)) {
            // Simplified: we use all frames (or run set) for running to keep it engaging.
            this.scene.anims.create({
                key: animRightKey,
                frames: this.scene.anims.generateFrameNumbers(this.textureKey, { frames: config.runFrames }),
                frameRate: config.frameCount > 4 ? 10 : 6,
                repeat: -1
            });
        }
        // Instead of duplicating left rules, we use flipX in update()

        if (!this.scene.anims.exists(animTurnKey)) {
            this.scene.anims.create({
                key: animTurnKey,
                frames: [{ key: this.textureKey, frame: config.idleFrame }],
                frameRate: 20
            });
        }
    }

    update(cursors) {
        // Reset jump count when on ground
        if (this.body.blocked.down) {
            this.jumpCount = 0;
            this.canJumpAgain = true;
        }

        // Keyboard Jump
        const jumpJustPressed = Phaser.Input.Keyboard.JustDown(cursors.up) || Phaser.Input.Keyboard.JustDown(cursors.space);
        if (jumpJustPressed) {
            this.jump();
        }

        const animRightKey = `${this.textureKey}_right`;

        // Horizontal movement and animations
        if (cursors.left.isDown) {
            this.setVelocityX(-160);
            this.anims.play(animRightKey, true);
            this.setFlipX(true);
        } else if (cursors.right.isDown) {
            this.setVelocityX(160);
            this.anims.play(animRightKey, true);
            this.setFlipX(false);
        } else {
            this.setVelocityX(0);
            this.anims.play(animRightKey, true);
            // maintain flip direction
        }
    }

    jump() {
        if (this.jumpCount < 2) {
            this.setVelocityY(-500);
            this.jumpCount++;

            if (this.jumpCount > 1) {
                this.setTint(0x00ff00);
                this.scene.time.delayedCall(200, () => this.clearTint());
            }

            this.scene.sound.play('jump');
        }
    }
}
