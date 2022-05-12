const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { indexInfo } = require('../../utils/common');
const mongoosePaginate = require('mongoose-paginate-v2');
const roleSchema = new Schema({
  "name": {
    type: String,
    trim: true,
    required: true
  },
  'status': {
    type: Boolean,
    default: true
  },
  "menusId": [{type: Schema.Types.ObjectId, ref: 'Menus'}],
});
roleSchema.plugin(mongoosePaginate);
roleSchema.index({name: 1}, {unique: true});

const roleModel = mongoose.model("Role", roleSchema, 'roles');

roleModel.on('index', function (err) {
  indexInfo.outputInfo(err, this.modelName)
});

module.exports = roleModel;
