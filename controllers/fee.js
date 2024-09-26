const models = require('../models');

const addFee = async (req, res) => {
    const { gymId, date, amount, paymentMethod, privateNote, status } = req.body;

    try {
        const fee = {
            gymId,
            date,
            amount,
            paymentMethod,
            privateNote,
            status,
        };

        const newFee = await models.Fee.create(fee);
        return res.status(201).json({
            message: "Fee added successfully",
            result: newFee,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "An error occurred while adding the fee",
            error: err.message,
        });
    }
};

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
                result: updatedFee,
            });
        }

        return res.status(404).json({ message: 'Fee not found' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'An error occurred while updating the fee',
            error: error.message,
        });
    }
};

const getMemberFees = async (req, res) => {
    const { gymId } = req.params;

    try {
        const fees = await models.Fee.findAll({ where: { gymId } });

        if (fees.length) {
            return res.status(200).json({
                message: "Fees retrieved successfully",
                result: fees,
            });
        }

        return res.status(404).json({ message: 'No fees found for this gym.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An error occurred while retrieving fees",
            error: error.message,
        });
    }
};

const deleteFee = async (req, res) => {
    const { id: feeId } = req.params;

    try {
        const result = await models.Fee.destroy({ where: { id: feeId } });

        if (result === 1) {
            return res.status(200).json({ message: 'Fee deleted successfully' });
        }

        return res.status(404).json({ message: 'Fee not found' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'An error occurred while deleting the fee',
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
