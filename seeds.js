const Image = require('../../models/Image');

const firstImage = new Image();
// firstImage.url = ;
firstImage.contentType = 'image/png';
firstImage.zone = [0, 0];
firstImage.filled = true;
firstImage.save();