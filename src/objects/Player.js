export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'player');

        // Add to scene and physics
        scene.add.existing(this);
        scene.physics.add.existing(this);

        // Physics properties
        this.setCollideWorldBounds(true);
        this.setGravityY(300); // Additional gravity if needed, or rely on world gravity

        // Stats
        this.baseVelocity = 200; // The continuous forward speed (if we moved the player, but here we likely move the world)
        // Note: In endless runners, often the player stays X-static and world moves. 
        // But the PRD says "Player advances automatically", and "Obstacles move towards player".
        // Usually visuals: Player X is static (or wobbles), World moves Left.
        // PRD 5.1: "El personaje avanza automáticamente en el eje X".
        // PRD 5.2: "El escenario se desplaza en sentido contrario".
        // This usually means relative motion. 
        // IF player moves X, camera must follow. IF world moves, Player X stays.
        // Let's stick to standard Endless Runner: Player X is mostly fixed, world moves left. 
        // "Acelerar" means world moves faster? Or player moves right on screen?
        // Let's implement Player moving X for now to match "avanza en el eje X", 
        // but typically we scroll background. Let's make the player have a running animation 
        // and handle specific "speed" logic in GameScene or here.

        // Let's implement standard "World Scroll" logic, so Player stays relatively at same X,
        // but can move slightly forward/back with Accel/Decel keys if authorized, 
        // OR simply Accel/Decel changes the SCROLL SPEED.
        // PRD says: "Acelerar: tecla (flecha derecha)".

        // For this task (Player Movement), I will handle:
        // 1. Animations
        // 2. Jump

        this.initAnimations();

        // Visual Scale for Sofia (Original 88px height -> 0.9 scale = ~79px)
        this.setScale(0.9);
        this.refreshBody();

        // Jump state
        this.jumpCount = 0;
        this.canJumpAgain = true;
    }

    initAnimations() {
        if (!this.scene.anims.exists('left')) {
            this.scene.anims.create({
                key: 'left',
                frames: this.scene.anims.generateFrameNumbers('player', { start: 0, end: 1 }),
                frameRate: 6,
                repeat: -1
            });
        }

        if (!this.scene.anims.exists('turn')) {
            this.scene.anims.create({
                key: 'turn',
                frames: [{ key: 'player', frame: 2 }],
                frameRate: 20
            });
        }

        if (!this.scene.anims.exists('right')) {
            this.scene.anims.create({
                key: 'right',
                frames: this.scene.anims.generateFrameNumbers('player', { start: 2, end: 3 }),
                frameRate: 6,
                repeat: -1
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

        // Horizontal movement and animations
        if (cursors.left.isDown) {
            this.setVelocityX(-160);
            this.anims.play('right', true);
            this.setFlipX(true);
        } else if (cursors.right.isDown) {
            this.setVelocityX(160);
            this.anims.play('right', true);
            this.setFlipX(false);
        } else {
            this.setVelocityX(0);
            this.anims.play('right', true);
            this.setFlipX(this.flipX);
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
