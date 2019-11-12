const express = require('express');
const Joi = require('joi');
const moment = require('moment');
const fs = require('fs');
const linkSchema = require('../models/link_model');
const checkauth = require('../middleware/validation');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Expresssssss' });
});

router.post('/getlink', checkauth, (req, res) => {
  linkSchema.findAndCountAll().then((response) => {
    res.status(200).json({
      'status': 200,
      'rows': response.rows,
    })
  }).catch((e) => {
    res.status(500).json(e);
  });
});

router.post('/getlinkbyid', checkauth, (req, res) => {
  linkSchema.findAndCountAll({
    where: {
      id_link: req.body.id_link,
    },
  })
    .then((data) => {
      if (data.length < 1) {
        res.status(404).json({
          message: 'Not Found',
        });
      } else {
        res.status(200).json(data);
      }
      // });x
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
        status: 500,
      });
    });
});

module.exports = router;
