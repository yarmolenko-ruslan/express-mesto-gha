const jwt = require("jsonwebtoken");
const { UNAUTHORIZED_ERROR } = require("../errors/unauthorizedError");

module.exports = (req, res, next) => {
  const { autorization } = req.headers;
  if (!autorization || !autorization.startsWith("Bearer")) {
    throw new UNAUTHORIZED_ERROR("Требуется авторизиризация");
  }
  const token = autorization.replace("Bearer ", "");
  let peyload;
  try {
    peyload = jwt.verify(token, "some-secret-key");
  } catch (err) {
    throw new UNAUTHORIZED_ERROR("Требуется авторизиризация");
  }
  req.user = peyload;
  next();
};
