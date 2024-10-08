const models = require('../models');

// Add a new expense
const addExpense = async (req, res) => {
    const { gymId, title, amount, description, date, image } = req.body;

    try {
        const newExpense = await models.Expense.create({
            gymId,
            title,
            amount,
            description,
            date,
            image,
        });

        return res.status(201).json({
            message: "Expense added successfully",
            expense: newExpense,
        });
    } catch (error) {
        console.error("Add Expense Error:", error);
        return res.status(500).json({
            message: "An error occurred while adding the expense",
            error: error.message,
        });
    }
};

// Get all expenses for a specific gym
const getGymExpenses = async (req, res) => {
    const { gymId } = req.params;

    try {
        const expenses = await models.Expense.findAll({ where: { gymId } });

        if (expenses.length) {
            return res.status(200).json({
                message: "Expenses retrieved successfully",
                expenses,
            });
        }

        return res.status(404).json({ message: 'No expenses found for this gym' });
    } catch (error) {
        console.error("Get Expenses Error:", error);
        return res.status(500).json({
            message: "An error occurred while retrieving expenses",
            error: error.message,
        });
    }
};

// Update an existing expense
const updateExpense = async (req, res) => {
    const { id: expenseId } = req.params;
    const { title, amount, description, date, image } = req.body;

    try {
        const [updated] = await models.Expense.update(
            { title, amount, description, date, image },
            { where: { id: expenseId } }
        );

        if (updated) {
            const updatedExpense = await models.Expense.findByPk(expenseId);
            return res.status(200).json({
                message: "Expense updated successfully",
                expense: updatedExpense,
            });
        }

        return res.status(404).json({ message: 'Expense not found' });
    } catch (error) {
        console.error("Update Expense Error:", error);
        return res.status(500).json({
            message: 'An error occurred while updating the expense',
            error: error.message,
        });
    }
};

// Delete an expense
const deleteExpense = async (req, res) => {
    const { id: expenseId } = req.params;

    try {
        const deleted = await models.Expense.destroy({ where: { id: expenseId } });

        if (deleted) {
            return res.status(200).json({ message: 'Expense deleted successfully' });
        }

        return res.status(404).json({ message: 'Expense not found' });
    } catch (error) {
        console.error("Delete Expense Error:", error);
        return res.status(500).json({
            message: 'An error occurred while deleting the expense',
            error: error.message,
        });
    }
};

module.exports = {
    addExpense,
    getGymExpenses,
    updateExpense,
    deleteExpense,
};
