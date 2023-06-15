export default {
  up: async (queryInterface, Sequelize) => {
    const payments = [];

    for (let i = 1; i <= 11; i++) {
      payments.push({
        id: Sequelize.literal('UUID()'),
        method: i % 2 === 0 ? 'stripe' : 'cod',
        amount: (i * 100).toFixed(2),
        orderId: Sequelize.literal('(SELECT id FROM orders LIMIT 1 OFFSET ' + (i - 1) + ')'),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert('payments', payments);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('payments', null, {});
  },
};
