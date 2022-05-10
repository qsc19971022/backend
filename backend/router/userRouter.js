const express = require("express");
const router = express.Router();
const md5 = require('md5');
const User = require("../db/model/userModel");
const {resData: resTool} = require('../utils/common');
const axios = require('axios');
const { setToken } = require('../utils/token');


router.post("/reg", async (req, res) => {
  // 注册接口
  let { username, password  } = req.body;
  let result = null;
  result = await User.findOne({username});
  if (result) {
    return res.json(resTool.resBusinessError('用户已存在'));
  } else {
    try {
      let user = new User({username,password: md5(password)});
      const data = await user.save();
      return res.json(resTool.resSuccess(data));
    } catch(err){
      return res.json(resTool.resData())
    }
  }

});

// 登录接口
router.post("/login", async (req, res) => {
  if (req.session.captcha !== req.body.code.toLowerCase()) return res.json(resTool.resError('验证码错误!'));
  let { username, password } = req.body;
  const result = await User.findOne({ username, password: md5(password) }).lean();
  if(result) {
    result.token = await setToken(username); // token设置
    return res.json(resTool.resSuccess(result));
  } else {
    return res.json(resTool.resBusinessError('用户名或密码错误'));
  }
});


// 获取用户信息

router.post('/userInfo', async (req, res) => {
  const {username} = req.data;
  const result = await User.findOne({username})
  if (result) {
    return res.json(resTool.resSuccess(result));
  } else {
    return res.json(resTool.resBusinessError('异常错误'));
  }
})


router.post('/list', async (req, res) => {
  // const result = await User.find();
  const result = await User.aggregate([
    {
      $lookup: {
        from: 'roles',
        localField: 'roleId',
        foreignField: '_id',
        as: 'roleName'
      }
    },
    {
      $unwind: { path: '$roleName', preserveNullAndEmptyArrays: true }
    }
  ])
  if (result) {
    return res.json(resTool.resSuccess(result));
  } else {
    return res.json(resTool.resBusinessError('异常错误'));
  }
})

router.post('/add', async (req, res) => {
  const user = new User(req.body);
  const result = await user.save();
  if (result) {
    return res.json(resTool.resSuccess(result));
  } else {
    return res.json(resTool.resBusinessError('异常错误'));
  }
})

router.post('/update', async (req, res) => {
  const result = await User.findByIdAndUpdate(req.body._id, {name: req.body.name, username: req.body.username, password: req.body.password})
  if (result) {
    return res.json(resTool.resSuccess(result));
  } else {
    return res.json(resTool.resBusinessError('异常错误'));
  }
})

router.post('/setUerRole', async (req, res) => {
  const result = await User.findByIdAndUpdate(req.body._id, { roleId: req.body.roleId })
  if (result) {
    return res.json(resTool.resSuccess(result));
  } else {
    return res.json(resTool.resBusinessError('异常错误'));
  }
})

router.post('/del', async (req, res) => {
  const result = await User.findByIdAndDelete(req.body._id)
  if (result) {
    return res.json(resTool.resSuccess(result));
  } else {
    return res.json(resTool.resBusinessError('异常错误'));
  }
})

router.post('/roleMenu', async (req, res) => {
  const { username } = req.data;
  try {
    const result = await User.aggregate([
      {
        $match: { username: username + '' }
      },
      {
        $lookup: {
          from: 'roles',
          localField: 'roleId',
          foreignField: '_id',
          as: 'role'
        }
      },
      {
        $unwind: { path: '$role', preserveNullAndEmptyArrays: true }
      },
      {
        $lookup: {
          from: 'menus',
          localField: 'role.menusId',
          foreignField: '_id',
          as: 'menus'
        }
      }
    ]);
    return res.json(resTool.resSuccess(result[0]));
  } catch (e) {
    return res.json(resTool.resError(e.message));
  }
})


module.exports = router;
