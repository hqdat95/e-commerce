export default {
  up: async (queryInterface, Sequelize) => {
    const orders = [];

    for (let i = 1; i <= 11; i++) {
      orders.push({
        id: Sequelize.literal('UUID()'),
        totalPrice: 100.0 * i,
        status_order: 'pending',
        isPaid: false,
        userId: Sequelize.literal('(SELECT id FROM users LIMIT 1 OFFSET ' + (i - 1) + ')'),
        transportInfoId: Sequelize.literal('(SELECT id FROM transport_infos LIMIT 1 OFFSET ' + (i - 1) + ')'),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert('orders', orders);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('orders', null, {});
  },
};
