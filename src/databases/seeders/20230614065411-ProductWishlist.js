export default {
  up: async (queryInterface, Sequelize) => {
    const wishlists = [];

    for (let i = 1; i <= 11; i++) {
      wishlists.push({
        id: Sequelize.literal('UUID()'),
        userId: Sequelize.literal('(SELECT id FROM users LIMIT 1 OFFSET ' + (i - 1) + ')'),
        productId: Sequelize.literal('(SELECT id FROM products LIMIT 1 OFFSET ' + (i - 1) + ')'),
      });
    }

    await queryInterface.bulkInsert('product_wishlists', wishlists);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('product_wishlists', null, {});
  },
};
