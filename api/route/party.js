const express = require('express');
const { check, validationResult } = require('express-validator/check');


const router = express.Router();


const parties = [
  {
    id: 1,
    name: 'APC',
    hqAdress: 'London',
    logoUrl: 'www.allparty.com',
  },

];


router.get('/', (req, res, next) => {
  res.status(200).json({
    count: parties.length,
    message: 'This are the parties',
    parties: parties.map(doc => ({
      name: doc.name,
      Headquaters: doc.hqAdress,
      LogoUrl: doc.logoUrl,
      id: doc.id,
      request: {
        type: 'GET',
        url: `http://localhost:3000/party/${doc.id}`,
      },
    })),
  });
});

router.post('/', [
  check('name').not().isEmpty(),
  check('hqAdress').not().isEmpty(),
  check('logoUrl').not().isEmpty()], (req, res, next) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    const errors = result.array();
    res.status(404).json({
      error: `${errors[0].param} is required`,
    });
  } else {
    const party = {
      id: parties.length + 1,
      name: req.body.name,
      hqAdress: req.body.hqAdress,
      logoUrl: req.body.logoUrl,
    };
    parties.push(party);
    res.status(201).json({

      message: 'Party was created',
      createdParty: party,
    });
  }
});


router.get('/:id', (req, res, next) => {
  const party = parties.find(p => p.id === parseInt(req.params.id));
  if (!party) {
    res.status(404).json({
      message: 'Party not found',
    });
  } res.status(200).json({
    party,
  });
});

router.patch('/:id', [
  check('name').not().isEmpty(),
  check('hqAdress').not().isEmpty(),
  check('logoUrl').not().isEmpty()], (req, res, next) => {
  const party = parties.find(p => p.id === parseInt(req.params.id));

  const result = validationResult(req);

  if (!result.isEmpty()) {
    const errors = result.array();
    res.status(404).json({
      error: `${errors[0].param} is required`,
    });
  } else {
    party.name = req.body.name;
    res.status(200).json({
      party,
    });
  }
});


router.delete('/:id', (req, res, next) => {
  const party = parties.find(p => p.id === parseInt(req.params.id));
  if (!party) {
    res.status(404).json({
      message: 'Party not found',
    });
  }
  const index = parties.indexOf(party);
  parties.splice(index, 1);

  res.status(200).json({
    message: 'Party has been deleted',
  });
});

module.exports = router;
