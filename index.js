const Jimp = require('jimp')
    , Colors = require('./colors');

async function main() {
    const Mask = await Jimp.read('mask.png');

    for (const Item of Colors) {

        let Name, Color;

        if (typeof Item === 'object') {
            Name = Item.name || stripHash(Item.color);
            Color = parseInt(stripHash(Item.color), 16);
        } else {
            Name = stripHash(Item)
            Color = parseInt(stripHash(Item), 16);
        }

        const Base = await Jimp.create(512, 512, Color);

        Base.mask(Mask, 0, 0).write(`out/${Name}.png`);
    }
}

function stripHash(s) {
    if (s.indexOf('#') !== -1)
        return `${s.substring(1)}ff`;
    
    return `${s}ff`;
}

main();
