import bcrypt from 'bcryptjs';
import isRoles from '../../constants/users.roles';

export default {
  up: async (queryInterface, Sequelize) => {
    const adminRole = isRoles.ADMIN;

    const adminExists = await queryInterface.sequelize.query(`SELECT * FROM users WHERE role = :role`, {
      replacements: { role: adminRole },
      type: queryInterface.sequelize.QueryTypes.SELECT,
    });

    if (adminExists.length === 0) {
      const adminUser = {
        id: Sequelize.literal('UUID()'),
        fullName: 'admin',
        email: 'admin@gmail.com',
        password: await bcrypt.hash('admin@12', 10),
        role: adminRole,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await queryInterface.bulkInsert('users', [adminUser]);
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
