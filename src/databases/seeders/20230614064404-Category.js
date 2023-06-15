export default {
  up: async (queryInterface, Sequelize) => {
    const parentCategories = [
      'Electronics',
      'Books',
      'Clothes',
      'Toys',
      'Furniture',
      'Shoes',
      'Bags',
      'Watches',
      'Jewelry',
      'Sports',
    ];
    const childCategories = [
      'Phones',
      'Laptops',
      'Tablets',
      'TVs',
      'Cameras',
      'Speakers',
      'Headphones',
      'Printers',
      'Game Consoles',
      'Drones',
    ];

    const categories = [];

    for (let i = 0; i < parentCategories.length; i++) {
      categories.push({
        id: Sequelize.literal('UUID()'),
        name: parentCategories[i],
        parentId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    const electronicsCategoryId = await queryInterface.rawSelect(
      'categories',
      {
        where: { name: 'Electronics' },
      },
      ['id'],
    );

    for (let i = 0; i < childCategories.length; i++) {
      categories.push({
        id: Sequelize.literal('UUID()'),
        name: childCategories[i],
        parentId: electronicsCategoryId,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert('categories', categories);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('categories', null, {});
  },
};
