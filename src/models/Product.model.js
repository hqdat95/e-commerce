import { Model } from 'sequelize';

class Product extends Model {
  static associate(models) {
    this.belongsTo(models.Category, {
      foreignKey: 'categoryId',
      as: 'category',
    });

    this.hasMany(models.ProductImage, {
      foreignKey: 'productId',
      as: 'image',
    });

    this.hasMany(models.OrderItem, {
      foreignKey: 'productId',
      as: 'orderItem',
    });

    this.hasMany(models.CartItem, {
      foreignKey: 'productId',
      as: 'cartItem',
    });

    this.belongsTo(models.ProductWishlist, {
      foreignKey: 'productId',
      as: 'wishlist',
    });
  }
}

export default (sequelize, DataTypes) => {
  Product.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      categoryId: {
        type: DataTypes.UUID,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Product',
      tableName: 'products',
      timestamps: true,
      paranoid: true,
    },
  );

  return Product;
};
