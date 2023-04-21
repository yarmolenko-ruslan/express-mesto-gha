const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routes');
const { NOT_FOUND_ERROR } = require('./utils/errorMessage');

// устанавливаем переменную PORT и задаем дефолтное знаение
const { PORT = 3000 } = process.env;
mongoose.connect('mongodb://localhost:27017/mestodb');
const app = express();

// парсим файл json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// временное решение заменяющее id пользователя
app.use((req, res, next) => {
  req.user = {
    _id: '643cd1803d774ff3217cf717',
  };

  next();
});

// создаем роуты
app.use(router);

app.use((req, res) => {
  res
    .status(NOT_FOUND_ERROR)
    .send({ message: 'Запрашиваемый ресурс не найден' });
});

// устанавливаем порт и сообщение в консоли при запуске сервера
app.listen(PORT, () => {
  console.log(`Сервер слушает запросы на ${PORT} порту...`);
});
