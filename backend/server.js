const express = require ('express');
const app = express();
const db = require ('./utils/dbConnect');
const request = require ('request');
const path = require ('path');
const userRouter = require ('./router/userRouter');
const commonRouter = require('./router/commonRouter');
const menusRouter = require('./router/menusRouter');
const roleRouter = require('./router/roleRouter');
const session = require("express-session")
const cors = require ('cors');
const url = require('url');
const log4js = require('log4js');
const logger = require('./utils/log');
let bodyParser = require ('body-parser');
const {resData: resTool} = require('./utils/common');
const { verToken} = require('./utils/token');
const { scheduleTask } = require('./utils/schedule');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(session({
  secret: 'server-session',    // 服务器生成session的签名 自定义
  resave: true,               // 强制保存session，即使他没有变化，必须配置，否则会有警告
  saveUninitialized: false,     // 强制将未初始化的session存储，必须配置，否则会有警告
  cookie: {                    // cookie 配置与cookie-parser的配置一致
    maxAge: 1000 * 60 * 3,
  },
}))
app.set('trust proxy', 1) // trust first proxy
app.use( async (req, res, next) => {
  const token = req.headers['token'];
  const reqUrl = url.parse(req.url).pathname;
  let isIllegal = true;
  console.log(token);
  const signRouterRegExp = ['/user/login', '/user/reg', '/common/captcha', '/common/github'];
  if (signRouterRegExp.find(item => item === reqUrl)) { // 不需要校验的
    isIllegal = false;
  }

  if (!isIllegal) {
    return next();
  }
  if (!token && isIllegal) {
    return res.json(resTool.resTokenError('非法请求～'));
  }
  const info = verToken(token);
  if (!info || typeof info === 'string') {
    return res.json(resTool.resTokenError(info || "token error"));
  } else {
    req.data = { username: info.username};
    return next();
  }
})
app.use(log4js.connectLogger(logger, {
  level: 'auto'
}));
scheduleTask();
app.use('/user' , userRouter);
app.use('/common' , commonRouter);
app.use('/menu' , menusRouter);
app.use('/role' , roleRouter);
app.listen(4000, () => {
  logger.info(`Sever listening at port 4000`)
});
