export default {
  up: async (queryInterface, Sequelize) => {
    const cartItems = [];

    for (let i = 1; i <= 11; i++) {
      cartItems.push({
        id: Sequelize.literal('UUID()'),
        quantity: i,
        userId: Sequelize.literal('(SELECT id FROM users LIMIT 1 OFFSET ' + (i - 1) + ')'),
        productId: Sequelize.literal('(SELECT id FROM products LIMIT 1 OFFSET ' + (i - 1) + ')'),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert('cart_items', cartItems);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('cart_items', null, {});
  },
};
