export default {
  up: async (queryInterface, Sequelize) => {
    const products = [];

    for (let i = 1; i < 21; i++) {
      products.push({
        id: Sequelize.literal('UUID()'),
        name: `Product${i}`,
        description: `This is product ${i}`,
        price: (i * 100).toFixed(2),
        quantity: i * 10,
        categoryId: Sequelize.literal('(SELECT id FROM categories LIMIT 1 OFFSET ' + (i - 1) + ')'),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert('products', products);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('products', null, {});
  },
};
