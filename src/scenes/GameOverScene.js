export default class GameOverScene extends Phaser.Scene {
    constructor() {
        super('GameOverScene');
    }

    init(data) {
        this.finalScore = data.score || 0;
    }

    create() {
        // Add a semi-transparent black overlay to dim the game background
        const bg = this.add.graphics();
        bg.fillStyle(0x000000, 0.7); // 70% opacity black
        bg.fillRect(0, 0, 800, 600);

        this.add.text(400, 200, 'GAME OVER', { fontSize: '64px', fill: '#f00', stroke: '#000', strokeThickness: 4 }).setOrigin(0.5);
        this.add.text(400, 300, 'Score: ' + this.finalScore, { fontSize: '48px', fill: '#fff' }).setOrigin(0.5);

        const restartButton = this.add.text(400, 450, 'REINTENTAR', { fontSize: '32px', fill: '#fff', backgroundColor: '#333', padding: { x: 10, y: 5 } })
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                this.scene.stop('GameOverScene');
                this.scene.start('GameScene');
            });

        const menuButton = this.add.text(400, 520, 'MENU PRINCIPAL', { fontSize: '24px', fill: '#aaa' })
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                this.sound.stopAll(); // Stop music when returning to menu
                this.scene.stop('GameOverScene');
                this.scene.stop('GameScene');
                this.scene.start('MenuScene');
            });
    }
}
