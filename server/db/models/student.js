const { FLOAT, STRING, UUID, UUIDV4 } = require('sequelize');
const db = require('../index');

const Student = db.define('student', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  firstName: {
    type: STRING,
    allowNull: false,
  },
  lastName: {
    type: STRING,
    allowNull: false,
  },
  email: {
    type: STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  gpa: {
    type: FLOAT,
    validate: {
      max: 4.0,
      min: 0.0,
    },
  },
  imgURL: {
    type: STRING,
    validate: {
      isUrl: true,
    },
  },
});

module.exports = Student;
