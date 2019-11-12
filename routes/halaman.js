/* eslint-disable camelcase */
const express = require('express');
const Joi = require('joi');
const fs = require('fs');
const moment = require('moment');
const halamanSchema = require('../models/halaman_model');
const checkauth = require('../middleware/validation');


const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Expresssssss' });
});

router.post('/gethalamanbyid', checkauth, (req, res) => {
  halamanSchema.findAndCountAll({
    where: {
      id_halaman: req.body.id_halaman,
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
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
        status: 500,
      });
    });
});

router.post('/getisihalaman', checkauth, (req, res) => {

  const payload = {
    seo: req.body.seo
  }

  let validate = Joi.object().keys({
    seo: Joi.string().required()
  });
  Joi.validate(payload, validate, (error) => {
    halamanSchema.sequelize.query('SELECT * FROM halamanstatis '+
    'WHERE judul_seo = "'+req.body.seo+'"').then((response) => {
      res.status(200).json({
        'status': 200,
        rows: response[0],
      })
    })
    if (error) {
      res.status(400).json({
        'status': 400,
        'message': '' +error,
        // 'messages': error,
      })
    }
  })

});

module.exports = router;
