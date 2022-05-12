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

router.get('/github', async (req, res) => {
  console.log(req.query);
  const params = {
    client_id: 'de436baf2dd677a6c2fa',
    client_secret: '4bf54e6327dcc3debe85be13a9b6e85ca9680cda',
    code: req.query.code
  }
  const result = await axios.post('https://github.com/login/oauth/access_token', params);
  console.log(result);
  if (result.status === 200) {
    const token = result.data.split('=')[1].split('&')[0];
    console.log(`https://api.github.com/user?access_token=${token}`);
    const data = await axios(`https://api.github.com/user?access_token=${token}`, { Accept: 'application/xml' });
    console.log(data);
  }

  console.log(result);
})
module.exports = router;
