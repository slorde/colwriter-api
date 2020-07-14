const bcrypt = require('bcrypt');
const express = require('express');
const { User, validate } = require('../models/user-model');

const router = express.Router();

router.post('/signin', async (req, res) => {
  const { body } = req;

  const { email } = body;
  if (!email) {
    return res.status(400).send({ message: 'E-mail deve ser informado' });
  }

  if (!body.password) {
    return res.status(400).send({ message: 'Password deve ser informado' });
  }

  const password = await bcrypt.hash(body.password, 10);

  const user = await User.findOne({ email, password });
  if (!user) {
    return res.status(400).send({ message: 'Usuário não existente' });
  }

  const isValidate = await bcrypt.compare(body.password, user.password);

  if (!isValidate) {
    return res.status(400).send({ message: 'Senha incorreta' });
  }

  const token = user.generateAuthToken();
  return res.header('x-auth-token', token).send({
    _id: user._id,
  });
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already registered.');

  user = new User({
    name: req.body.name,
    password: req.body.password,
    email: req.body.email,
  });
  user.password = await bcrypt.hash(user.password, 10);
  await user.save();

  const token = user.generateAuthToken();
  return res.header('x-auth-token', token).send({
    _id: user._id,
    name: user.name,
    email: user.email,
  });
});

module.exports = router;
