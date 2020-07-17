const { STRING, UUID, UUIDV4 } = require('sequelize');
const db = require('../index');
const chalk = require('chalk');

const School = db.define('school', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  name: {
    type: STRING,
    allowNull: false,
  },
  imgURL: {
    type: STRING,
    validate: {
      isUrl: true,
    },
  },
});

module.exports = School;
