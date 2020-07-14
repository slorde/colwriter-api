const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    const decoded = jwt.verify(token, config.get('myprivatekey'));
    req.user = decoded;
  } catch (ex) {
    res.status(400).send('Invalid token.');
  }

  return next();
};
