/* eslint-disable camelcase */
const express = require('express');
const beritaSchema = require('../models/berita_model');
const checkauth = require('../middleware/validation');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Expresssssss' });
});

router.post('/getlistberita', checkauth, (req, res) => {
  beritaSchema.sequelize.query('SELECT id_berita,judul,judul_seo,tanggal '+
  'FROM berita '+
  'ORDER BY id_berita DESC '+
  'LIMIT 6').then((response) => {
    res.status(200).json({
      status: 200,
      rows: response[0],
  });
  }).catch((e) => {
    res.status(500).json(e);
  });
});

module.exports = router;
