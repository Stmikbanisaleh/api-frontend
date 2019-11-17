/* eslint-disable camelcase */
const express = require('express');
const ddesainindustriSchema = require('../models/ddesainindustri_model.js');
const checkauth = require('../middleware/validation');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Expresssssss' });
});

router.post('/getPendesainbyid', checkauth, (req, res) => {
    ddesainindustriSchema.sequelize.query('SELECT msd.*,msrev.NAMA_REV '+
    'FROM msrev '+
    'JOIN ddesainindustri msd ON msrev.id = msd.unit_kerja '+
    'WHERE msd.status = 21').then((response) => {
      res.status(200).json({
        status: 200,
        rows: response[0],
    });
    }).catch((e) => {
      res.status(500).json(e);
    });
  });

module.exports = router;
