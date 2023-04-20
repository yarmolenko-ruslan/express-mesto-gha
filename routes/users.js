const usersRouter = require("express").Router();
const {
  createUser,
  getUser,
  updateProfile,
  updateAvatar,
  findUserById,
} = require("../controllers/users");

// создание нового пользователя
usersRouter.post("/", createUser);
// вернуть всех пользователей базы
usersRouter.get("/", getUser);
// обновить информацию о пользователе
usersRouter.patch("/me", updateProfile);
// обновить аватар
usersRouter.patch("/me/avatar", updateAvatar);
// возвращает определенного пользователя
usersRouter.get("/:userId", findUserById);

module.exports = usersRouter;
