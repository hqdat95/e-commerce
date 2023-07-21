import { Model } from 'sequelize';

class Order extends Model {
  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });

    this.hasMany(models.OrderItem, {
      foreignKey: 'orderId',
      as: 'orderItems',
    });

    this.hasOne(models.TransportInfo, {
      foreignKey: 'orderId',
      as: 'transportInfo',
    });

    this.hasOne(models.Payment, {
      foreignKey: 'orderId',
      as: 'payment',
    });
  }
}

export default (sequelize, DataTypes) => {
  Order.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      totalPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      status_order: {
        type: DataTypes.ENUM('pending', 'confirmed', 'shipping', 'delivered', 'cancelled'),
        allowNull: false,
        defaultValue: 'pending',
      },
      isPaid: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      transportInfoId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Order',
      tableName: 'orders',
      timestamps: true,
      paranoid: true,
    },
  );

  return Order;
};
