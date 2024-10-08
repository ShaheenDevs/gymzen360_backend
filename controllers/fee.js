const models = require('../models');

// Add a new fee
const addFee = async (req, res) => {
    const { gymId, date, amount, paymentMethod, privateNote, status } = req.body;

    try {
        const newFee = await models.Fee.create({
            gymId,
            date,
            amount,
            paymentMethod,
            privateNote,
            status,
        });

        return res.status(201).json({
            message: "Fee added successfully",
            fee: newFee,
        });
    } catch (error) {
        console.error("Add Fee Error:", error);
        return res.status(500).json({
            message: "An error occurred while adding the fee",
            error: error.message,
        });
    }
};

// Update an existing fee
const updateFee = async (req, res) => {
    const { id: feeId } = req.params;
    const { date, amount, paymentMethod, privateNote, status } = req.body;

    try {
        const [updated] = await models.Fee.update(
            { date, amount, paymentMethod, privateNote, status },
            { where: { id: feeId } }
        );

        if (updated) {
            const updatedFee = await models.Fee.findByPk(feeId);
            return res.status(200).json({
                message: "Fee updated successfully",
                fee: updatedFee,
            });
        }

        return res.status(404).json({ message: 'Fee not found' });
    } catch (error) {
        console.error("Update Fee Error:", error);
        return res.status(500).json({
            message: "An error occurred while updating the fee",
            error: error.message,
        });
    }
};

// Get all fees for a specific gym
const getMemberFees = async (req, res) => {
    const { gymId } = req.params;

    try {
        const fees = await models.Fee.findAll({ where: { gymId } });

        if (fees.length) {
            return res.status(200).json({
                message: "Fees retrieved successfully",
                fees,
            });
        }

        return res.status(404).json({ message: 'No fees found for this gym' });
    } catch (error) {
        console.error("Get Fees Error:", error);
        return res.status(500).json({
            message: "An error occurred while retrieving fees",
            error: error.message,
        });
    }
};

// Delete a fee
const deleteFee = async (req, res) => {
    const { id: feeId } = req.params;

    try {
        const deleted = await models.Fee.destroy({ where: { id: feeId } });

        if (deleted) {
            return res.status(200).json({ message: 'Fee deleted successfully' });
        }

        return res.status(404).json({ message: 'Fee not found' });
    } catch (error) {
        console.error("Delete Fee Error:", error);
        return res.status(500).json({
            message: "An error occurred while deleting the fee",
            error: error.message,
        });
    }
};

module.exports = {
    addFee,
    updateFee,
    getMemberFees,
    deleteFee,
};
