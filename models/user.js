const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const validator = require("validator");

const { UNAUTHORIZED_ERROR } = require("../errors/unauthorizedError");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: "Жак-Ив Кусто",
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: "Исследователь",
  },
  avatar: {
    type: String,
    required: true,
    default:
      "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
    validate: {
      validator(v) {
        return /https?:\/\/(www\.)?([\w-]+\.)+\w+[\w\-._~:/?#[\]@!$&'()*,;=]*/gm.test(
          v
        );
      },
      message: "Неправильный формат ссылки",
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: "Неправильный формат почты",
    },
  },
  password: {
    type: String,
    required: [true, "Заполните поле"],
    select: false,
    minlength: 8,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        throw new UNAUTHORIZED_ERROR("Неправильные почта или пароль");
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new UNAUTHORIZED_ERROR("Неправильные почта или пароль");
        }
        return user;
      });
    });
};

module.exports = mongoose.model("user", userSchema);
