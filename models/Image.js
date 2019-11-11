const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Counter = require('./Counter');

const ImageSchema = new Schema({
    url: String, 
    contentType: String,
    zone: { type: [Number], required: true },
    filled: { type: Boolean, default: false },
    top: {
        id: { type: Schema.ObjectId },
        url: { type: String }
    },
    right: {
        id: { type: Schema.ObjectId },
        url: { type: String }
    },
    left: {
        id: { type: Schema.ObjectId },
        url: { type: String }
    },
    bottom: {
        id: { type: Schema.ObjectId },
        url: { type: String }
    },
}, { timestamps: true });

// insert blank documents for adjacent squares
ImageSchema.pre('save', async function(next) {
    const document = this; // filled square
    const adjacentSquares = { // get zones for adjacent squares
        top: document.zone[0] > 0 ? [document.zone[0] - 1, document.zone[1]] : null,
        right: [document.zone[0], document.zone[1] + 1],
        left: document.zone[1] > 0 ? [document.zone[0], document.zone[1] - 1] : null,
        bottom: [document.zone[0] + 1, document.zone[1]]
    };

    // process each new adjacent square
    const adjacentSquarePositions = Object.keys(adjacentSquares);
    const savedImage = { id: document.id, url: document.url };
    for (let i = 0; i < adjacentSquarePositions.length; i++) {
        const currentPos = adjacentSquarePositions[i]; 
        if (!adjacentSquares[currentPos]) {
            document[currentPos] = null;
            continue;
        }
        const positions = { top: null, right: null, left: null, bottom: null }; // positions for new square

        // position of square relative to new square
        switch(currentPos) {
            case 'top':
                positions.bottom = savedImage;
                break;
            case 'bottom':
                positions.top = savedImage;
                break;
            case 'left':
                positions.right = savedImage;
                break;
            default: // case 'right'
                positions.left = savedImage;
        }

        // check database for any other filled squares adjacent to new square
        const currentZone = adjacentSquares[currentPos];
        const otherSquares = { // get zones for adjacent squares
            top: currentZone[0] > 0 ? [currentZone[0] - 1, currentZone[1]] : null,
            right: [currentZone[0], currentZone[1] + 1],
            left: currentZone[1] > 0 ? [currentZone[0], currentZone[1] - 1] : null,
            bottom: [currentZone[0] + 1, currentZone[1]]
        };
        const otherSquaresPositions = Object.keys(otherSquares);
        for (let j = 0; j < otherSquaresPositions.length; j++) {
            const otherPos = otherSquaresPositions[j];
            if (positions[otherPos] || !otherSquares[otherPos]) continue; // skip if already filled
            const image = await Image.findOne({ zone: otherSquares[otherPos] });
            if (image) {
                positions[otherPos] = { id: image.id, url: image.url };
            } else {
                positions[otherPos] = null;
            }
        }

        // insert adjacent square into database
        const query = { zone: currentZone };
        const update = { $setOnInsert: {
            zone: currentZone,
            filled: false,
            ...positions
            }
        };
        const options = { upsert: true, new: true };
        const square = await Image.findOneAndUpdate(query, update, options).catch(e => console.log(e));
        document[currentPos] = { id: square.id, url: square.url };
    }
    next();
});

module.exports = Image = mongoose.model('images', ImageSchema);