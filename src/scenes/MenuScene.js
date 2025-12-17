export default class MenuScene extends Phaser.Scene {
    constructor() {
        super('MenuScene');
    }

    create() {
        // Add Title
        this.add.text(400, 200, 'SALTACACAS', { fontSize: '64px', fill: '#fff' }).setOrigin(0.5);

        // Add Play Button
        const playButton = this.add.text(400, 400, 'JUGAR', { fontSize: '32px', fill: '#0f0' })
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', () => this.startGame());

        // Hover effects
        playButton.on('pointerover', () => playButton.setStyle({ fill: '#ff0' }));
        playButton.on('pointerout', () => playButton.setStyle({ fill: '#0f0' }));
    }

    startGame() {
        this.scene.start('GameScene');
    }
}
