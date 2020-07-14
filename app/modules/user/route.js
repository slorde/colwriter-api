const express = require('express');
const Controller = require('./controller');

const router = express.Router();

router.post('/signin', (req, res) => {
  const controller = new Controller();
  return controller.singin(req, res)
});
router.post('/', (req, res) => {
  const controller = new Controller();
  return controller.create(req, res)
});

module.exports = router;
