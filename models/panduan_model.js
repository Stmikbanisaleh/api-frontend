const Sequelize = require('sequelize');
const sequelize = require('../lib/connection');

const panduanmodel = sequelize.define('dokumen_panduan', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  nama: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  nama_file: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  size: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  kode_input: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  tgl_input: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
}, {
  freezeTableName: true,
});

// force: true will drop the table if it already exists
panduanmodel.sync({ force: false }).then(() => {
// Table created
// return mspaten.create({
//     name: 'admin',
//     password: 'admin',
//     email : 'imamsatrianta@gmail.com'
// });
});
module.exports = panduanmodel;