/*
* @description  定义统一返回的json
* @author Qi
* @date 2022/04/12 9:36 下午
*/
const log = require('./log');
const resData = Object.create(null);

/*
* @description 按照约定，返回字符串，则表示error，返回对象，则表示OK，此方法就为了简化的判断
* @param  serviceInfo  返回值
* @author Qi
* @date 2022/04/12 9:36 下午
*/
resData.fromServiceData = (serviceInfo, msg = "success") => {
  let paramType = typeof serviceInfo;
  let returnData = null;
  switch (paramType) {
    case "string":
      returnData = resData.resError(serviceInfo, {});
      break;
    case "object":
      returnData = resData.resSuccess(serviceInfo, msg);
      break;
    default:
      log.error(`fromServiceData--->${paramType}`);
      // eslint-disable-next-line no-undefined
      returnData = resData.resError('..ERROR.. ', undefined);
  }
  return returnData;
};

resData.resParamError = (info) => {
  return resData.resData(503, info || "参数错误", {});
};

resData.resBusinessError = (errInfo) => {
  return resData.resData(504, errInfo || "业务逻辑错误", {});
};

resData.resTokenError = (errInfo) => {
  return resData.resData(505, errInfo || "token error", {});
};

resData.resNoData = () => {
  return resData.resData(501, "暂无数据", {});
};

resData.resError = (msg, result) => {
  // eslint-disable-next-line no-undefined
  return resData.resData(undefined, msg || "error", result);
};

resData.resSuccess = (result, msg = "success") => {
  return resData.resData(200, msg, result);
};

resData.resData = (status = 500, msg = "error", result = {}) => {
  if (status >= 500) {
    log.error(`resData--->${msg}`);
  }
  return {
    status: status,
    msg: msg,
    result: result
  }
};

const indexInfo = Object.create(null);

indexInfo.outputInfo = (obj, collectionName) => {
  if (obj) {
    log.error(collectionName,String(obj));
  }else{
    log.info(`${collectionName} create success ! 🎉🎉🎉🎉`);
  }
};
exports.resData = resData;
exports.indexInfo = indexInfo;
