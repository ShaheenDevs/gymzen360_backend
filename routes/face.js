const express = require("express");
const faceCtrl = require('../controllers/face_swap');
const router = express.Router();

// Define the POST route for face upload
router.post('/uploadFace', faceCtrl.upload.single('image'), faceCtrl.uploadFace);

module.exports = router;
