const axios = require("axios");
const githubService = Object.create(null);
const User = require('../db/model/userModel');
const { setToken } = require('../utils/token');

githubService.register = async (code) => {
  let res = Object.create(null);
  const params = {
    client_id: 'dab3612122e81300df08897f9abcb3289c246475a9b2fd0c1796f3a2d1443a73',
    client_secret: '5ce2da838df2c0a42e6ba2d978f7309b9258a70aeeefd9d4e01f42f6085479b2',
    code: code,
    grant_type: 'authorization_code',
    redirect_uri: 'http://admin.woftsun.cn:4000/common/github'
  }
  const result = await axios.post('https://gitee.com/oauth/token', params);
  if (result.status === 200) {
    const access_token = result.data.access_token;
    const data = await axios.get(`https://gitee.com/api/v5/user?access_token=${access_token}`);
    if (data.status === 200 ){
      const isExist = await User.find({ login: data.data.login });
      if (!isExist.length) {
        const user = new User({ login: data.data.login, name: data.data.name });
        res = await user.save();
      }
      res.token = await setToken(data.data.login, 'git');
    }
  }
  return res;
}


module.exports = githubService;
