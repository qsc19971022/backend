const mongoose = require ('mongoose');
const { indexInfo } = require('../../utils/common');
let  Schema = mongoose.Schema;  //通过mongoose来获取schema
const ObjectId = require('mongoose').mongo.ObjectId;
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
let  userSchema = new Schema({
    'username' : {type : String , require : true},
    'password' : {type : String , require: true},
    'name' : {type : String , default: '新用户'},
    'roleId': {
      type: Schema.Types.ObjectId,
      ref: 'Role',
      default: ObjectId('6273d836d173df5f5ada6a23')
    },
    'createTime': {type: Date, default: new Date()}
});
userSchema.plugin(aggregatePaginate);
// schema创建完是不能用的  要转化为数据模型
let User = mongoose.model('user' , userSchema);  //该数据对象和集合相关联 {'集合名' , schema对象}
User.on('index', function (err) {
  indexInfo.outputInfo(err, this.modelName)
});
// 插入数据
// User.insertMany({income : 4.31 , user_money : 100 }).then((data) => {
//     console.log(data);
//     console.log('插入成功');
// }).catch((err) => {
//     console.log('插入失败');
// });

// 查询数据
// User.find({age:17}).then((data) => {
//     console.log(data);
//     console.log('查询结果');
// }).catch((err) => {
//     console.log('查询失败');
// });

// 删除数据
// User.remove({age:16}).then((data) => {
//     console.log(data);
//     console.log('删除成功');
// }).catch((err) => {
//     console.log('删除失败');
// });

// 修改数据
// User.updateOne({user:15349387633},{$set:{age:+2}}).then((data) => {
//     console.log(data);
//     console.log('修改成功');
// }).catch((err) => {
//     console.log('修改失败');
// });
module.exports = User;
