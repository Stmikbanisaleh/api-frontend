const express = require('express');
const Joi = require('joi');
const visitormessageSchema = require('../models/visitormessage_model');
const checkauth = require('../middleware/validation');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Expresssssss' });
});

router.post('/addmessage', checkauth, async (req, res) => {
  const payload = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    subject: Joi.string().required(),
    message: Joi.string().required(),
    date: Joi.string().required(),
  });

  const schema = {
    name: req.body.name,
    email: req.body.email,
    subject: req.body.subject,
    message: req.body.message,
    date: req.body.date,
  };


  try {
    Joi.validate(schema, payload, () => {
        visitormessageSchema.create({
            name: req.body.name,
            email: req.body.email,
            subject: req.body.subject,
            message: req.body.message,
            date: req.body.date,
        }).then((data) => {
            res.json({
            status: 200,
            data,
            message: 'Message berhasil ditambahkan',
            });
        }).catch((error) => {
            res.status(500).json({
            status: 500,
            error: error.message,
            });
        });
        });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }

});

module.exports = router;
