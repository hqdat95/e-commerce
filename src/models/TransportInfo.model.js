import { Model } from 'sequelize';

class TransportInfo extends Model {
  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'transportInfoId',
      as: 'user',
    });
  }
}

export default (sequelize, DataTypes) => {
  TransportInfo.init(
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
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      isDefault: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'TransportInfo',
      tableName: 'transport_infos',
      timestamps: true,
      paranoid: true,
    },
  );

  return TransportInfo;
};
