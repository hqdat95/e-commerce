import { Model } from 'sequelize';

class ProductImage extends Model {
  static associate(models) {
    this.belongsTo(models.Product, { foreignKey: 'productId' });
  }
}

export default (sequelize, DataTypes) => {
  ProductImage.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      productId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'ProductImage',
      tableName: 'product_images',
      timestamps: true,
      paranoid: true,
    },
  );

  return ProductImage;
};
