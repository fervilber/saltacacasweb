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

        // Jump state
        this.jumpCount = 0;
        this.canJumpAgain = true;
    }

    initAnimations() {
        if (!this.scene.anims.exists('left')) {
            this.scene.anims.create({
                key: 'left',
                frames: this.scene.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
                frameRate: 10,
                repeat: -1
            });
        }

        if (!this.scene.anims.exists('turn')) {
            this.scene.anims.create({
                key: 'turn',
                frames: [{ key: 'player', frame: 4 }],
                frameRate: 20
            });
        }

        if (!this.scene.anims.exists('right')) {
            this.scene.anims.create({
                key: 'right',
                frames: this.scene.anims.generateFrameNumbers('player', { start: 5, end: 8 }),
                frameRate: 10,
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

        // Jump logic
        const jumpJustPressed = Phaser.Input.Keyboard.JustDown(cursors.up) || Phaser.Input.Keyboard.JustDown(cursors.space);

        if (jumpJustPressed && this.jumpCount < 2) {
            this.setVelocityY(-500); // Jump force
            this.jumpCount++;

            // Optional: feedback visual when jumping in air
            if (this.jumpCount > 1) {
                this.setTint(0x00ff00); // Tint green for a moment?
                this.scene.time.delayedCall(200, () => this.clearTint());
            }

            // this.scene.sound.play('jump'); // Audio disabled for now
        }

        // Horizontal movement and animations
        if (cursors.left.isDown) {
            this.setVelocityX(-160);
            this.anims.play('right', true); // Use right animation but flipped
            this.setFlipX(true);
        } else if (cursors.right.isDown) {
            this.setVelocityX(160);
            this.anims.play('right', true);
            this.setFlipX(false);
        } else {
            this.setVelocityX(0);
            this.anims.play('right', true); // Keep running by default
            // If we want to keep the last direction 	when stopped, we could remove setFlipX(false) here.
            // But usually runner looks forward. Let's keep the last flip state if stopped?
            // Actually, for a runner, looking right is standard.
            this.setFlipX(this.flipX); // Keep current flip state
        }
    }
}
