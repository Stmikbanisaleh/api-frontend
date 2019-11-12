/* eslint-disable camelcase */
const express = require('express');
const kegiatanSchema = require('../models/kegiatan_model');
const checkauth = require('../middleware/validation');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Expresssssss' });
});

router.post('/getkegiatan', checkauth, (req, res) => {
  kegiatanSchema.sequelize.query('SELECT `kegiatan`.*,`posisi`.`id_posisi`,`posisi`.`nama_web` '
  + 'FROM `kegiatan` '
  + 'JOIN `posisi` ON `posisi`.`id_posisi` = `kegiatan`.`id_posisi`').then((response) => {
    res.status(200).json(response);
  }).catch((e) => {
    res.status(500).json(e);
  });
});

router.post('/getkegiatanbyid', checkauth, (req, res) => {
  kegiatanSchema.findAndCountAll({
    where: {
      id_kegiatan: req.body.id_kegiatan,
    },
  }).then((response) => {
    res.status(200).json(response);
  }).catch((e) => {
    res.status(500).json(e);
  });
});

router.post('/getkegiatanmt', checkauth, (req, res) => {
  kegiatanSchema.sequelize.query('SELECT * FROM kegiatan '+
  'WHERE id_posisi=2 '+
  'ORDER BY id_kegiatan DESC LIMIT 1').then((response) => {
    res.status(200).json({
      status: 200,
      rows: response[0],
  });
  }).catch((e) => {
    res.status(500).json(e);
  });
});

router.post('/getkegiatanat', checkauth, (req, res) => {
  kegiatanSchema.sequelize.query('SELECT * FROM '+
  'kegiatan WHERE id_posisi=3 '+
  'ORDER BY id_kegiatan DESC LIMIT 1').then((response) => {
    res.status(200).json({
      status: 200,
      rows: response[0],
  });
  }).catch((e) => {
    res.status(500).json(e);
  });
});

router.post('/getkegiatanst', checkauth, (req, res) => {
  kegiatanSchema.sequelize.query('SELECT * FROM kegiatan '+
  'WHERE id_posisi=4 '+
  'ORDER BY id_kegiatan DESC LIMIT 1').then((response) => {
    res.status(200).json({
      status: 200,
      rows: response[0],
  });
  }).catch((e) => {
    res.status(500).json(e);
  });
});

router.post('/getisihalaman', checkauth, (req, res) => {
  kegiatanSchema.sequelize.query('SELECT * FROM kegiatan '+
  'WHERE id_posisi=4 '+
  'ORDER BY id_kegiatan DESC LIMIT 1').then((response) => {
    res.status(200).json({
      status: 200,
      rows: response[0],
  });
  }).catch((e) => {
    res.status(500).json(e);
  });
});

module.exports = router;
