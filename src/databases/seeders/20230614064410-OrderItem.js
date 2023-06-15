export default {
  up: async (queryInterface, Sequelize) => {
    const orderItems = [];

    for (let i = 1; i <= 10; i++) {
      orderItems.push({
        id: Sequelize.literal('UUID()'),
        quantity: Math.floor(Math.random() * 10) + 1,
        price: (Math.random() * 100).toFixed(2),
        orderId: Sequelize.literal('(SELECT id FROM orders LIMIT 1 OFFSET ' + (i - 1) + ')'),
        productId: Sequelize.literal('(SELECT id FROM products LIMIT 1 OFFSET ' + (i - 1) + ')'),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert('order_items', orderItems);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('order_items', null, {});
  },
};
