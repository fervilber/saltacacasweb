import Player from '../objects/Player.js';
import Obstacle from '../objects/Obstacle.js';
import Collectible from '../objects/Collectible.js';
import Platform from '../objects/Platform.js';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    init(data) {
        this.selectedCharacter = data.character || 'sofia'; // Default to sofia if no data provided
    }

    create() {
        // Background
        // Ground - Invisible physics body (Keep this so player doesn't fall)
        this.ground = this.add.rectangle(400, 584, 800, 32, 0x000000, 0);
        this.physics.add.existing(this.ground, true);

        // Background depth - Diagnostic and Fallback
        const bgTexture = this.textures.get('background2');
        const isMissing = (bgTexture.key === '__MISSING' || bgTexture.getSourceImage().width <= 32);

        console.log('Texture key:', bgTexture.key);
        console.log('Is texture missing or mini?', isMissing);

        let finalKey = 'background2';
        if (isMissing) {
            console.warn('Fondo2 no cargó o es inválido. Usando fondo original como fallback.');
            finalKey = 'background';
        }

        const sourceImage = this.textures.get(finalKey).getSourceImage();
        const bgScale = 600 / sourceImage.height;

        this.bg = this.add.tileSprite(400, 300, 800, 600, finalKey);
        this.bg.setTileScale(bgScale, bgScale);
        this.bg.setDepth(0);
        // Speed settings - reduced for better gameplay
        this.gameSpeed = 2; // Was 5, now 2 (slower)
        this.score = 0;

        // Player - position adjusted for Sofia (Visual height ~80px, feet at Y=584)
        this.player = new Player(this, 100, 544, this.selectedCharacter);
        this.player.setDepth(2);

        // Groups
        this.obstacles = this.add.group();
        this.collectibles = this.add.group();
        this.platforms = this.add.group();

        // Collisions
        this.physics.add.collider(this.player, this.ground);
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.overlap(this.player, this.obstacles, this.hitObstacle, null, this);
        this.physics.add.overlap(this.player, this.collectibles, this.collectFruit, null, this);

        // Input
        this.cursors = this.input.keyboard.createCursorKeys();
        this.cursors.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // Touch Jump
        this.input.on('pointerdown', (pointer) => {
            this.player.jump();
        });

        // Spawn Loop for Obstacles
        this.time.addEvent({
            delay: 1500,
            callback: this.spawnObstacle,
            callbackScope: this,
            loop: true
        });

        // Spawn Loop for Collectibles (Frutas)
        this.time.addEvent({
            delay: 2000,
            callback: this.spawnCollectible,
            callbackScope: this,
            loop: true
        });

        // Spawn Loop for Platforms
        this.time.addEvent({
            delay: 3500,
            callback: this.spawnPlatform,
            callbackScope: this,
            loop: true
        });

        // UI
        this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });
        this.add.text(16, 50, 'Controls: Tap/Space to Jump | Left side: Slow | Right side: Fast', { fontSize: '14px', fill: '#000' });

        // Lives System (Stars)
        this.lives = 3;
        this.isInvincible = false;
        this.stars = [];
        for (let i = 0; i < 3; i++) {
            const star = this.add.star(750 - (i * 40), 30, 5, 10, 20, 0xffff00);
            star.setDepth(3);
            star.setStrokeStyle(2, 0x000000);
            this.stars.push(star);
        }

        // Background Music
        if (!this.sound.get('music')) {
            this.bgMusic = this.sound.add('music', { volume: 0.5, loop: true });
            this.bgMusic.play();
        } else if (!this.sound.get('music').isPlaying) {
            this.sound.get('music').play();
        }
    }

    spawnObstacle() {
        if (Phaser.Math.Between(0, 100) > 30) { // 70% chance
            const type = Phaser.Math.RND.pick(['poop', 'car']);
            const obstacle = new Obstacle(this, 850, 560, type);
            obstacle.setDepth(1.5);

            // Assign a random extra speed (between -0.5 and 2.5)
            obstacle.extraSpeed = Phaser.Math.FloatBetween(-0.5, 2.5);

            this.obstacles.add(obstacle);
        }
    }

    spawnCollectible() {
        if (Phaser.Math.Between(0, 100) > 50) { // 50% chance
            const y = Phaser.Math.RND.pick([560, 400, 300]);
            const collectible = new Collectible(this, 850, y);
            collectible.setDepth(1.5);

            // Assign a random extra speed (between -0.2 and 1.0)
            collectible.extraSpeed = Phaser.Math.FloatBetween(-0.2, 1.0);

            this.collectibles.add(collectible);
        }
    }

    spawnPlatform() {
        if (Phaser.Math.Between(0, 100) > 40) { // 60% chance
            const y = Phaser.Math.RND.pick([490, 440, 390]); // Heights above obstacles
            const platform = new Platform(this, 850, y);
            platform.setDepth(1.5);

            // Slightly slower than ground for parallax or keep same for gameplay
            platform.extraSpeed = Phaser.Math.FloatBetween(-0.5, 0.5);

            this.platforms.add(platform);
        }
    }

    hitObstacle(player, obstacle) {
        if (this.isInvincible) return;

        this.sound.play('hit');
        this.lives--;

        // Remove a star
        const lostStar = this.stars.pop();
        if (lostStar) lostStar.destroy();

        if (this.lives > 0) {
            // Temporary Invincibility
            this.isInvincible = true;

            // Flicker effect
            this.tweens.add({
                targets: player,
                alpha: 0,
                duration: 100,
                ease: 'Linear',
                repeat: 9,
                yoyo: true,
                onComplete: () => {
                    player.alpha = 1;
                    this.isInvincible = false;
                }
            });

            // Optional: small bounce or tint
            player.setTint(0xff0000);
            this.time.delayedCall(500, () => player.clearTint());

        } else {
            // Game Over
            this.physics.pause();
            player.setTint(0xff0000);
            player.anims.play('turn');
            // this.sound.play('explosion'); // Audio disabled for now

            // Pause current scene and launch GameOver as overlay
            this.scene.pause();
            this.scene.launch('GameOverScene', { score: Math.floor(this.score) });
        }
    }

    collectFruit(player, fruit) {
        fruit.destroy();
        this.score += 50; // Bonus points
        this.scoreText.setText('Score: ' + Math.floor(this.score));
        // You could play a pickup sound here if loaded
        // this.sound.play('pickup');
    }

    update() {
        if (!this.player.active) return; // Stop if dead

        this.player.update(this.cursors);

        // Update Scroll (Background only now)
        this.bg.tilePositionX += this.gameSpeed * 0.3; // Parallax effect (slow)

        // Update Score
        this.score += this.gameSpeed * 0.01; // Adjust factor as needed
        this.scoreText.setText('Score: ' + Math.floor(this.score));

        // Update Obstacles
        this.obstacles.children.iterate((gameObj) => {
            if (gameObj) {
                // Movement = Base world speed + its own extra speed
                gameObj.x -= (this.gameSpeed + gameObj.extraSpeed);
                if (gameObj.x < -100) { // Slightly more margin for larger sprites
                    gameObj.destroy();
                }
            }
        });
        this.collectibles.children.iterate((gameObj) => {
            if (gameObj) {
                gameObj.x -= (this.gameSpeed + gameObj.extraSpeed);
                if (gameObj.x < -100) {
                    gameObj.destroy();
                }
            }
        });

        // Update Platforms
        this.platforms.children.iterate((gameObj) => {
            if (gameObj) {
                gameObj.x -= (this.gameSpeed + (gameObj.extraSpeed || 0));
                if (gameObj.x < -200) {
                    gameObj.destroy();
                }
            }
        });

        // Speed Control (Improved for Mobile + PC)
        const pointer = this.input.activePointer;
        if (this.cursors.right.isDown || (pointer.isDown && pointer.x > 400)) {
            this.gameSpeed = 5;
        } else if (this.cursors.left.isDown || (pointer.isDown && pointer.x <= 400)) {
            this.gameSpeed = 1;
        } else {
            this.gameSpeed = 2;
        }

        // Fall Check (Immediate Game Over for falling into the abyss)
        if (this.player.y > 600) {
            this.scene.pause();
            this.scene.launch('GameOverScene', { score: Math.floor(this.score) });
        }
    }
}
