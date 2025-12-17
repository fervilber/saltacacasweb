# Product Requirements Document (PRD)

## 1. Visión general

**Nombre provisional del proyecto:** Saltacacas

**Descripción:**
Videojuego 2D de scroll lateral tipo *endless runner*, desarrollado para navegador web usando **Phaser 3** como motor de juego y **Tiled** para la creación de mapas y escenarios. El jugador controla a un personaje que avanza automáticamente mientras el escenario y los obstáculos se desplazan en sentido contrario. El objetivo es sobrevivir el mayor tiempo posible, esquivar obstáculos negativos y recoger objetos positivos para aumentar la puntuación o recibir bonificaciones.

**Plataforma objetivo:**

* Navegadores web modernos (desktop principalmente)
* Distribución vía **GitHub Pages**

---

## 2. Objetivos del proyecto

### Objetivo principal

Crear un prototipo funcional y jugable de un endless runner 2D que sirva como:

* Proyecto de aprendizaje (Phaser + Tiled)
* Base extensible para futuras mejoras
* Juego sencillo publicable en web

### Objetivos secundarios

* Mantener una arquitectura de código clara y escalable
* Separar lógica de juego, renderizado y datos
* Facilitar la iteración rápida sobre niveles y dificultad

---

## 3. Público objetivo

* Jugadores casuales
* Usuarios de navegador (PC)
* Personas interesadas en juegos arcade simples

Nivel de experiencia del jugador: bajo–medio

---

## 4. Alcance (Scope)

### Incluido en la primera versión (MVP)

* Un único personaje jugable
* Scroll lateral infinito
* Sistema de salto
* Velocidad variable (acelerar / desacelerar)
* Obstáculos negativos
* Objetos positivos coleccionables
* Sistema de puntuación y/o distancia
* Colisiones básicas
* Pantalla de inicio
* Pantalla de fin de partida (Game Over)

### Fuera de alcance (por ahora)

* Multijugador
* Rankings online
* Guardado en servidor
* Tienda o monetización
* Historia o narrativa compleja

---

## 5. Mecánicas de juego

### 5.1 Movimiento del jugador

* El personaje avanza automáticamente en el eje X
* Controles:

  * **Saltar:** tecla (ej. barra espaciadora o flecha arriba)
  * **Acelerar:** tecla (ej. flecha derecha)
  * **Reducir velocidad:** tecla (ej. flecha izquierda)

Restricciones:

* El jugador no puede retroceder
* El salto solo se permite cuando el personaje está en el suelo

---

### 5.2 Scroll y escenario

* El escenario se desplaza en sentido contrario al jugador

* Uso de mapas creados en **Tiled**:

  * Capas de fondo (parallax)
  * Capa de suelo
  * Capas decorativas

* El escenario se repite o se genera de forma continua

---

### 5.3 Obstáculos y enemigos

**Objetos negativos:**

* Aparecen periódicamente
* Se desplazan hacia el jugador
* Diferentes velocidades y tamaños
* Colisión → fin de la partida

Ejemplos:

* Barreras
* Enemigos simples
* Huecos o trampas

---

### 5.4 Objetos positivos

**Objetos coleccionables:**

* Se desplazan hacia el jugador
* Pueden estar en distintas alturas
* Al colisionar:

  * Suman puntos
  * Activan bonificaciones temporales

Ejemplos de bonificaciones:

* Multiplicador de puntos
* Invulnerabilidad breve
* Salto mejorado

---

### 5.5 Condiciones de fin de partida

La partida finaliza cuando:

* El jugador colisiona con un objeto negativo
* Se cumple una condición especial (opcional):

  * Tiempo máximo
  * Velocidad mínima

---

## 6. Sistema de puntuación

* **Puntuación principal:**

  * Distancia recorrida

* **Puntuación adicional:**

  * Objetos recogidos
  * Bonificaciones activas

* La puntuación se muestra en tiempo real

---

## 7. Interfaz de usuario (UI)

### Pantalla de inicio

* Título del juego
* Botón "Jugar"
* Instrucciones básicas

### HUD durante la partida

* Puntuación / distancia
* Velocidad actual (opcional)

### Pantalla de Game Over

* Puntuación final
* Distancia alcanzada
* Botón "Reintentar"

---

## 8. Arte y sonido

### Estilo visual

* 2D
* Estilo sencillo / arcade
* Sprites optimizados para web

### Sonido

* Música de fondo en bucle
* Efectos de sonido:

  * Salto
  * Colisión
  * Recoger objeto

Restricciones:

* Audio activado solo tras interacción del usuario

---

## 9. Arquitectura técnica

### Tecnologías

* **Phaser 3** (motor de juego)
* **Tiled** (edición de mapas)
* HTML / CSS / JavaScript
* GitHub Pages (hosting)

### Estructura de carpetas (propuesta)

```
/assets
  /maps
  /tiles
  /sprites
  /audio
/src
  /scenes
  /objects
  /utils
index.html
main.js
```

---

## 10. Rendimiento y compatibilidad

* 60 FPS objetivo
* Compatible con Chrome, Firefox y Edge
* Resolución adaptable (responsive)

---

## 11. Métricas de éxito

* El juego es completamente jugable en navegador
* No hay errores críticos durante una partida estándar
* Controles responden correctamente
* La dificultad aumenta progresivamente

---

## 12. Riesgos y consideraciones

* Complejidad del scroll infinito
* Gestión de colisiones y objetos dinámicos
* Balance de dificultad
* Organización del código desde el inicio

---

## 13. Roadmap inicial

**Fase 1 – Prototipo básico**

* Movimiento
* Scroll
* Salto

**Fase 2 – Gameplay**

* Obstáculos
* Coleccionables
* Colisiones

**Fase 3 – Pulido**

* UI
* Sonido
* Ajustes de dificultad

---

## 14. Notas finales

Este PRD define la base del proyecto. Cualquier funcionalidad adicional deberá evaluarse en función del impacto en la simplicidad, rendimiento y alcance del juego.
