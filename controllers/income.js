const models = require('../models');

// Add a new income
const addIncome = async (req, res) => {
    const { gymId, title, amount, description, date } = req.body;

    try {
        const income = {
            gymId,
            title,
            amount,
            description,
            date,
        };

        const newIncome = await models.Income.create(income);
        return res.status(201).json({
            message: "Income added successfully",
            result: newIncome,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "An error occurred while adding the income",
            error: err.message,
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
                result: incomes,
            });
        }

        return res.status(404).json({ message: 'No incomes found for this gym.' });
    } catch (error) {
        console.error(error);
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
                result: updatedIncome,
            });
        }

        return res.status(404).json({ message: 'Income not found' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'An error occurred while updating the income',
            error: error.message,
        });
    }
};

// Delete an income
const deleteIncome = async (req, res) => {
    const { id: incomeId } = req.params;

    try {
        const result = await models.Income.destroy({ where: { id: incomeId } });

        if (result === 1) {
            return res.status(200).json({ message: 'Income deleted successfully' });
        }

        return res.status(404).json({ message: 'Income not found' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'An error occurred while deleting the income',
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
