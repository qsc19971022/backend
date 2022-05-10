const mongoose = require ('mongoose');
let  Schema = mongoose.Schema;  //通过mongoose来获取schema
const { indexInfo } = require('../../utils/common');
const dayjs = require('dayjs');

let  menusSchema = new Schema({
  'type' : { type : Number , enum: [0, 1, 2], default: 0 }, // 0: 目录 1：菜单 2: 按钮
  'parentId' : { type : Schema.Types.ObjectId },
  'perms': { type: String },
  'component': { type: String, required: true },
  'name': {type: String, required: true },
  'path': {type: String, required: true },
  'sort': { type: Number, default: 0 },
  'hidden': { type: Boolean, default: false },
  'meta': {
    type: {
      icon: {
        type: String
      },
      title: {
        type: String
      },
      keepAlive: {
        type: Boolean
      }
    },
    required: true
  },
  'createTime': {type: Date, default: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')}
});
let Menus = mongoose.model('menus' , menusSchema);
Menus.on('index', function (err) {
  indexInfo.outputInfo(err, this.modelName)
});

module.exports = Menus;// 象和集合相关联 {'集合名' , schema对象}
