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
    const document = this;
    const adjacentSquares = {
        top: document.zone[0] > 0 ? [document.zone[0] - 1, document.zone[1]] : null,
        right: [document.zone[0], document.zone[1] + 1],
        left: document.zone[1] > 0 ? [document.zone[0], document.zone[1] - 1] : null,
        bottom: [document.zone[0] + 1, document.zone[1]]
    };

    const squares = Object.keys(adjacentSquares);
    const savedImage = { id: document.id, url: document.url };
    for (let i = 0; i < squares.length; i++) {
        const pos = squares[i];
        let positions = { top: null, right: null, left: null, bottom: null };
        switch(pos) {
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
            document[pos] = { id: square.id, url: null };
        } else {
            document[pos] = null;
        }
    }
    next();
});

module.exports = Image = mongoose.model('images', ImageSchema);