const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Counter = require('./Counter');

const ImageSchema = new Schema({
    url: String, 
    contentType: String,
    zone: { type: [Number], required: true },
    filled: { type: Boolean, default: false },
    top: { type: this, default: null },
    right: { type: this, default: null },
    left: { type: this, default: null },
    bottom: { type: this, default: null }
}, { timestamps: true });

// insert blank documents for adjacent squares
ImageSchema.pre('save', async function(next) {
    const document = this;
    const adjacentSquares = {
        top: document.zone[0] > 0 ? [document.zone[0] - 1, document.zone[1]] : null,
        right: [document.zone[0], document.zone[1] + 1],
        left: document.zone[1] > 0 ? [document.zone[0], document.zone[1] - 1] : null,
        bottom: [document.zone[0] + 1, document.zone[1]]
    };

    const squares = Object.keys(adjacentSquares);
    for (let i = 0; i < squares.length; i++) {
        const pos = squares[i];
        let positions = { top: null, right: null, left: null, bottom: null };
        switch(pos) {
            case 'top':
                positions.bottom = document;
                break;
            case 'bottom':
                positions.top = document;
                break;
            case 'left':
                positions.right = document;
                break;
            default: // case 'right'
                positions.left = document;
        }

        if (adjacentSquares[pos]) {
            const query = { zone: adjacentSquares[pos] };
            const update = { $set: {
                zone: adjacentSquares[pos],
                filled: false,
                ...positions
                }
            };
            const options = { upsert: true, new: true };
            const square = await Image.findOneAndUpdate(query, update, options).catch(e => console.log(e));
            document[pos] = square;
        }
    }
    debugger
    next();
});

module.exports = Image = mongoose.model('images', ImageSchema);