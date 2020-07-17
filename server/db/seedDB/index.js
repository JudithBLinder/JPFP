const db = require('../index');
const chalk = require('chalk');
const FakeData = require('./fakerGenerate');

const seedFakeData = ({ force = false }) => {
  return new Promise((res, rej) => {
    FakeData({ force });
    res(console.log(chalk.greenBright(`Fake data seeded!`)));
  });
};

const syncAndSeed = async ({ force = false }) => {
  try {
    console.log(chalk.red(`Force = ${force}`));
    await db.sync({ force });
    console.log(chalk.greenBright(`Database synced successfully!`));
    await seedFakeData({ force });
    console.log(chalk.greenBright(`Database seeded successfully!`));
  } catch (e) {
    console.log(chalk.red(`Database failed to sync.`));
    throw e;
  }
};

module.exports = { seedFakeData, syncAndSeed };
