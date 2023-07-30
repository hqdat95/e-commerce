export default {
  up: async (queryInterface, Sequelize) => {
    const generateCategory = async (name, parentId) => {
      const category = {
        id: Sequelize.literal('UUID()'),
        name: name,
        parentId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await queryInterface.bulkInsert('categories', [category]);

      const id = await queryInterface.rawSelect('categories', { where: { name: category.name } }, ['id']);

      return id;
    };

    const parentName = 'Laptop';
    const childName = 'Apple';
    const grandChildNames = ['Macbook Pro', 'Macbook Air'];

    const parentId = await generateCategory(parentName, null);
    const childId = await generateCategory(childName, parentId);

    await Promise.all(grandChildNames.map((name) => generateCategory(name, childId)));
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('categories', null, {});
  },
};
