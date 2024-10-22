const bcrypt = require('bcryptjs');
const models = require('../models');
const jwt = require('jsonwebtoken');
const Validator = require("fastest-validator");

const v = new Validator();

const signUp = async (req, res) => {
    try {
        const { name, email, type, phoneNo, profile, password, gymSize, country, adress } = req.body;

        // Check if the user already exists
        const existingUser = await models.User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: 'Email is already registered' });
        }

        // Validate user input
        const user = { name, email, type, phoneNo, profile, password, gymSize, country, adress };
        const schema = {
            name: { type: "string", min: 5 },
            email: { type: "string", min: 10 },
            type: { type: "string" },
            phoneNo: { type: "string", optional: true },
            profile: { type: "string", optional: true },
            password: { type: "string", min: 8 },
            gymSize: { type: "string", optional: true },
            country: { type: "string", optional: true },
            adress: { type: "string", optional: true },
        };

        const validationResponse = v.validate(user, schema);
        if (validationResponse !== true) {
            return res.status(400).json({ message: "Validation failed", errors: validationResponse });
        }

        // Hash the password and create the new user
        user.password = await bcrypt.hash(password, 12);
        const newUser = await models.User.create(user);

        res.status(201).json({ message: "User signed up successfully", user: newUser });
    } catch (error) {
        console.error("Sign-up error:", error);
        res.status(500).json({ message: "An error occurred during sign-up", error: error.message });
    }
};

const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate user input
        const schema = {
            email: { type: "string" },
            password: { type: "string", min: 8 },
        };
        const validationResponse = v.validate({ email, password }, schema);
        if (validationResponse !== true) {
            return res.status(400).json({ message: "Validation failed", errors: validationResponse });
        }

        // Check if the user exists
        const user = await models.User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'No user registered with this email' });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Incorrect password" });
        }
        console.log('JWT Secret:', process.env.JWT_SECRET);
        const token = jwt.sign(
            {
                userId: user.id,
                email: user.email
            },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );
        res.status(200).json({
            message: "Signed in successfully",
            data: {
                ...user.toJSON(),
                expiresIn: "1d",
                token: token
            }
        });
    } catch (error) {
        console.error("Sign-in error:", error);
        res.status(500).json({ message: "An error occurred during sign-in", error: error.message });
    }
};

const delUser = async (req, res) => {
    try {
        const userId = req.params.id;

        // Find and delete the user by ID
        const deletionResult = await models.User.destroy({ where: { id: userId } });

        if (deletionResult) {
            return res.status(200).json({ message: 'Account deleted successfully' });
        } else {
            return res.status(404).json({ message: 'Account not found' });
        }
    } catch (error) {
        console.error("Delete user error:", error);
        res.status(500).json({ message: 'An error occurred while deleting the account', error: error.message });
    }
};

const updateProfile = async (req, res) => {
    try {
        const { id, name, email, type, phoneNo, profile, password, gymSize, country, adress } = req.body;

        // Find the user by ID
        const user = await models.User.findOne({ where: { id } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Validate the updated input
        const updatedData = { name, email, type, phoneNo, profile, password, gymSize, country, adress };
        const schema = {
            name: { type: "string", min: 5, optional: true },
            email: { type: "string", min: 10, optional: true },
            type: { type: "string", optional: true },
            phoneNo: { type: "string", optional: true },
            profile: { type: "string", optional: true },
            password: { type: "string", min: 8, optional: true },
            gymSize: { type: "string", optional: true },
            country: { type: "string", optional: true },
            adress: { type: "string", optional: true },
        };

        const validationResponse = v.validate(updatedData, schema);
        if (validationResponse !== true) {
            return res.status(400).json({ message: "Validation failed", errors: validationResponse });
        }

        // If a password is provided, hash it
        if (password) {
            updatedData.password = await bcrypt.hash(password, 12);
        }

        // Update the user with the new data
        await user.update(updatedData);

        res.status(200).json({ message: "Profile updated successfully", user });
    } catch (error) {
        console.error("Update profile error:", error);
        res.status(500).json({ message: 'An error occurred while updating the profile', error: error.message });
    }
};

module.exports = {
    signUp,
    signIn,
    delUser,
    updateProfile,
};
