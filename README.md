# SALTACACAS - Endless Runner Game

Un juego web 2D de tipo endless runner desarrollado con Phaser 3.

## 📋 Características

- ✅ Movimiento automático y scroll infinito
- ✅ Sistema de salto con física
- ✅ Controles de velocidad (acelerar/desacelerar)
- ✅ Obstáculos aleatorios (cacas de perro y coches)
- ✅ Coleccionables (frutas) para bonus de puntos
- ✅ Sistema de puntuación
- ✅ Efectos de sonido
- ✅ Pantallas de Menú y Game Over

## 🎮 Controles

- **Saltar**: `Espacio` o `Flecha Arriba`
- **Acelerar**: `Flecha Derecha`
- **Desacelerar**: `Flecha Izquierda`

## 🚀 Instalación y Ejecución

### Opción 1: Servidor local simple

```bash
# Python 3
python -m http.server 8000

# Luego abre http://localhost:8000 en tu navegador
```

### Opción 2: Live Server (VS Code)

1. Instala la extensión "Live Server" en VS Code
2. Haz clic derecho en `index.html`
3. Selecciona "Open with Live Server"

## 🎨 Assets Personalizados (Opcional)

El juego viene con placeholders del laboratorio de Phaser. Para usar los sprites personalizados generados:

1. Copia los siguientes archivos desde la carpeta de artifacts:
   - `player_sprite_*.png` → `assets/sprites/player.png`
   - `obstacle_poop_*.png` → `assets/sprites/poop.png`
   - `obstacle_car_*.png` → `assets/sprites/car.png`
   - `collectible_fruit_*.png` → `assets/sprites/fruit.png`
   - `ground_tile_*.png` → `assets/tiles/ground.png`
   - `background_city_*.png` → `assets/sprites/background.png`

2. Actualiza `src/scenes/BootScene.js` cambiando las URLs de Phaser Labs por rutas locales:

   ```javascript
   this.load.image('background', 'assets/sprites/background.png');
   this.load.image('ground', 'assets/tiles/ground.png');
   // ... etc
   ```

## 📁 Estructura del Proyecto

```
/JUEGO01
├── index.html              # Archivo HTML principal
├── main.js                 # Configuración de Phaser
├── /assets                 # Carpeta de recursos
│   ├── /sprites            # Sprites de jugador, obstáculos, etc.
│   ├── /tiles              # Tiles del suelo
│   └── /audio              # Efectos de sonido
└── /src
    ├── /scenes             # Escenas del juego
    │   ├── BootScene.js
    │   ├── MenuScene.js
    │   ├── GameScene.js
    │   └── GameOverScene.js
    └── /objects            # Clases de objetos
        ├── Player.js
        ├── Obstacle.js
        └── Collectible.js
```

## 🎯 Objetivo del Juego

Sobrevive el mayor tiempo posible esquivando obstáculos (cacas y coches) mientras recoges frutas para aumentar tu puntuación.

## 🛠️ Tecnologías

- **Phaser 3** (Motor de juego)
- **JavaScript ES6** (Módulos)
- **HTML5 Canvas**

## 📝 Próximas Mejoras

- [ ] Múltiples personajes seleccionables
- [ ] Niveles de dificultad
- [ ] Power-ups adicionales
- [ ] Rankings locales
- [ ] Música de fondo

## 📄 Licencia

Proyecto educativo - Libre para uso y modificación.
