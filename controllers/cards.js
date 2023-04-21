const Card = require('../models/card');
const { errorMessage } = require('../utils/errorMessage');

// функция возврата всех каточек
const getCard = (req, res) => {
  Card.find({})
    .then((card) => {
      res.send(card);
    })
    .catch((err) => errorMessage(req, res, err));
};

// функция создания карточки
const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((newCard) => {
      res.send(newCard);
    })
    .catch((err) => errorMessage(req, res, err));
};

// функция удаления карточки
const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail()
    .then((card) => {
      res.send(card);
    })
    .catch((err) => errorMessage(req, res, err));
};

// функция лайка карточки
const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => errorMessage(req, res, err));
};

// функция отменя лайка карточки
const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => {
      res.send(card);
    })
    .catch((err) => errorMessage(req, res, err));
};

module.exports = {
  createCard,
  getCard,
  deleteCard,
  dislikeCard,
  likeCard,
};
