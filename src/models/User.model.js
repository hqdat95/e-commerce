import { Model } from 'sequelize';
import bcrypt from 'bcryptjs';
import isRoles from '../constants/users.roles';

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
      },
      role: {
        type: DataTypes.ENUM,
        values: Object.values(isRoles),
        allowNull: false,
        defaultValue: isRoles.CUSTOMER,
      },
      isGoogleLogin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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
    if (user.password) {
      user.password = await bcrypt.hash(user.password, parseInt(process.env.HASH_PASSWORD_SALT));
    }
  });

  User.beforeUpdate(async (user) => {
    if (user.changed('password')) {
      user.password = await bcrypt.hash(user.password, parseInt(process.env.HASH_PASSWORD_SALT));
    }
  });

  User.prototype.toJSON = function () {
    if (this instanceof User) {
      const user = { ...this.get() };
      delete user.password;
      return user;
    }
  };

  return User;
};
