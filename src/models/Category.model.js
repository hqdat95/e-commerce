import { Model } from 'sequelize';

class Category extends Model {
  static associate(models) {
    this.hasMany(models.Category, {
      foreignKey: 'parentId',
      as: 'children',
    });

    this.belongsTo(models.Category, {
      foreignKey: 'parentId',
      as: 'parent',
    });

    this.hasMany(models.Product, {
      foreignKey: 'categoryId',
      as: 'products',
    });
  }
}

export default (sequelize, DataTypes) => {
  Category.init(
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
      parentId: {
        type: DataTypes.UUID,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Category',
      tableName: 'categories',
      timestamps: true,
      paranoid: true,
    },
  );

  return Category;
};
