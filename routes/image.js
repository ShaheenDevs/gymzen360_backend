const express = require("express");
const imageCtrl = require('../controllers/image');

const router = express.Router();

// Add a new single image
router.post('/addSingleImage', imageCtrl.addSingleImage);

// Add multiple images
router.post('/addMultipleImages', imageCtrl.addMultipleImages);

// Update an existing image by filename
router.put('/updateImage/:filename', imageCtrl.updateImage);

// Delete an image by filename
router.delete('/deleteImage/:filename', imageCtrl.deleteImage);

module.exports = router;
