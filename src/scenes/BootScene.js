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

        // Player Sofia spritesheet (4 frames: 2 left, 2 right)
        this.load.spritesheet('player', 'assets/sprites/sofia.png?v=' + v, { frameWidth: 50, frameHeight: 88 });

        // Audio
        this.load.audio('jump', 'assets/audio/cartoon-jump-6462.mp3');
        this.load.audio('hit', 'assets/audio/uh-ohh-38886.mp3');
        this.load.audio('music', 'assets/audio/hip-hop-rock-beats-118000.mp3');

        // Error handling
        this.load.on('loaderror', (file) => {
            console.error('Error loading:', file.src);
        });
    }

    create() {
        this.scene.start('MenuScene');
    }
}
