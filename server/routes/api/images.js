const express = require('express');
const router = express.Router();
const fs = require('fs');
const multer = require('multer');
const upload = multer();
const AWS = require('aws-sdk');
const mongoose = require('mongoose');

const Image = require('../../models/Image');
const { ID, SECRET, BUCKET_NAME } = require('../../../config/aws');

const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET
});

// POST /seed - seed image
router.post('/seed', async (req, res) => {
    const imageOne = new Image();
    imageOne.contentType = 'image/png';
    imageOne.filled = true;
    imageOne.zone = [0,0];
    imageOne.url = 'https://s3.amazonaws.com/exquisite.corpse.dev/0.0.png';
    
    const imageTwo = new Image();
    imageTwo.contentType = 'image/png';
    imageTwo.filled = true;
    imageTwo.zone = [0,0];
    imageTwo.url = 'https://s3.amazonaws.com/exquisite.corpse.dev/0.1.png';
 
    const [savedImageOne, savedImageTwo] = await Promise.all([
                                                               imageOne.save(), 
                                                               imageTwo.save()
                                                             ]);

    res.json({
      imageOne: savedImageOne,
      imageTwo: savedImageTwo
    });
  
    /* imageOne.save((err, image) => {
        res.contentType = image.contentType;
        res.json({
            image
        });
    }); */
});

// GET /draw - get borders for given canvas
router.get('/draw', async (req, res) => {
    const images = await Image.find({ filled: false });
    const base = images[Math.floor(Math.random() * images.length)];
    res.json({
        base,
    });
});

// POST /save - save image
router.post('/save', upload.single('image'), async (req, res) => {
    const baseId = req.body.baseId;
    const data = req.file;
    const newImage = await Image.findById(baseId);
    newImage.contentType = req.file.mimetype;

    const params = {
        Bucket: BUCKET_NAME,
        Key: `${newImage.zone.join('.')}.png`, // need to change
        Body: req.file.buffer
    };

    s3.upload(params, async (err, data) => {
        if (err) throw err;
        console.log('uploaded to AWS!');
        newImage.url = data.Location;
        debugger

        // update url in any adjacent images
        // const positions = ['top', 'right', 'left', 'bottom'];
        const id = new mongoose.Types.ObjectId(baseId);
        const top = await Image.findOneAndUpdate({ 'top.id': id }, { $set: { 'top.url': data.Location } }, { new: true });
        const right = await Image.findOneAndUpdate({ 'right.id': id }, { $set: { 'right.url': data.Location } }, { new: true });
        const left = await Image.findOneAndUpdate({ 'left.id': id }, { $set: { 'left.url': data.Location } }, { new: true });
        const bottom = await Image.findOneAndUpdate({ 'bottom.id': id }, { $set: { 'bottom.url': data.Location } }, { new: true });
        // const query = {
        //     $or: [
        //         { 'top.id': id },
        //         { 'right.id': id },
        //         { 'left.id': id },
        //         { 'bottom.id': id }
        //     ]
        // };
        // const images = await Image.find(query);

        // for (let i = 0; i < images.length; i++) {
        //     const image = images[i];
        //     for (let j = 0; j < positions.length; j++) {
        //         const pos = positions[j];
        //         debugger
        //         if (image[pos].id && image[pos].id.equals(id)) {
        //             // debugger
        //             image[pos].url = data.Location;
        //             // debugger
        //             const updated = await image.save();
        //             debugger
        //         }
        //     }
        // }

        newImage.filled = true;
        newImage.save((err, image) => {
            res.contentType = image.contentType;
            res.json({
                image
            });
        });

    });
});

// GET /corpse - get all images
router.get('/corpse', async (req, res) => {
    const images = await Image.find({ filled: true });
    images.sort((a, b) => {
        const zoneA = a.zone;
        const zoneB = b.zone;
        return zoneA[0] < zoneB[0] ? -1 : // a comes before b if row # is smaller
                (zoneA[0] > zoneB[0] ? 1 : // a comes after b if row # is larger
                (zoneA[1] < zoneB[1] ? -1 : 1)); // if row #s are equal, a comes before b if col # is smaller
    });
    res.json({
        images
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
