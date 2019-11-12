const express = require('express');
const Joi = require('joi');
const menuSchema = require('../models/menu_model');
const checkauth = require('../middleware/validation');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Expresssssss' });
});

router.post('/getmenu', checkauth, (req, res) => {
  menuSchema.findAndCountAll().then((response) => {
    res.status(200).json({
      'status': 200,
      'rows': response.rows,
    })
  }).catch((e) => {
    res.status(500).json(e);
  });
});

router.post('/getmenuwhere', checkauth, (req, res) => {
  const payload = {
    id_posisi: req.body.id_posisi,
  }

  let validate = Joi.object().keys({
    id_posisi: Joi.string().required()
  });
  Joi.validate(payload, validate, (error) => {
    menuSchema.sequelize.query('SELECT * FROM menu '+
    'WHERE id_parent = "'+req.body.id_parent+'" AND id_posisi = "'+req.body.id_posisi+'"').then((response) => {
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

router.post('/getparentmenu', checkauth, (req, res) => {
  menuSchema.sequelize.query('SELECT id_menu,nama_menu FROM menu').then((response) => {
    res.status(200).json(response);
  }).catch((e) => {
    res.status(500).json(e);
  });
});


module.exports = router;
