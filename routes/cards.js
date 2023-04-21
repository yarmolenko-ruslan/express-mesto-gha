const cardsRouter = require('express').Router();
const {
  getCard,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

// вернуть все карточки в базе
cardsRouter.get('/', getCard);
// создать новую карточку
cardsRouter.post('/', createCard);
// удалить выбранную карточку
cardsRouter.delete('/:cardId', deleteCard);
// поставить лайк карточке
cardsRouter.put('/:cardId/likes', likeCard);
// убрать лайк с карточки
cardsRouter.delete('/:cardId/likes', dislikeCard);

module.exports = cardsRouter;
