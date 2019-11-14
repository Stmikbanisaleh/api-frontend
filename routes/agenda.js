/* eslint-disable camelcase */
const express = require('express');
const agendaSchema = require('../models/agenda_model');
const checkauth = require('../middleware/validation');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Expresssssss' });
});

router.post('/jmlagenda', (req, res) => {
  agendaSchema.count().then((response) => {
    res.status(200).json(response);
  }).catch((e) => {
    res.status(500).json(e);
  });
});

router.post('/getagendabyid', checkauth, (req, res) => {
  agendaSchema.findAndCountAll({
    where: {
      id_agenda: req.body.id_agenda,
    },
  }).then((response) => {
    res.status(200).json(response);
  }).catch((e) => {
    res.status(500).json(e);
  });
});

router.post('/getagendapaging', checkauth, (req, res) => {
  if(req.body.start){
    agendaSchema.sequelize.query('select * from agenda order by tanggal_awal desc limit '+req.body.limit +','+ req.body.start).then((response) => {
      res.status(200).json(response[0]);
    }).catch((e) => {
      res.status(500).json(e);
    });
  }else{
    agendaSchema.sequelize.query('select * from agenda order by tanggal_awal desc limit '+req.body.limit).then((response) => {
      res.status(200).json(response[0]);
    }).catch((e) => {
      res.status(500).json(e);
    });
  }
});

router.post('/getlistagenda', checkauth, (req, res) => {
  agendaSchema.sequelize.query('SELECT * '+
  'FROM agenda ').then((response) => {
    res.status(200).json({
      status: 200,
      rows: response[0],
  });
  }).catch((e) => {
    res.status(500).json(e);
  });
});

router.post('/getlistagendalimit3', checkauth, (req, res) => {
  agendaSchema.sequelize.query('SELECT * '+
  'FROM agenda '+
  'ORDER BY id_agenda DESC LIMIT 3').then((response) => {
    res.status(200).json({
      status: 200,
      rows: response[0],
  });
  }).catch((e) => {
    res.status(500).json(e);
  });
});

module.exports = router;
