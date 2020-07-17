const School = require('./school');
const Student = require('./student');

Student.belongsTo(School, {
  onDelete: 'cascade',
  hooks: true,
  foreignKey: { allowNull: true },
});

module.exports = {
  Student,
  School,
};
