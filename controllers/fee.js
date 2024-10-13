const models = require('../models');

// Add a new fee
const addFee = async (req, res) => {
    const { gymId, memberId, date, amount, paymentMethod, privateNote, status } = req.body;

    try {
        const newFee = await models.Fee.create({
            gymId,
            memberId,
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
    const { date, amount, paymentMethod, privateNote, status, memberId } = req.body;

    try {
        const [updated] = await models.Fee.update(
            { date, amount, paymentMethod, privateNote, status, memberId },
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
const getGymFees = async (req, res) => {
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

// Get all fees for a specific user
const getMemberFees = async (req, res) => {
    const { memberId } = req.params;

    try {
        const fees = await models.Fee.findAll({ where: { memberId } });

        if (fees.length) {
            return res.status(200).json({
                message: "Fees retrieved successfully",
                fees,
            });
        }

        return res.status(404).json({ message: 'No fees found for this user' });
    } catch (error) {
        console.error("Get User Fees Error:", error);
        return res.status(500).json({
            message: "An error occurred while retrieving user fees",
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
const addMonthlyFee = async () => {
    try {
        // Get all members
        const members = await models.Member.findAll();

        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();

        // Iterate over each member and check if a fee for the current month already exists
        for (const member of members) {
            const existingFee = await models.Fee.findOne({
                where: {
                    memberId: member.id,
                    gymId: member.gymId,
                    date: {
                        [models.Sequelize.Op.gte]: new Date(currentYear, currentMonth, 1),
                        [models.Sequelize.Op.lt]: new Date(currentYear, currentMonth + 1, 1)
                    }
                }
            });

            // If no fee exists for the current month, add it
            if (!existingFee) {
                await models.Fee.create({
                    gymId: member.gymId,
                    memberId: member.id,
                    date: new Date(currentYear, currentMonth, 1), // First day of the current month
                    amount: member.fee,
                    paymentMethod: 'auto',
                    privateNote: 'Monthly auto-generated fee',
                    status: 'unpaid'
                });
                console.log(`Fee added for member ID: ${member.id} for ${currentYear}-${currentMonth + 1}`);
            } else {
                console.log(`Fee already exists for member ID: ${member.id} for ${currentYear}-${currentMonth + 1}`);
            }
        }
    } catch (error) {
        console.error("Error adding monthly fees:", error);
    }
};

module.exports = {
    addFee,
    updateFee,
    getGymFees,
    getMemberFees,
    deleteFee,
    addMonthlyFee,
};
