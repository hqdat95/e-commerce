import { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static associate(models) {
    this.hasMany(models.Order, {
      foreignKey: 'userId',
      as: 'order',
    });

    this.hasOne(models.CartItem, {
      foreignKey: 'userId',
      as: 'cartItem',
    });

    this.hasMany(models.ProductWishlist, {
      foreignKey: 'userId',
      as: 'productWishlist',
    });

    this.hasMany(models.TransportInfo, {
      foreignKey: 'userId',
      as: 'transportInfo',
    });
  }
}

export default (sequelize, DataTypes) => {
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM('admin', 'customer'),
        allowNull: false,
        defaultValue: 'customer',
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      timestamps: true,
      paranoid: true,
    },
  );

  User.beforeCreate(async (user) => {
    user.password = await bcrypt.hash(user.password, parseInt(process.env.HASH_PASSWORD_SALT));
  });

  return User;
};
