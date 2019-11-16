/* eslint-disable camelcase */
const express = require('express');
const msdesainindustriSchema = require('../models/msdesainindustri_model.js');
const checkauth = require('../middleware/validation');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Expresssssss' });
});

router.post('/getdesain', checkauth, (req, res) => {
    msdesainindustriSchema.sequelize.query('SELECT msd.*,msrev.NAMA_REV '+
    'FROM msrev '+
    'JOIN msdesainindustri msd ON msrev.id = msd.unit_kerja '+
    'WHERE msd.status = 21').then((response) => {
      res.status(200).json({
        status: 200,
        rows: response[0],
    });
    }).catch((e) => {
      res.status(500).json(e);
    });
  });

  router.post('/getjumlahdesain', checkauth, (req, res) => {
    msdesainindustriSchema.sequelize.query('SELECT YEAR(tgl_input) as tahun,count(*) as total '+
    'from msdesainindustri '+
    'WHERE `status` = 21 GROUP BY YEAR(tgl_input)').then((response) => {
      res.status(200).json({
        status: 200,
        rows: response[0],
    });
    }).catch((e) => {
      res.status(500).json(e);
    });
  });

  router.post('/getdesainbyid', checkauth, (req, res) => {
    msdesainindustriSchema.sequelize.query('SELECT msdesainindustri.*, '+
            '(SELECT NAMA_REV FROM msrev WHERE ID = msdesainindustri.UNIT_KERJA) as SATUAN_KERJA, '+
            '(SELECT NAMA_REV FROM msrev WHERE ID = msdesainindustri.STATUS) as STATUS '+
        'FROM msdesainindustri '+
        'WHERE msdesainindustri.ID ='+req.body.id).then((response) => {
        res.status(200).json({
            status: 200,
            rows: response[0],
        });
    }).catch((e) => {
      res.status(500).json(e);
    });
  });

router.post('/jmlmsdesainindustri', (req, res) => {
  msdesainindustriSchema.count().then((response) => {
    res.status(200).json(response);
  }).catch((e) => {
    res.status(500).json(e);
  });
});

// router.post('/getmsdesainindustribyid', checkauth, (req, res) => {
//   msdesainindustriSchema.findAndCountAll({
//     where: {
//       id: req.body.id,
//     },
//   }).then((response) => {
//     res.status(200).json(response);
//   }).catch((e) => {
//     res.status(500).json(e);
//   });
// });

// router.post('/getmsdesainindustripaging', checkauth, (req, res) => {
//   if(req.body.start){
//     msdesainindustriSchema.sequelize.query('select * from msdesainindustri order by tanggal_awal desc limit '+req.body.limit +','+ req.body.start).then((response) => {
//       res.status(200).json(response[0]);
//     }).catch((e) => {
//       res.status(500).json(e);
//     });
//   }else{
//     msdesainindustriSchema.sequelize.query('select * from msdesainindustri order by tanggal_awal desc limit '+req.body.limit).then((response) => {
//       res.status(200).json(response[0]);
//     }).catch((e) => {
//       res.status(500).json(e);
//     });
//   }
// });

// router.post('/getlistmsdesainindustri', checkauth, (req, res) => {
//   msdesainindustriSchema.sequelize.query('SELECT * '+
//   'FROM msdesainindustri ').then((response) => {
//     res.status(200).json({
//       status: 200,
//       rows: response[0],
//   });
//   }).catch((e) => {
//     res.status(500).json(e);
//   });
// });

// router.post('/getlistmsdesainindustrilimit3', checkauth, (req, res) => {
//   msdesainindustriSchema.sequelize.query('SELECT * '+
//   'FROM msdesainindustri '+
//   'ORDER BY id DESC LIMIT 3').then((response) => {
//     res.status(200).json({
//       status: 200,
//       rows: response[0],
//   });
//   }).catch((e) => {
//     res.status(500).json(e);
//   });
// });

module.exports = router;
