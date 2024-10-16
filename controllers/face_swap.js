const faceapi = require('face-api.js');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { Canvas, Image, ImageData } = require('canvas');

// Monkey-patch face-api.js environment
faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Ensure this folder exists
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// Load face-api.js models
const loadModels = async () => {
    const modelPath = path.join(__dirname, 'models'); // Path to face-api.js models
    await faceapi.nets.ssdMobilenetv1.loadFromDisk(modelPath);
    await faceapi.nets.faceLandmark68Net.loadFromDisk(modelPath);
    await faceapi.nets.faceRecognitionNet.loadFromDisk(modelPath);
};

loadModels(); // Load models once when starting the server

// Face detection API
const uploadFace = async (req, res) => {
    try {
        const imagePath = req.file.path;

        // Load the uploaded image
        const img = await canvasLoadImage(imagePath);

        // Detect face with landmarks
        const detections = await faceapi.detectAllFaces(img).withFaceLandmarks();

        if (detections.length === 0) {
            return res.status(404).json({ message: 'No face detected in the uploaded image.' });
        }

        // Respond with the detection results
        res.status(200).json({
            message: 'Face detected successfully',
            faces: detections.map(d => d.landmarks.positions)
        });
    } catch (error) {
        console.error("Face detection error:", error);
        res.status(500).json({ message: 'An error occurred during face detection', error: error.message });
    }
};

// Helper function to load images with canvas
const canvasLoadImage = (imagePath) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = imagePath;
    });
};

module.exports = {
    uploadFace,
    upload,
};
