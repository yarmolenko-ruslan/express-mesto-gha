const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { celebrate, Joi, errors } = require('celebrate');
const router = require('./routes');
const auth = require('./middlewares/auth');
const { createUser, login } = require('./controllers/users');

const { NOT_FOUND_ERROR } = require('./utils/errorMessage');

const app = express();

// устанавливаем переменную PORT и задаем дефолтное знаение
const { PORT = 3000 } = process.env;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login,
);
app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().pattern(
        /https?:\/\/(www\.)?([\w-]+\.)+\w+[\w\-._~:/?#[\]@!$&'()*,;=]*/,
      ),
    }),
  }),
  createUser,
);

app.use(auth);

app.use(router);
app.use(errors());

app.use((req, res) => {
  res
    .status(NOT_FOUND_ERROR)
    .send({ message: 'Запрашиваемый ресурс не найден' });
});

// создаем централизованный обработчик ошибок
app.use((err, req, res) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
  });
});

mongoose.connect('mongodb://localhost:27017/mestodb');

// устанавливаем порт и сообщение в консоли при запуске сервера
app.listen(PORT, () => {
  console.log(`Сервер слушает запросы на ${PORT} порту...`);
});
