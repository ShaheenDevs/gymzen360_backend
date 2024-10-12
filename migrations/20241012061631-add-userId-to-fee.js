'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('Fees', 'memberId', {
            type: Sequelize.STRING,
            allowNull: false, // Set to true if you want this column to be optional
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('Fees', 'memberId');
    }
};
