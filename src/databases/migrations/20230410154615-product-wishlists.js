export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('product_wishlists', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
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
      productId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'products',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
    });

    await queryInterface.addConstraint('product_wishlists', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'fk_product_wishlists_userId',
      references: {
        table: 'users',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });

    await queryInterface.addConstraint('product_wishlists', {
      fields: ['productId'],
      type: 'foreign key',
      name: 'fk_product_wishlists_productId',
      references: {
        table: 'products',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      'product_wishlists',
      'fk_product_wishlists_userId',
    );
    await queryInterface.removeConstraint(
      'product_wishlists',
      'fk_product_wishlists_productId',
    );
    await queryInterface.dropTable('product_wishlists');
  },
};
