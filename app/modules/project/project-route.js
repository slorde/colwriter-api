const express = require('express');
const auth = require('../../middleware/auth');
const Controller = require('./project-controller');

const router = express.Router();

router.post('/', auth, (req, res, next) => {
    const controller = new Controller();
    return controller.create(req, res, next);
});

module.exports = router;
