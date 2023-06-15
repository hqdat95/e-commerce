import { Model } from 'sequelize';

class ProductWishlist extends Model {
  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });

    this.hasMany(models.Product, {
      foreignKey: 'productId',
      as: 'product',
    });
  }
}

export default (sequelize, DataTypes) => {
  ProductWishlist.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      productId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'ProductWishlist',
      tableName: 'product_wishlists',
      timestamps: false,
    },
  );

  return ProductWishlist;
};
