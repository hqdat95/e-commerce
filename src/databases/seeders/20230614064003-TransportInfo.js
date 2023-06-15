export default {
  up: async (queryInterface, Sequelize) => {
    const transportInfos = [];

    for (let i = 1; i < 21; i++) {
      transportInfos.push({
        id: Sequelize.literal('UUID()'),
        name: `User${i} Transport`,
        phone: `090505050${i}`,
        address: `Address ${i}`,
        userId: Sequelize.literal('(SELECT id FROM users LIMIT 1 OFFSET ' + (i - 1) + ')'),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert('transport_infos', transportInfos);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('transport_infos', null, {});
  },
};
