const router = require('express').Router();
const User = require('./userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwtSecret}  = require('../config/secrets');


router.post('/register', (req, res, next) => {
  // implement registration
  const { username, password } = req.body;
  const hashed = bcrypt.hashSync(password, 10);
  const user = {
    username,
    password: hashed
  }
  User.addUser(user)
  .then(user => res.status(201).json(user))
  .catch(err => next(err))


});

router.post('/login', (req, res, next) => {
  // implement login
 
  const {username, password} = req.body;
  User.findByUser(username)
  .then(user => {
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = signToken(user);
      res.status(200).json({token})
    } else {
      res.status(401).json({
        message: 'Invalid Credentials'
      })
    }
  })
  .catch(err => next(err))

  
});

function signToken(user) {

  const payload = {
    userId: user.id,
    username: user.username
  }

  options = {
    expiresIn: '1d'
  }

  return jwt.sign(payload, jwtSecret, options)
}

module.exports = router;
