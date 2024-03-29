const axios = require('axios');
const express = require("express");
const router = express.Router();
const {resData: resTool} = require('../utils/common');
const svgCaptcha = require('svg-captcha');
const { captcha } = require('../config/config');
const githubService = require('../service/github');

router.get('/captcha', (req, res) => {
  const c = svgCaptcha.create(captcha);
  req.session.captcha = c.text.toLowerCase();
  return res.json(resTool.resSuccess(c.data));
})

router.get('/github', async (req, res) => {
  const { code } = req.query;
  try {
    const result = await githubService.register(code);
    res.cookie('token', result.token, { httpOnly: false, expires: new Date(Date.now() + 24 * 3600000) });
    res.redirect('http://127.0.0.1:8080/#/layout/dashboard');
    // return res.body(resTool.resSuccess(result));
  } catch (e) {
    return res.json(resTool.resError(e.message));
  }
});

module.exports = router;
