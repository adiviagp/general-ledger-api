const bcrypt = require('bcrypt');
const { db } = require('../../utils/db');

function findUserByUsername(username) {
  return db.user.findUnique({
    where: {
      username,
    },
  });
}

function createUserByUsernameAndPassword(user) {
  user.password = bcrypt.hashSync(user.password, 12);
  return db.user.create({
    data: user,
  });
}

function findUserById(id) {
  return db.user.findUnique({
    where: {
      id,
    },
  });
}

function updateUserByUsernameAndPassword(user) {
  return db.user.update({
    where: {
      username: user.username,
    },
    data: {
      password: user.password = bcrypt.hashSync(user.password, 12)
    },
  });
}

function findUsers() {
  return db.user.findMany();
}

module.exports = {
  findUserByUsername,
  findUserById,
  createUserByUsernameAndPassword,
  updateUserByUsernameAndPassword,
  findUsers
};