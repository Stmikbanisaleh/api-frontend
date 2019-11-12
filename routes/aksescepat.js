const express = require('express');
const Joi = require('joi');
const aksescepatSchema = require('../models/aksescepat_model');
const checkauth = require('../middleware/validation');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Expresssssss' });
});

router.post('/getaksescepat', checkauth, (req, res) => {
  aksescepatSchema.findAndCountAll().then((response) => {
    res.status(200).json({
      'status': 200,
      'rows': response.rows,
    })
  }).catch((e) => {
    res.status(500).json(e);
  });
});

router.post('/getaksescepatbyid', checkauth, (req, res) => {
  aksescepatSchema.findAndCountAll({
    where: {
      id_akses: req.body.id_akses,
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
