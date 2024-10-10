const express = require("express");
const imageCtrl = require('../controllers/image');

const router = express.Router();

// Add a new single image
router.post('/addSingleImage', imageCtrl.addSingleImage);

// Add multiple images
router.post('/addMultipleImages', imageCtrl.addMultipleImages);

// Update an existing image
router.put('/updateImage/:id', imageCtrl.updateImage);

// Delete an image
router.delete('/deleteImage/:id', imageCtrl.deleteImage);

module.exports = router;
