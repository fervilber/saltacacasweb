export default class GameOverScene extends Phaser.Scene {
    constructor() {
        super('GameOverScene');
    }

    init(data) {
        this.finalScore = data.score || 0;
    }

    create() {
        this.add.text(400, 200, 'GAME OVER', { fontSize: '64px', fill: '#f00' }).setOrigin(0.5);
        this.add.text(400, 300, 'Score: ' + this.finalScore, { fontSize: '48px', fill: '#fff' }).setOrigin(0.5);

        const restartButton = this.add.text(400, 450, 'REINTENTAR', { fontSize: '32px', fill: '#fff' })
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', () => this.scene.start('GameScene'));

        const menuButton = this.add.text(400, 520, 'MENU PRINCIPAL', { fontSize: '24px', fill: '#aaa' })
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', () => this.scene.start('MenuScene'));
    }
}
