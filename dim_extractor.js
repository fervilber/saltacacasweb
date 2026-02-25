const fs = require('fs');
const path = 'd:/PROYECTOS/PROGRMAS/JUEGO01/assets/sprites/eva.png';
const buffer = fs.readFileSync(path);
let width = 0;
let height = 0;

// Read width (offset 16) and height (offset 20) from IHDR chunk
width = buffer.readUInt32BE(16);
height = buffer.readUInt32BE(20);

fs.writeFileSync('d:/PROYECTOS/PROGRMAS/JUEGO01/out.txt', width + 'x' + height);
