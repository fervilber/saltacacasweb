export default class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
    }

    preload() {
        // Display loading text
        this.add.text(400, 300, 'Cargando...', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);

        // Load local custom assets
        const v = Date.now(); // Cache buster
        this.load.image('background', 'assets/sprites/background.png?v=' + v);
        this.load.image('background2', 'assets/sprites/fondo2.png?v=' + v);
        this.load.image('fruit', 'assets/sprites/fruit.png?v=' + v);
        this.load.image('poop', 'assets/sprites/poop.png?v=' + v);
        this.load.image('car', 'assets/sprites/car.png?v=' + v);
        this.load.image('platform', 'assets/sprites/platform.png?v=' + v);

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
