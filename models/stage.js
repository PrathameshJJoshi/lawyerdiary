const Sequelize = require('sequelize');
// const base = require('react-native-base64')
const db = require('../config/database');

const stage = db.define('stage', {

  user_id: {
    type:   Sequelize.INTEGER
  },
  matter_type: {
    type:   Sequelize.ENUM,
    values: ['Issue Notice','Case Filling','Review','Apeal']
  },
  prev_date: {
    type: Sequelize.DATEONLY
  },
  court_name: {
    type: Sequelize.STRING
  },
  case_no: {
    type: Sequelize.STRING
  },
  name_party: {
    type: Sequelize.STRING
  },
  stage: {
    type: Sequelize.STRING
  },
  next_date: {
    type: Sequelize.DATEONLY
  },
  next_stage: {
    type: Sequelize.STRING
  },
  case_brif: {
    type: Sequelize.STRING
  },
});




stage.sync().then(() => {
  console.log('table created');
});
module.exports = stage;
