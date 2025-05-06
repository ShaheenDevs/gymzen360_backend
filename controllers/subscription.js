const models = require('../models');
const Validator = require("fastest-validator");

const v = new Validator();

// Create Subscription
const createSubscription = async (req, res) => {
    try {
        const { userId, planName, price, startDate, endDate, status } = req.body;

        const schema = {
            userId: { type: "number" },
            planName: { type: "string", min: 3 },
            price: { type: "number", positive: true },
            startDate: { type: "string" },
            endDate: { type: "string" },
            status: { type: "string", optional: true },
        };

        const validationResponse = v.validate({ userId, planName, price, startDate, endDate, status }, schema);
        if (validationResponse !== true) {
            return res.status(400).json({ message: "Validation failed", errors: validationResponse });
        }

        // Create subscription
        const newSubscription = await models.Subscription.create({
            userId,
            planName,
            price,
            startDate,
            endDate,
            status: status || "active",
        });

        res.status(201).json({ message: "Subscription created successfully", subscription: newSubscription });
    } catch (error) {
        console.error("Create subscription error:", error);
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
};

// Get All Subscriptions (Optional filter by userId)
const getSubscriptions = async (req, res) => {
    try {
        const { userId } = req.query;
        let condition = {};
        if (userId) {
            condition.userId = userId;
        }

        const subscriptions = await models.Subscription.findAll({ where: condition });
        res.status(200).json({ subscriptions });
    } catch (error) {
        console.error("Get subscriptions error:", error);
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
};

// Get Subscription by User ID
const getSubscriptionByUser = async (req, res) => {
    try {
        const { userId } = req.params;

        // Find subscriptions for the user
        const subscriptions = await models.Subscription.findAll({ where: { userId } });

        if (subscriptions.length === 0) {
            return res.status(404).json({ message: "No subscriptions found for this user" });
        }

        res.status(200).json({
            message: "Subscriptions fetched successfully",
            data: subscriptions
        });
    } catch (error) {
        console.error("Get subscription by user error:", error);
        res.status(500).json({ message: "An error occurred while fetching subscriptions", error: error.message });
    }
};

// Update Subscription
const updateSubscription = async (req, res) => {
    try {
        const { id, planName, price, startDate, endDate, status } = req.body;

        const subscription = await models.Subscription.findOne({ where: { id } });
        if (!subscription) {
            return res.status(404).json({ message: 'Subscription not found' });
        }

        // Validate input
        const schema = {
            planName: { type: "string", min: 3, optional: true },
            price: { type: "number", positive: true, optional: true },
            startDate: { type: "string", optional: true },
            endDate: { type: "string", optional: true },
            status: { type: "string", optional: true },
        };

        const validationResponse = v.validate({ planName, price, startDate, endDate, status }, schema);
        if (validationResponse !== true) {
            return res.status(400).json({ message: "Validation failed", errors: validationResponse });
        }

        // Update subscription
        await subscription.update({ planName, price, startDate, endDate, status });

        res.status(200).json({ message: "Subscription updated successfully", subscription });
    } catch (error) {
        console.error("Update subscription error:", error);
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
};

// Delete Subscription
const deleteSubscription = async (req, res) => {
    try {
        const subscriptionId = req.params.id;

        const deletionResult = await models.Subscription.destroy({ where: { id: subscriptionId } });
        if (deletionResult) {
            return res.status(200).json({ message: 'Subscription deleted successfully' });
        } else {
            return res.status(404).json({ message: 'Subscription not found' });
        }
    } catch (error) {
        console.error("Delete subscription error:", error);
        res.status(500).json({ message: 'An error occurred while deleting subscription', error: error.message });
    }
};

module.exports = {
    createSubscription,
    getSubscriptions,
    getSubscriptionByUser,
    updateSubscription,
    deleteSubscription,
};
