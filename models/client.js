const Sequelize = require('sequelize');
// const base = require('react-native-base64')
const db = require('../config/database');

const client = db.define('client', {

  user_id: {
    type: Sequelize.INTEGER
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
  payment: {
    type:   Sequelize.ENUM,
    values: ['Payment Pending','Payment Received']
  },
  // status: {
  //   type: Sequelize.ENUM({values:['InProcess','Inactive','Completed']})
  // },
  fees: {
    type: Sequelize.STRING
  },
  token: {
    type: Sequelize.STRING
  },
  balance: {
    type: Sequelize.STRING
  },
});




client.sync().then(() => {
  console.log('table created');
});
module.exports = client;
