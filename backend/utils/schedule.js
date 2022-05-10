const schedule = require('node-schedule');
const axios = require('axios');
const logger = require('./log');
const task = Object.create(null);
task.scheduleTask = () => {
  schedule.scheduleJob('0 0 1 * * *', async ()=>{
    const result = await axios('https://api.jisuapi.com/news/get?channel=' +encodeURI('财经') + '&start=0&num=10&appkey=3e99d0dfd907f7ea');
    logger.info(result.data.result);
  });
}

module.exports = task;
