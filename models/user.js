const Sequelize = require('sequelize');
// const base = require('react-native-base64')
const db = require('../config/database');

const user = db.define('user', {
  fname: {
    type: Sequelize.STRING
  },
  lname: {
    type: Sequelize.STRING
  },
  phone: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  address: {
    type: Sequelize.STRING
  },
  qualification: {
    type: Sequelize.STRING
  },
  username: {
    type: Sequelize.STRING,
    unique:true
  },
  password: {
    type: Sequelize.STRING
  },
});



user.sync().then(() => {
  console.log('table created');
});
module.exports = user;
