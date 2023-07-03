export default {
  up: async (queryInterface, Sequelize) => {
    const laptops = [
      'MacBook Pro 14inch',
      'MacBook Pro 15inch',
      'MacBook Air 14inch',
      'MacBook Air 15inch',
      'Dell XPS 14inch',
      'Dell XPS 15inch',
      'Dell Inspiron 14inch',
      'Dell Inspiron 15inch',
      'ROG Strix 14inch',
      'ROG Strix 15inch',
      'ROG Zephyrus 14inch',
      'ROG Zephyrus 15inch',
      'MSI GF65 14inch',
      'MSI GF65 15inch',
      'MSI Prestige 14inch',
      'MSI Prestige 15inch',
      'Asus ZenBook 14inch',
      'Asus ZenBook 15inch',
      'Asus VivoBook 14inch',
      'Asus VivoBook 15inch',
    ];

    const products = [];

    for (let i = 0; i < laptops.length; i++) {
      products.push({
        id: Sequelize.literal('UUID()'),
        name: laptops[i],
        description: `Laptop ${laptops[i]}`,
        price: ((i + 1) * 100).toFixed(2),
        quantity: (i + 1) * 10,
        categoryId: Sequelize.literal('(SELECT id FROM categories WHERE name = "Laptop" LIMIT 1)'),
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
