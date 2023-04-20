const User = require("../models/user");
const errorMessage = require("../utils/errorMessage");

// функция создания пользователя
const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => errorMessage(req, res, err));
};

// функция возврата всех пользователей
const getUser = (req, res) => {
  User.find({})
    .then((user) => {
      res.send(user);
    })
    .catch((err) => errorMessage(req, res, err));
};

// функция возвращает пользователя по id
const findUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => res.send(user))
    .catch((err) => errorMessage(req, res, err));
};

// функция обновления информации о пользователе
const updateProfile = (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(
    userId,
    { name, about },
    { new: true, runValidators: true }
  )
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => errorMessage(req, res, err));
};

// функция обновления аватара
const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => errorMessage(req, res, err));
};

module.exports = {
  createUser,
  getUser,
  updateProfile,
  updateAvatar,
  findUserById,
};
