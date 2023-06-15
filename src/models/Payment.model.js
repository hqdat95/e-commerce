import { Model } from 'sequelize';

class Payment extends Model {
  static associate(models) {
    this.hasOne(models.Order, { foreignKey: 'orderId' });
  }
}

export default (sequelize, DataTypes) => {
  Payment.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      method: {
        type: DataTypes.ENUM('cod', 'stripe'),
        allowNull: false,
        defaultValue: 'cod',
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      orderId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Payment',
      tableName: 'payments',
      timestamps: true,
      paranoid: true,
    },
  );

  return Payment;
};
