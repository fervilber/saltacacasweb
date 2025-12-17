export default class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
    }

    preload() {
        // Display loading text
        this.add.text(400, 300, 'Cargando...', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);

        // Load local custom assets
        this.load.image('background', 'assets/sprites/background.png');
        this.load.image('ground', 'assets/tiles/ground.png');
        this.load.image('fruit', 'assets/sprites/fruit.png');
        this.load.image('poop', 'assets/sprites/poop.png');
        this.load.image('car', 'assets/sprites/car.png');

        // Player needs to be a spritesheet for animations, using Phaser Labs version
        this.load.spritesheet('player', 'https://labs.phaser.io/assets/sprites/dude.png', { frameWidth: 32, frameHeight: 48 });

        // Audio removed - causing CORS errors
        // TODO: Add local audio files later

        // Error handling
        this.load.on('loaderror', (file) => {
            console.error('Error loading:', file.src);
        });
    }

    create() {
        this.scene.start('MenuScene');
    }
}
