const Sequelize = require('sequelize');
// const base = require('react-native-base64')
const db = require('../config/database');

const opponent = db.define('opponent', {

  client_name: {
    type: Sequelize.STRING
  },
  date: {
    type: Sequelize.DATEONLY
  },
  name: {
    type: Sequelize.STRING
  },
  mobile: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  age: {
    type: Sequelize.STRING
  },
  address: {
    type: Sequelize.STRING
  },
  occupation: {
    type: Sequelize.STRING
  },
  case_brif: {
    type: Sequelize.STRING
  },
});




opponent.sync().then(() => {
  console.log('table created');
});
module.exports = opponent;
