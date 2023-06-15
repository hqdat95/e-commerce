export default {
  up: async (queryInterface, Sequelize) => {
    const productImages = [];

    for (let i = 1; i < 11; i++) {
      productImages.push({
        id: Sequelize.literal('UUID()'),
        url: `https://example.com/product${i}.jpg`,
        productId: Sequelize.literal('(SELECT id FROM products LIMIT 1 OFFSET ' + (i - 1) + ')'),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert('product_images', productImages);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('product_images', null, {});
  },
};
