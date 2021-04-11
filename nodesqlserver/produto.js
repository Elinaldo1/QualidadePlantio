const Sequelize = require('sequelize');
const database = require('./db');

const  logagricola = database.define('logagricola', {
  id:{
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey:true
  },
  tplog:{
    type: Sequelize.INTEGER,
    allowNull: false
  },
  data:{
    type: Sequelize.DATE,
    allowNull: true
  },
  frota:{
    type: Sequelize.STRING,
    allowNull: false
  },
  local:{
    type: Sequelize.STRING,
  },
  idparada:{
    type: Sequelize.INTEGER,
  },
  status:{
    type: Sequelize.STRING,
  },
  dtretorno:{
    type: Sequelize.DATE,
    allowNull: true
  },
  obs:{
    type: Sequelize.STRING,
  },
  idoperacao:{
    type: Sequelize.INTEGER,
  },
  trela:{
    type: Sequelize.STRING,
    allowNull: true
  }
});

module.exports = logagricola;


// const Model = Sequelize.Model;
// class prod extends Model {}
// prod.init({
//     id:{
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         allowNull: false,
//         primaryKey:true
//       },
//       tplog:{
//         type: Sequelize.INTEGER,
//         allowNull: false
//       },
//       data:{
//         type: Sequelize.DATE,
//         allowNull: true
//       },
//       frota:{
//         type: Sequelize.STRING,
//         allowNull: false
//       },
//       local:{
//         type: Sequelize.STRING,
//       },
//       idparada:{
//         type: Sequelize.INTEGER,
//       },
//       status:{
//         type: Sequelize.STRING,
//       },
//       dtretorno:{
//         type: Sequelize.DATE,
//         allowNull: true
//       },
//       obs:{
//         type: Sequelize.STRING,
//       },
//       idoperacao:{
//         type: Sequelize.INTEGER,
//       },
//       trela:{
//         type: Sequelize.STRING,
//         allowNull: true
//       }
// }, {
//   sequelize,
//   modelName: 'prod'
//   // options
// });