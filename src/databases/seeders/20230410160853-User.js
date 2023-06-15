import bcrypt from 'bcryptjs';

export default {
  up: async (queryInterface, Sequelize) => {
    const users = [];

    for (let i = 1; i < 21; i++) {
      const passwordHash = await bcrypt.hash('customer@12', 10);

      users.push({
        id: Sequelize.literal('UUID()'),
        fullName: `User00${i}`,
        email: `User.00${i}@gmail.com`,
        password: passwordHash,
        role: 'customer',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert('users', users);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
