const bcrypt = require('bcryptjs');
const models = require('../models');
var jwt = require('jsonwebtoken');
const Validator = require("fastest-validator");

const v = new Validator();

const signUp = async (req, res) => {
    try {
        const { name, email, type, phoneNo, profile, password } = req.body;

        // Check if the user already exists
        const existingUser = await models.User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: 'Email is already registered', user: existingUser });
        }

        // Validate user input
        const user = { name, email, type, phoneNo, profile, password };
        const schema = {
            name: { type: "string", min: 5 },
            email: { type: "string", min: 10 },
            type: { type: "string" },
            password: { type: "string", min: 8 },
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
            user: {
                id: user.id,
                email: user.email,
                expiresIn: "1 day",
                token: token,
            },
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

module.exports = {
    signUp,
    signIn,
    delUser,
};
