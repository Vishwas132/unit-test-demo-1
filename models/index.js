'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize').Sequelize;
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
let config = require("../config/config.json")[env];
const db = {};

const {createNamespace} = require("cls-hooked");
const cls = createNamespace("unit-test-demo");
Sequelize.useCLS(cls);

const sequelize = new Sequelize(config.database, config.username, config.password, config);

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
