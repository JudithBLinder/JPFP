const faker = require('faker');
const Sequelize = require('sequelize');
const chalk = require('chalk');
const { School, Student } = require('../models/index');

const studentNum = 500;

const schools = [
  {
    name: 'Princeton University',
    imgURL:
      'https://www.cs.princeton.edu/courses/archive/spring19/cos226/images/princeton-shield.gif',
  },
  {
    name: 'Harvard University',
    imgURL:
      'https://upload.wikimedia.org/wikipedia/en/thumb/2/29/Harvard_shield_wreath.svg/1200px-Harvard_shield_wreath.svg.png',
  },
  {
    name: 'MIT',
    imgURL:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/License_icon-mit.svg/1200px-License_icon-mit.svg.png',
  },
  {
    name: 'Yale University',
    imgURL:
      'https://1000logos.net/wp-content/uploads/2019/06/Yale-seal-logo.jpg',
  },
  {
    name: 'Stanford University',
    imgURL: 'https://s2.thingpic.com/images/Pk/BRDR4i2hgbngFTy8oUajBrUF.png',
  },
  {
    name: 'University of Chicago',
    imgURL:
      'https://www.chicagotribune.com/resizer/Cs_1B2pFOXuJiWIbSWQm8jMTAGA=/1200x0/top/arc-anglerfish-arc2-prod-tronc.s3.amazonaws.com/public/JKFTJDQX7VEQ7N3FVURGEMRHHQ.jpg',
  },
  {
    name: 'University of Pennsylvania',
    imgURL:
      'https://cdn.uconnectlabs.com/wp-content/uploads/sites/74/2019/09/model-un-conf.png',
  },
  {
    name: 'Northwestren University',
    imgURL:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Northwestern_University_seal.svg/1200px-Northwestern_University_seal.svg.png',
  },
  {
    name: 'Duke University',
    imgURL:
      'https://upload.wikimedia.org/wikipedia/en/thumb/b/b6/Duke_University_Crest.svg/1200px-Duke_University_Crest.svg.png',
  },
  {
    name: 'Dartmouth College',
    imgURL:
      'https://upload.wikimedia.org/wikipedia/en/thumb/e/e4/Dartmouth_College_shield.svg/1200px-Dartmouth_College_shield.svg.png',
  },
  {
    name: 'Brown University',
    imgURL:
      'https://pbs.twimg.com/profile_images/1037111953573982209/hHrPXjyu_400x400.jpg',
  },
  {
    name: 'Vanderbilt University',
    imgURL:
      'https://cdn.vanderbilt.edu/vu-wp0/wp-content/uploads/sites/136/2011/02/06184913/UHC-Logo-Hex-All-Transparent-Background.jpg',
  },
  {
    name: 'Cornell University',
    imgURL:
      'https://www.publicgardens.org/sites/default/files/styles/full_width/public/field/image/cornell%20logo%203.gif?itok=RiTBg5mw',
  },
  {
    name: 'New York University',
    imgURL:
      'https://upload.wikimedia.org/wikipedia/en/thumb/1/16/New_York_University_Seal.svg/1200px-New_York_University_Seal.svg.png',
  },
];

const FakeData = async ({ force = false }) => {
  if (force) {
    for (let i = 0; i < schools.length; i++) {
      try {
        await School.create({
          name: schools[i].name,
          imgURL: schools[i].imgURL,
        });
      } catch (e) {
        console.log(chalk.red(`School Model Create Error: ${e}`));
      }
    }

    let schoolId = null;

    for (let i = 0; i < studentNum; i++) {
      let firstName = faker.fake('{{name.firstName}}');
      let lastName = faker.fake('{{name.lastName}}');
      let email = lastName + firstName + '@gmailFake.com';
      let gpa = Math.round((Math.random() * 2 + 2) * 100.0) / 100.0;
      let imgURL = faker.fake('{{image.avatar}}');
      if (i > 5) {
        let school = await School.findOne({
          order: Sequelize.literal('random()'),
        });
        schoolId = school.id;
      }

      let student = {
        firstName,
        lastName,
        email,
        gpa,
        imgURL,
        schoolId,
      };
      try {
        await Student.create({ ...student });
      } catch (e) {
        console.log(chalk.red(`Student Model Create Error ${e}`));
      }
    }
  }
};

module.exports = FakeData;
