import fs from 'fs';
import path from 'path';
import Sequelize, { DataTypes } from 'sequelize';
import logger from '../config/winston';

const basename = path.basename(__filename);
const config = require(__dirname + '/../config/database.js').development;
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

fs.readdirSync(__dirname)
  .filter((file) => {
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
  })
  .forEach(async (file) => {
    const model = (await import(path.join(__dirname, file))).default(sequelize, DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.connectDB = async () => {
  try {
    await sequelize.authenticate();
    logger.info('Server is connection to MySQL Database');
  } catch (error) {
    logger.error('Error connecting to Database:', error);
  }
};

export default db;
