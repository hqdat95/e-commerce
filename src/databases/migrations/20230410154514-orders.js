export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('orders', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      totalPrice: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      status_order: {
        type: Sequelize.ENUM(
          'pending',
          'confirmed',
          'shipping',
          'delivered',
          'cancelled',
        ),
        defaultValue: 'pending',
        allowNull: false,
      },
      isPaid: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      transportInfoId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'transport_infos',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null,
      },
    });

    await queryInterface.addConstraint('orders', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'fk_orders_userId',
      references: {
        table: 'users',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });

    await queryInterface.addConstraint('orders', {
      fields: ['transportInfoId'],
      type: 'foreign key',
      name: 'fk_orders_transportInfoId',
      references: {
        table: 'transport_infos',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('orders', 'fk_orders_userId');
    await queryInterface.removeConstraint(
      'orders',
      'fk_orders_transportInfoId',
    );
    await queryInterface.dropTable('orders');
  },
};
