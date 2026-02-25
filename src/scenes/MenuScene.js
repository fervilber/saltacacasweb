export default class MenuScene extends Phaser.Scene {
    constructor() {
        super('MenuScene');
    }

    create() {
        // Add Title
        this.add.text(400, 100, 'SALTACACAS', { fontSize: '64px', fill: '#fff' }).setOrigin(0.5);
        this.add.text(400, 160, 'Un juego como la vida misma', { fontSize: '14px', fill: '#0cadedff' }).setOrigin(0.5);

        // High Score
        const highScore = localStorage.getItem('saltacacas_highscore') || 0;
        this.add.text(400, 210, `Mejor Puntuación: ${highScore}`, { fontSize: '20px', fill: '#ffcc00' }).setOrigin(0.5);

        this.add.text(400, 280, 'Selecciona tu personaje:', { fontSize: '24px', fill: '#FFF' }).setOrigin(0.5);

        // Character Options
        const characters = [
            { key: 'sofia', frame: 2, name: 'Sofia', scale: 1 },
            { key: 'eva', frame: 3, name: 'Eva', scale: 0.4 } // Custom scales for the menu display so they fit nicely
        ];

        this.selectedCharacter = 'sofia'; // Default

        // Create a visual indicator for selection
        this.selectionBox = this.add.rectangle(0, 360, 120, 160, 0x555555, 0.5);

        // Render characters
        const startX = 300;
        const spacing = 200;

        characters.forEach((char, index) => {
            const x = startX + (index * spacing);

            // Draw character sprite
            const sprite = this.add.sprite(x, 380, char.key, char.frame).setInteractive();
            sprite.setScale(char.scale);

            // Draw character name
            this.add.text(x, 470, char.name, { fontSize: '20px', fill: '#fff' }).setOrigin(0.5);

            // Selection Logic
            sprite.on('pointerdown', () => {
                this.selectedCharacter = char.key;
                this.selectionBox.x = x; // Move highlighter
            });

            // Set initial box position
            if (char.key === this.selectedCharacter) {
                this.selectionBox.x = x;
            }

            // Hover effect
            sprite.on('pointerover', () => sprite.setTint(0xcccccc));
            sprite.on('pointerout', () => sprite.clearTint());
        });

        // Add Play Button
        const playButton = this.add.text(400, 530, 'JUGAR', { fontSize: '32px', fill: '#0f0', backgroundColor: '#333', padding: { x: 20, y: 10 } })
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', () => this.startGame());

        // Hover effects
        playButton.on('pointerover', () => playButton.setStyle({ fill: '#ff0' }));
        playButton.on('pointerout', () => playButton.setStyle({ fill: '#0f0' }));
    }

    startGame() {
        this.scene.start('GameScene', { character: this.selectedCharacter });
    }
}
