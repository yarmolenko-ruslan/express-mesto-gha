const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUser,
  updateProfile,
  updateAvatar,
  findUserById,
  getCurrentUser,
} = require('../controllers/users');

// вернуть всех пользователей базы
usersRouter.get('/', getUser);
// возвращает информацию о текущем пользователе
usersRouter.get('/me', getCurrentUser);
// обновить информацию о пользователе
usersRouter.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      about: Joi.string().min(2).max(30).required(),
    }),
  }),
  updateProfile,
);
// обновить аватар
usersRouter.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string()
        .required()
        .pattern(
          /https?:\/\/(www\.)?([\w-]+\.)+\w+[\w\-._~:/?#[\]@!$&'()*,;=]*/,
        ),
    }),
  }),
  updateAvatar,
);
// возвращает определенного пользователя
usersRouter.get(
  '/:userId',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().required().hex().length(24),
    }),
  }),
  findUserById,
);

module.exports = usersRouter;
