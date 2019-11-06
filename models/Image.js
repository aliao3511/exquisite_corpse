const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Counter = require('./Counter');

const ImageSchema = new Schema({
    url: String, 
    contentType: String,
    zone: { type: [Number], required: true, unique: true, dropDups: true },
    filled: { type: Boolean, default: false },
    top: { type: this, default: null },
    right: { type: this, default: null },
    left: { type: this, default: null },
    bottom: { type: this, default: null }
}, { timestamps: true });

// insert blank documents for adjacent squares
ImageSchema.pre('save', next => {
    const document = this;
    const adjacentSquares = {
        top: document.zone[0] > 0 ? [document.zone[0] - 1, document.zone[1]] : null,
        right: [document.zone[0], document.zone[1] + 1],
        left: document.zone[1] > 0 ? [document.zone[0], document.zone[1] - 1] : null,
        bottom: [document.zone[0] + 1, document.zone[1]]
    };
    Object.keys(adjacentSquares).forEach(async pos => {
        let positions = { top: null, right: null, left: null, bottom: null };
        switch(pos) {
            case 'top':
                positions[bottom] = document;
                break;
            case 'bottom':
                positions[top] = document;
                break;
            case 'left':
                positions[right] = document;
                break;
            default: // case 'right'
                positions[left] = document;
        }

        debugger
        const square = await Image.update(
            { zone: adjacentSquares[pos] },
            { $setonInsert: {
                zone: pos,
                filled: false,
                ...positions
            } },
            { upsert: true }
        );

        debugger
        this[pos] = square;
        next();
    });
});

module.exports = Image = mongoose.model('images', ImageSchema);