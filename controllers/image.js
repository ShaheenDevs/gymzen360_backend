const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Define the upload folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique file name with timestamp
    }
});

const uploadSingle = multer({ storage }).single('image');
const uploadMultiple = multer({ storage }).array('images', 10);

// Add a new single image (without saving to database)
const addSingleImage = (req, res) => {
    uploadSingle(req, res, (err) => {
        if (err) {
            console.error("Add Image Error:", err);
            return res.status(500).json({
                message: "An error occurred while uploading the image",
                error: err.message,
            });
        }

        const imagePath = req.file.path;
        return res.status(201).json({
            message: "Image uploaded successfully",
            imagePath: imagePath,
        });
    });
};

// Add multiple images (without saving to database)
const addMultipleImages = (req, res) => {
    uploadMultiple(req, res, (err) => {
        if (err) {
            console.error("Add Images Error:", err);
            return res.status(500).json({
                message: "An error occurred while uploading the images",
                error: err.message,
            });
        }

        const imagesPaths = req.files.map(file => file.path);
        return res.status(201).json({
            message: "Images uploaded successfully",
            imagesPaths: imagesPaths,
        });
    });
};

// Update an existing image (replace the old file with the new one)
const updateImage = (req, res) => {
    const { filename } = req.params;

    uploadSingle(req, res, (err) => {
        if (err) {
            console.error("Update Image Error:", err);
            return res.status(500).json({
                message: "An error occurred while uploading the new image",
                error: err.message,
            });
        }

        const newImagePath = req.file.path;
        const oldImagePath = path.join('uploads', filename);

        // Delete old image file if it exists
        fs.unlink(oldImagePath, (unlinkErr) => {
            if (unlinkErr) {
                console.error("Old Image Delete Error:", unlinkErr);
                // Continue processing even if deleting the old file fails
            }

            return res.status(200).json({
                message: "Image updated successfully",
                newImagePath: newImagePath,
                oldImageDeleted: !unlinkErr
            });
        });
    });
};

// Delete an image by filename
const deleteImage = (req, res) => {
    const { filename } = req.params;
    const imagePath = path.join('uploads', filename);

    fs.unlink(imagePath, (err) => {
        if (err) {
            console.error("Delete Image Error:", err);
            return res.status(404).json({
                message: "Image not found or could not be deleted",
                error: err.message,
            });
        }

        return res.status(200).json({ message: 'Image deleted successfully' });
    });
};

module.exports = {
    addSingleImage,
    addMultipleImages,
    updateImage,
    deleteImage,
};
