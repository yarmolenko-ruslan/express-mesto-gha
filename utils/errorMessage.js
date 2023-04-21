const BAD_REQUEST_ERROR = 400;
const NOT_FOUND_ERROR = 404;
const INTERNAL_SERVER_ERROR = 500;

const errorMessage = (req, res, err) => {
  if (err.name === 'CastError') {
    res.status(BAD_REQUEST_ERROR).send({
      message: 'Переданы некорректные данные',
    });
    return;
  }
  if (err.name === 'ValidationError') {
    res.status(BAD_REQUEST_ERROR).send({
      message: 'Переданы некорректные данные',
    });
    return;
  }
  if (err.name === 'DocumentNotFoundError') {
    res.status(NOT_FOUND_ERROR).send({
      message: 'Карточка или пользователь не найден',
    });
    return;
  } else {
    res.status(INTERNAL_SERVER_ERROR).send({
      message: 'Cервер столкнулся с неожиданной ошибкой',
    });
  }
};

module.exports = { errorMessage, NOT_FOUND_ERROR };
