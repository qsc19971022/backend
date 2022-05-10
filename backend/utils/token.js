const jwt = require('jsonwebtoken');
const conf = require('../config/config');
exports.setToken =  (username) => {
  return new Promise((resolve) => {
    const token = jwt.sign({
      username
    }, conf.server.jwtSecret, { expiresIn: conf.server.expiresIn });
    resolve(token);
  })
};
exports.verToken = (token) => {
  return jwt.verify(token, conf.server.jwtSecret ,(error,res) => {
    if (error){
      return error.message;
    } else {
      return res;
    }
  });
};
