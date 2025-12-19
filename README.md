# SALTACACAS - Endless Runner Game

Un juego web 2D de tipo endless runner desarrollado con Phaser 3 por la Familia mas enrollada de Murcia.

Cada día yendo al cole tenemos que saltar las cacas de los perros y los coches de la ciudad. Serás tú como nosotros el más valiente de la clase y podrás llegar al colegio sin mierda en los zapatos y sin que te pille un coche?... Pues a jugar Saltacacas!!

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

Este programa no necesita instalación, para jugar simplemente accede a la web:

 [Saltacacas web](https://fervilber.github.io/saltacacasweb/)

 Y ponte a jugar como loco.

### Opción 2: Servidor local simple

Si quieres jugar en local, descarga los ficheros y abre un servidor local web:

```bash
# Python 3
python -m http.server 8000

# Luego abre http://localhost:8000 en tu navegador
```

### Opción 3: Live Server (VS Code)

1. Instala la extensión "Live Server" en VS Code
2. Haz clic derecho en `index.html`
3. Selecciona "Open with Live Server"

## 🎨 Assets Personalizados (Opcional)

los personajes del juego somos nostros Sofía y Eva, si quieres otros, pintalos tí y ponlos en la carpeta *assets/sprites*.

## 📁 Estructura del Proyecto

El juego original lo hicimos en python, pero este es nuestro primer juego completamente web así que vamos a anotar la estructura de carpetas para aprender:

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

Sobrevive el mayor tiempo posible esquivando obstáculos (cacas y coches) mientras recoges frutas para aumentar tu puntuación. Cuanto más dures, y más frutas cojas, más puntos obtienes. Puedes subirte a los patinetes para alcanzar las frutas altas, o esquivar los coches.

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
Hecho en Cieza con amor.
