const fs = require('fs');

function readImageSize(filePath) {
    const buffer = fs.readFileSync(filePath);
    let offset = 0;

    // Check if it is a PNG
    if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4E && buffer[3] === 0x47) {
        offset = 8;
        while (offset < buffer.length) {
            const length = buffer.readUInt32BE(offset);
            const type = buffer.toString('ascii', offset + 4, offset + 8);
            if (type === 'IHDR') {
                const width = buffer.readUInt32BE(offset + 8);
                const height = buffer.readUInt32BE(offset + 12);
                console.log(`${width}x${height}`);
                return;
            }
            offset += length + 12;
        }
    } else {
        console.log("Not a valid PNG");
    }
}

readImageSize('D:\\\\PROYECTOS\\\\PROGRMAS\\\\JUEGO01\\\\assets\\\\sprites\\\\eva.png');
