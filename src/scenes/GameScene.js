import Player from '../objects/Player.js';
import Obstacle from '../objects/Obstacle.js';
import Collectible from '../objects/Collectible.js';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    create() {
        // Background
        // Ground
        this.ground = this.add.rectangle(400, 584, 800, 32, 0x000000, 0);
        this.physics.add.existing(this.ground, true);
        this.groundSprite = this.add.tileSprite(400, 568, 800, 64, 'ground').setScale(2);
        this.groundSprite.setDepth(1);

        // Background depth
        let bg = this.add.image(400, 300, 'background');
        bg.setDepth(0);
        // Speed settings - reduced for better gameplay
        this.gameSpeed = 2; // Was 5, now 2 (slower)
        this.score = 0;

        // Player - position on the ground (Y=536 so feet touch ground at Y=584)
        this.player = new Player(this, 100, 536);
        this.player.setDepth(2);

        // Obstacles Group
        this.obstacles = this.add.group();
        this.collectibles = this.add.group();

        // Collisions
        this.physics.add.collider(this.player, this.ground);
        this.physics.add.overlap(this.player, this.obstacles, this.hitObstacle, null, this);
        this.physics.add.overlap(this.player, this.collectibles, this.collectFruit, null, this);

        // Input
        this.cursors = this.input.keyboard.createCursorKeys();
        this.cursors.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // Spawn Loop for Obstacles
        this.time.addEvent({
            delay: 1500,
            callback: this.spawnObstacle,
            callbackScope: this,
            loop: true
        });

        // Spawn Loop for Collectibles
        this.time.addEvent({
            delay: 2000,
            callback: this.spawnCollectible,
            callbackScope: this,
            loop: true
        });

        // UI
        this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });
        this.add.text(16, 50, 'Controls: Space/Up to Jump, Right: Fwd, Left: Slow', { fontSize: '14px', fill: '#000' });
    }

    spawnObstacle() {
        if (Phaser.Math.Between(0, 100) > 30) { // 70% chance
            const type = Phaser.Math.RND.pick(['poop', 'car']);
            const obstacle = new Obstacle(this, 850, 560, type);
            obstacle.setDepth(1.5);
            this.obstacles.add(obstacle);
        }
    }

    spawnCollectible() {
        if (Phaser.Math.Between(0, 100) > 50) { // 50% chance
            const y = Phaser.Math.RND.pick([560, 400, 300]);
            const collectible = new Collectible(this, 850, y);
            collectible.setDepth(1.5);
            this.collectibles.add(collectible);
        }
    }

    hitObstacle(player, obstacle) {
        this.physics.pause();
        player.setTint(0xff0000);
        player.anims.play('turn');
        // this.sound.play('explosion'); // Audio disabled for now
        this.scene.start('GameOverScene', { score: Math.floor(this.score) });
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

        // Update Scroll
        this.groundSprite.tilePositionX += this.gameSpeed;

        // Update Score
        this.score += this.gameSpeed * 0.01; // Adjust factor as needed
        this.scoreText.setText('Score: ' + Math.floor(this.score));

        // Update Obstacles
        this.obstacles.children.iterate((gameObj) => {
            if (gameObj) {
                gameObj.x -= this.gameSpeed;
                if (gameObj.x < -50) {
                    gameObj.destroy();
                }
            }
        });
        this.collectibles.children.iterate((gameObj) => {
            if (gameObj) {
                gameObj.x -= this.gameSpeed;
                if (gameObj.x < -50) {
                    gameObj.destroy();
                }
            }
        });

        // Speed Control (reduced values)
        if (this.cursors.right.isDown) {
            this.gameSpeed = 5; // Was 10
        } else if (this.cursors.left.isDown) {
            this.gameSpeed = 1; // Was 2
        } else {
            this.gameSpeed = 2; // Was 5
        }

        // Fall Check
        if (this.player.y > 600) {
            this.scene.start('GameOverScene', { score: Math.floor(this.score) });
        }
    }
}
