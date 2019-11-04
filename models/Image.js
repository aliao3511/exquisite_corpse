const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    url: String, 
    contentType: String
}, { timestamps: true });

module.exports = Image = mongoose.model('images', ImageSchema);