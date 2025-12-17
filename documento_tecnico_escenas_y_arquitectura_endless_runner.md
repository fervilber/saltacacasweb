# Documento Técnico – Escenas y Arquitectura

## 1. Objetivo del documento

Este documento técnico define la **arquitectura de escenas**, responsabilidades de cada una y los **principales sistemas de juego** para el endless runner 2D desarrollado con **Phaser 3 + Tiled**. Sirve como guía directa para comenzar la implementación.

---

## 2. Arquitectura general del juego

### Tecnologías
- Motor: **Phaser 3**
- Mapas: **Tiled (JSON)**
- Lenguaje: JavaScript (ES6)
- Plataforma: Navegador web (GitHub Pages)

### Escenas principales
1. **Boot / Preload** (técnica)
2. **MenuScene** (menú inicial y selección de jugador)
3. **GameScene** (juego principal)
4. **GameOverScene** (fin de partida)

---

## 3. Descripción de escenas

## 3.1 BootScene (Preload)

### Responsabilidad
- Cargar todos los recursos necesarios para el juego
- Mostrar una barra o indicador de carga
- Preparar configuraciones globales

### Recursos cargados
- Sprites de jugadores
- Tilesets de suelos y fondos
- Mapas de Tiled
- Sonidos y música
- Fuentes bitmap (si se usan)

### Transición
- Al finalizar la carga → `MenuScene`

---

## 3.2 MenuScene (Inicio y selección de jugador)

### Responsabilidad
- Mostrar pantalla inicial del juego
- Permitir seleccionar personaje jugable
- Seleccionar dificultad inicial
- Mostrar instrucciones básicas

### Funcionalidades
- Lista de personajes disponibles
- Visualización del sprite seleccionado
- Selección de dificultad:
  - **Normal**
  - **Difícil**

### Datos generados
- `selectedPlayerId`
- `difficultyLevel`

Estos datos se almacenan en un objeto global o `registry` de Phaser.

### Transición
- Botón "Jugar" → `GameScene`

---

## 3.3 GameScene (Juego principal)

### Responsabilidad
- Ejecutar el gameplay completo
- Gestionar scroll infinito
- Control del jugador
- Generación de obstáculos y objetos
- Colisiones
- Sistema de puntuación

---

### 3.3.1 Escenario y niveles de dificultad

#### Concepto visual
- El personaje corre por una **calle**
- El fondo y el suelo se desplazan hacia la izquierda

#### Dificultades

**Nivel 1 – Normal**
- Fondo: calle tranquila
- Velocidad base moderada
- Menor densidad de obstáculos

**Nivel 2 – Difícil**
- Fondo: calle urbana más caótica
- Velocidad base mayor
- Más obstáculos y menos frutas

Cada dificultad usa:
- Un tileset de fondo distinto
- Parámetros distintos de velocidad y spawn

---

### 3.3.2 Suelos múltiples

- La escena puede contener **varios niveles de suelo**
- Cada suelo es una plataforma con colisiones
- El jugador puede saltar entre suelos

Implementación:
- Capas de Tiled marcadas como `ground = true`
- Uso de físicas Arcade
- Colisiones activadas por propiedades de tiles

---

### 3.3.3 Personaje jugador

#### Movimiento
- Avance automático
- Control de salto
- Altura de salto variable

#### Estados
- Corriendo
- Saltando
- Cayendo
- Potenciado (fruta)

#### Potenciador (fruta)
- Aumenta temporalmente la fuerza de salto
- Duración limitada
- Indicador visual (opcional)

---

### 3.3.4 Obstáculos

**Obstáculos negativos (suelo):**
- Cacas de perro
- Coches mal aparcados

Características:
- Se desplazan hacia el jugador
- Velocidad variable
- Colisión → fin de partida

---

### 3.3.5 Objetos positivos

**Frutas:**
- Aparecen en distintas alturas
- Colisión → activa potenciador de salto

---

### 3.3.6 Generación de elementos (Spawn System)

- Sistema de generación procedural
- Spawn basado en tiempo o distancia
- Probabilidades según dificultad

Parámetros configurables:
- Frecuencia de obstáculos
- Frecuencia de frutas
- Velocidad global del scroll

---

### 3.3.7 Sistema de puntuación

- Distancia recorrida (principal)
- Bonus por frutas recogidas

La puntuación se incrementa continuamente mientras el jugador sobrevive.

---

## 3.4 GameOverScene

### Responsabilidad
- Mostrar resultado final
- Permitir reiniciar partida
- Volver al menú principal

### Información mostrada
- Puntuación total
- Distancia recorrida
- Personaje usado
- Dificultad

### Transiciones
- "Reintentar" → `GameScene`
- "Menú" → `MenuScene`

---

## 4. Sistemas transversales

### 4.1 Gestión de estado global

Uso de:
- `this.registry` de Phaser

Datos compartidos:
- Personaje seleccionado
- Dificultad
- Configuración de velocidad

---

### 4.2 Control de colisiones

- Arcade Physics
- Grupos:
  - `player`
  - `obstacles`
  - `collectibles`
  - `grounds`

---

### 4.3 Scroll infinito

Implementación:
- Movimiento global hacia la izquierda
- Reposicionamiento o destrucción de elementos fuera de pantalla

---

## 5. Estructura de carpetas (técnica)

```
/assets
  /maps
  /tiles
  /sprites
  /audio
/src
  /scenes
    BootScene.js
    MenuScene.js
    GameScene.js
    GameOverScene.js
  /objects
    Player.js
    Obstacle.js
    Collectible.js
  /systems
    SpawnSystem.js
    ScoreSystem.js
main.js
index.html
```

---

## 6. Flujo de escenas

```
BootScene
   ↓
MenuScene
   ↓
GameScene
   ↓
GameOverScene
   ↺ MenuScene / GameScene
```

---

## 7. Riesgos técnicos identificados

- Gestión de múltiples suelos en scroll
- Balance del potenciador de salto
- Sincronización del spawn con la velocidad
- Escalabilidad del código si se añaden más objetos

---

## 8. Próximos pasos

1. Crear plantilla Phaser con escenas vacías
2. Definir primer mapa base en Tiled
3. Implementar movimiento y salto
4. Añadir un solo obstáculo y una fruta

---

## 9. Notas finales

Este documento técnico es la base para la implementación inicial. Cualquier cambio de alcance debe reflejarse aquí antes de añadirse al código.

