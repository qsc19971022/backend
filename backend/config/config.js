const config = {
  mongodb: {
    connectStr: "mongodb://82.157.156.115:27000/backend",
    poolSize: 10,
    keepAlive: 120, // 单位是毫秒
  },
  server: {
    jwtSecret: "ywznjdykyhldcawyhyyzyq",
    expiresIn: '1h'
  },
  captcha: {
    size: 5,
    ignoreChars: '0o1i',
    noise: 1,
    color: true,
    background: '#6da4d8',
    width: 138,
    height: 40
  }
}

module.exports = config;
