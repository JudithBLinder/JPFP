const { Router } = require('express');
const chalk = require('chalk');
const { School, Student } = require('../../db/models/index');

const apiRouter = Router();

// School model api requests
apiRouter.get('/schools', async (req, res) => {
  console.log(chalk.cyan(`request was made to get ${req.path}`));
  try {
    const schools = await School.findAll();
    res.send({
      schools,
    });
  } catch (e) {
    console.log(chalk.red(e));
    res.status(500).send({
      message: `Error getting ${req.path} from DB`,
    });
  }
});

// Student model api requests
apiRouter.get('/students', async (req, res) => {
  console.log(chalk.cyan(`request was made to get ${req.path}`));
  try {
    const students = await Student.findAll();
    res.send({
      students,
    });
  } catch (e) {
    console.log(chalk.red(e));
    res.status(500).send({
      message: `Error getting ${req.path} from DB`,
    });
  }
});

apiRouter.put('/students/:id', async (req, res) => {
  console.log(chalk.cyan(`request was made to put ${req.path}`));
  if (!req.body.schoolId) {
    req.body.schoolId = null;
  }
  try {
    await Student.update(
      { schoolId: req.body.schoolId },
      { where: { id: req.params.id } }
    );
    res.sendStatus(200);
  } catch (e) {
    console.log(chalk.red(e));
    res.status(500).send({
      message: `Error updating ${req.path} from DB`,
    });
  }
});

apiRouter.post('/students', async (req, res) => {
  console.log(chalk.cyan(`request was made to post ${req.path}`));
  const student = req.body.state;
  if (student.schoolId === '') {
    student.schoolId = null;
  }
  console.log(student);
  try {
    await Student.create({ ...student });
    res.sendStatus(200);
  } catch (e) {
    console.log(chalk.red(e));
    res.status(500).send({
      message: `Error updating ${req.path} from DB`,
      error: e,
    });
  }
});

apiRouter.delete('/students/:id', async (req, res) => {
  console.log(chalk.cyan(`request was made to delete ${req.path}`));
  try {
    await Student.destroy({ where: { id: req.params.id } });
    res.sendStatus(200);
  } catch (e) {
    console.log(chalk.red(e));
    res.status(500).send({
      message: `Error deleting ${req.path} from DB`,
    });
  }
});

module.exports = apiRouter;
