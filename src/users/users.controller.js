const express = require('express');
const { findUserById, findUsers } = require('./users.service');
const { isAuthenticated } = require('../middleware');

const router = express.Router();

router.get('/profile', isAuthenticated, async (req, res, next) => {
  try {
    const { userId } = req.payload;
    const user = await findUserById(userId);
    delete user.password;
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.get('/pengguna', async (req, res, next) => {
  try {

    const users = await findUsers();
    const reformat = [];
    users.forEach(user => {
      delete user.password;
      reformat.push(user)
    });
    res.json(reformat);
  } catch (err) {
    next(err);
  }
});

module.exports = router;