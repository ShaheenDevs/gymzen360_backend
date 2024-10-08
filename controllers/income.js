const models = require('../models');

// Add a new income
const addIncome = async (req, res) => {
    const { gymId, title, amount, description, date } = req.body;

    try {
        const newIncome = await models.Income.create({
            gymId,
            title,
            amount,
            description,
            date,
        });

        return res.status(201).json({
            message: "Income added successfully",
            income: newIncome,
        });
    } catch (error) {
        console.error("Add Income Error:", error);
        return res.status(500).json({
            message: "An error occurred while adding the income",
            error: error.message,
        });
    }
};

// Get all incomes for a specific gym
const getGymIncomes = async (req, res) => {
    const { gymId } = req.params;

    try {
        const incomes = await models.Income.findAll({ where: { gymId } });

        if (incomes.length) {
            return res.status(200).json({
                message: "Incomes retrieved successfully",
                incomes,
            });
        }

        return res.status(404).json({ message: 'No incomes found for this gym' });
    } catch (error) {
        console.error("Get Incomes Error:", error);
        return res.status(500).json({
            message: "An error occurred while retrieving incomes",
            error: error.message,
        });
    }
};

// Update an existing income
const updateIncome = async (req, res) => {
    const { id: incomeId } = req.params;
    const { title, amount, description, date } = req.body;

    try {
        const [updated] = await models.Income.update(
            { title, amount, description, date },
            { where: { id: incomeId } }
        );

        if (updated) {
            const updatedIncome = await models.Income.findByPk(incomeId);
            return res.status(200).json({
                message: "Income updated successfully",
                income: updatedIncome,
            });
        }

        return res.status(404).json({ message: 'Income not found' });
    } catch (error) {
        console.error("Update Income Error:", error);
        return res.status(500).json({
            message: "An error occurred while updating the income",
            error: error.message,
        });
    }
};

// Delete an income
const deleteIncome = async (req, res) => {
    const { id: incomeId } = req.params;

    try {
        const deleted = await models.Income.destroy({ where: { id: incomeId } });

        if (deleted) {
            return res.status(200).json({ message: 'Income deleted successfully' });
        }

        return res.status(404).json({ message: 'Income not found' });
    } catch (error) {
        console.error("Delete Income Error:", error);
        return res.status(500).json({
            message: "An error occurred while deleting the income",
            error: error.message,
        });
    }
};

module.exports = {
    addIncome,
    getGymIncomes,
    updateIncome,
    deleteIncome,
};
