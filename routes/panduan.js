const express = require('express');
const Joi = require('joi');
const panduanSchema = require('../models/panduan_model');
const checkauth = require('../middleware/validation');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Expresssssss' });
});

router.post('/getpanduan', checkauth, (req, res) => {
    panduanSchema.findAndCountAll().then((response) => {
      res.status(200).json(response);
    }).catch((e) => {
      res.status(500).json(e);
    });
  });


module.exports = router;