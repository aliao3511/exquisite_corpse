const express = require('express');
const router = express.Router();
const fs = require('fs');
const multer = require('multer');
const upload = multer();
const AWS = require('aws-sdk');

const Image = require('../../models/Image');
const { ID, SECRET, BUCKET_NAME } = require('../../config/aws');

const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET
});

// POST /save - save image
router.post('/save', upload.single('image'), async (req, res) => {
    debugger
    const data = req.file;
    const newImage = new Image();
    newImage.contentType = req.file.mimetype;
    debugger
    // newImage.data = data.buffer;
    // newImage.data = data;
    const params = {
        Bucket: BUCKET_NAME,
        Key: 'test.png',
        Body: req.file.buffer
    };

    s3.upload(params, (err, data) => {
        if (err) throw err;
        debugger
        console.log('uploaded!');
    });

    debugger
    // newImage.save((err, image) => {
    //     res.json({
    //         success: true,
    //         id: image.id,
    //     });
    // });
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