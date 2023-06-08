const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: '../db/database.sqlite'
})
const Chat = sequelize.define('Chat', {
  // Model attributes are defined here
  question: {
    type: DataTypes.STRING,
    allowNull: false
  },
  answer: {
    type: DataTypes.STRING,
    allowNull: false
    // allowNull defaults to true
  }
}, {
  // Other model options go here
});

// sequelize.define also returns the model
// console.log(User === sequelize.models.User); // true
(async function sync(){
    await Chat.sync({ force: false });
})()
module.exports=Chat
