const models = require('../models');

const getDashboardData = async (req, res) => {
    const {id: gymId } = req.params;

    try {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();

        // Income Data
        const incomes = await models.Income.findAll({
            where: { gymId },
            attributes: ['amount', 'date'],
        });
        
        let totalIncome = 0;
        let monthlyIncome = Array(6).fill(0);  // Array for last six months

        incomes.forEach(income => {
            const incomeAmount = parseFloat(income.amount) || 0;
            totalIncome += incomeAmount;

            const incomeDate = new Date(income.date);
            const monthDifference = (currentYear - incomeDate.getFullYear()) * 12 + (currentMonth - incomeDate.getMonth());
            
            if (monthDifference >= 0 && monthDifference < 6) {
                monthlyIncome[monthDifference] += incomeAmount;
            }
        });

        // Fee Data
        const fees = await models.Fee.findAll({
            where: { gymId },
            attributes: ['amount', 'date', 'status'],
        });
        
        let totalFee = 0;
        let totalPending = 0;
        let monthlyFee = Array(6).fill(0);  // Array for last six months

        fees.forEach(fee => {
            const feeAmount = parseFloat(fee.amount) || 0;
            totalFee += feeAmount;
            if (fee.status === 'unpaid') {
                totalPending += feeAmount;
            }

            const feeDate = new Date(fee.date);
            const monthDifference = (currentYear - feeDate.getFullYear()) * 12 + (currentMonth - feeDate.getMonth());
            
            if (monthDifference >= 0 && monthDifference < 6) {
                monthlyFee[monthDifference] += feeAmount;
            }
        });

        // Member Data
        const activeMembers = await models.Member.count({
            where: { gymId, status: 'active' },
        });
        const inactiveMembers = await models.Member.count({
            where: { gymId, status: 'inactive' },
        });

        // Expense Data
        const expenses = await models.Expense.findAll({
            where: { gymId },
            attributes: ['amount', 'date'],
        });
        
        let totalExpense = 0;
        let monthlyExpense = Array(6).fill(0);  // Array for last six months

        expenses.forEach(expense => {
            const expenseAmount = parseFloat(expense.amount) || 0;
            totalExpense += expenseAmount;

            const expenseDate = new Date(expense.date);
            const monthDifference = (currentYear - expenseDate.getFullYear()) * 12 + (currentMonth - expenseDate.getMonth());

            if (monthDifference >= 0 && monthDifference < 6) {
                monthlyExpense[monthDifference] += expenseAmount;
            }
        });

        return res.status(200).json({
            income: {
                total: totalIncome,
                lastMonth: monthlyIncome[0],
                secondLastMonth: monthlyIncome[1],
                thirdLastMonth: monthlyIncome[2],
                fourthLastMonth: monthlyIncome[3],
                fifthLastMonth: monthlyIncome[4],
                sixthLastMonth: monthlyIncome[5],
            },
            fee: {
                total: totalFee,
                lastMonth: monthlyFee[0],
                secondLastMonth: monthlyFee[1],
                thirdLastMonth: monthlyFee[2],
                fourthLastMonth: monthlyFee[3],
                fifthLastMonth: monthlyFee[4],
                sixthLastMonth: monthlyFee[5],
                totalPending: totalPending,
            },
            member: {
                active: activeMembers,
                inactive: inactiveMembers,
            },
            expense: {
                total: totalExpense,
                lastMonth: monthlyExpense[0],
                secondLastMonth: monthlyExpense[1],
                thirdLastMonth: monthlyExpense[2],
                fourthLastMonth: monthlyExpense[3],
                fifthLastMonth: monthlyExpense[4],
                sixthLastMonth: monthlyExpense[5],
            },
        });
    } catch (error) {
        console.error("Get Dashboard Data Error:", error);
        return res.status(500).json({
            message: "An error occurred while retrieving the dashboard data",
            error: error.message,
        });
    }
};

module.exports = {
    getDashboardData,
};
