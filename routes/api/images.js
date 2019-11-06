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

// POST /seed - seed image
router.post('/seed', upload.single('image'), async (req, res) => {
    debugger
    const data = req.file;
    const newImage = new Image();
    newImage.contentType = req.file.mimetype;

    const params = {
        Bucket: BUCKET_NAME,
        Key: 'test.png',
        Body: req.file.buffer
    };

    s3.upload(params, async (err, data) => {
        if (err) throw err;
        console.log('uploaded to AWS!');
        // const images = await Image.find({ filled: false });

        newImage.url = data.Location;
        newImage.filled = true;
        newImage.save((err, image) => {
            res.contentType = image.contentType;
            res.json({
                image
            });
        });
    });
});

// GET /draw - get borders for given canvas
router.get('/draw', async (req, res) => {
    debugger
    const images = await Image.find({ filled: false });
    const base = images[Math.floor(Math.random() * images.length)];
    res.json({
        base,
    });
});

// POST /save - save image
router.post('/save', upload.single('image'), (req, res) => {
    debugger
    const data = req.file;
    const newImage = new Image();
    // const image = Image.findById();
    newImage.contentType = req.file.mimetype;
    debugger
    const params = {
        Bucket: BUCKET_NAME,
        Key: 'test.png',
        Body: req.file.buffer
    };

    s3.upload(params, async (err, data) => {
        if (err) throw err;
        console.log('uploaded to AWS!');
        // const images = await Image.find({ filled: false });

        newImage.url = data.Location;
        newImage.filled = true;
        newImage.save((err, image) => {
            res.contentType = image.contentType;
            res.json({
                image
            });
        });
    });
});

// GET /:id - get image
router.get('/:id', async (req, res) => {
    const image = await Image.findById(req.params.id);
    if (!image) {
        return res.status(404).json({ image: 'image not found' });
    }
    res.contentType = image.contentType;
    res.json({
        image
    });
});





module.exports = router;