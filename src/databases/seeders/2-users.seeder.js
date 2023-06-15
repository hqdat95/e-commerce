import bcrypt from 'bcryptjs';
import isRoles from '../../constants/users.roles';

export default {
  up: async (queryInterface, Sequelize) => {
    const roles = [isRoles.MODERATOR, isRoles.CUSTOMER];
    const roleNames = ['moderator', 'customer'];

    const users = [];
    for (let i = 0; i < 4; i++) {
      const roleName = roleNames[Math.floor(i / 2)];
      const fullName = `${roleName}_00${(i % 2) + 1}`;
      const email = `${roleName}_00${(i % 2) + 1}@gmail.com`;

      const user = {
        id: Sequelize.literal('UUID()'),
        fullName,
        email,
        password: await bcrypt.hash(`${roleName}@12`, 10),
        role: roles[Math.floor(i / 2)],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      users.push(user);
    }

    await queryInterface.bulkInsert('users', users);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
