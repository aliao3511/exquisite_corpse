const express = require('express');
const router = express.Router();
const fs = require('fs');
const multer = require('multer');
const upload = multer();

const Image = require('../../models/Image');

// POST /save - save image
router.post('/save', upload.single('image'), async (req, res) => {
    debugger
    const data = req.file;
    const newImage = new Image();
    debugger
    newImage.data = data.buffer;
    // newImage.data = data;
    newImage.contentType = 'image/png';
    newImage.save((err, image) => {
        res.json({
            success: true,
            id: image.id,
        });
    });
});

// GET /:id - get image
// router.get('/:id', async (req, res) => {
//     debugger
//     const image = await Image.findById(req.params.id);
//     if (!image) {
//         return res.status(404).json({ image: 'image not found' });
//     }
//     res.contentType = image.contentType;
//     debugger
//     res.send(image.data);
// });

module.exports = router;