const axios = require('axios');
const express = require("express");
const router = express.Router();
const {resData: resTool} = require('../utils/common');
const svgCaptcha = require('svg-captcha');
const { captcha } = require('../config/config');

router.get('/captcha', (req, res) => {
  const c = svgCaptcha.create(captcha);
  req.session.captcha = c.text.toLowerCase();
  return res.json(resTool.resSuccess(c.data));
})
module.exports = router;
