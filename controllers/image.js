const models = require('../models');
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

// Add a new single image
const addSingleImage = (req, res) => {
    uploadSingle(req, res, async (err) => {
        if (err) {
            console.error("Add Image Error:", err);
            return res.status(500).json({
                message: "An error occurred while uploading the image",
                error: err.message,
            });
        }

        try {
            const newImage = await models.Image.create({
                gymId: req.body.gymId,
                imagePath: req.file.path,
            });

            return res.status(201).json({
                message: "Image uploaded successfully",
                image: newImage,
            });
        } catch (error) {
            console.error("Add Image Error:", error);
            return res.status(500).json({
                message: "An error occurred while saving the image",
                error: error.message,
            });
        }
    });
};

// Add multiple images
const addMultipleImages = (req, res) => {
    uploadMultiple(req, res, async (err) => {
        if (err) {
            console.error("Add Images Error:", err);
            return res.status(500).json({
                message: "An error occurred while uploading the images",
                error: err.message,
            });
        }

        try {
            const imagesData = req.files.map(file => ({
                gymId: req.body.gymId,
                imagePath: file.path,
            }));
            const newImages = await models.Image.bulkCreate(imagesData);

            return res.status(201).json({
                message: "Images uploaded successfully",
                images: newImages,
            });
        } catch (error) {
            console.error("Add Images Error:", error);
            return res.status(500).json({
                message: "An error occurred while saving the images",
                error: error.message,
            });
        }
    });
};

// Update an existing image
const updateImage = (req, res) => {
    uploadSingle(req, res, async (err) => {
        if (err) {
            console.error("Update Image Error:", err);
            return res.status(500).json({
                message: "An error occurred while uploading the new image",
                error: err.message,
            });
        }

        const { id: imageId } = req.params;

        try {
            const image = await models.Image.findByPk(imageId);
            if (!image) {
                return res.status(404).json({ message: 'Image not found' });
            }

            // Delete old image file
            fs.unlink(image.imagePath, async (err) => {
                if (err) console.error("Old Image Delete Error:", err);

                // Update image path in database
                await models.Image.update(
                    { imagePath: req.file.path },
                    { where: { id: imageId } }
                );

                const updatedImage = await models.Image.findByPk(imageId);

                return res.status(200).json({
                    message: "Image updated successfully",
                    image: updatedImage,
                });
            });
        } catch (error) {
            console.error("Update Image Error:", error);
            return res.status(500).json({
                message: "An error occurred while updating the image",
                error: error.message,
            });
        }
    });
};

// Delete an image
const deleteImage = async (req, res) => {
    const { id: imageId } = req.params;

    try {
        const image = await models.Image.findByPk(imageId);
        if (!image) {
            return res.status(404).json({ message: 'Image not found' });
        }

        // Delete image file
        fs.unlink(image.imagePath, async (err) => {
            if (err) {
                console.error("Delete Image Error:", err);
                return res.status(500).json({
                    message: "An error occurred while deleting the image file",
                    error: err.message,
                });
            }

            // Remove image from database
            await models.Image.destroy({ where: { id: imageId } });

            return res.status(200).json({ message: 'Image deleted successfully' });
        });
    } catch (error) {
        console.error("Delete Image Error:", error);
        return res.status(500).json({
            message: "An error occurred while deleting the image",
            error: error.message,
        });
    }
};

module.exports = {
    addSingleImage,
    addMultipleImages,
    updateImage,
    deleteImage,
};
