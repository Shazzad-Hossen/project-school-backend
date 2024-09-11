const { model, Schema } = require("mongoose");
const paginate = require('mongoose-paginate-v2');



const schema = new Schema({
  cId: { type: String, unique: true},
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  course: { type: Schema.Types.ObjectId, ref: 'Course' },
  certificate: { type: String, required:true},

}, { timestamps: true });
schema.plugin(paginate);
schema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.__v;
  delete obj.updatedAt;

  return JSON.parse(JSON.stringify(obj));
};

module.exports= model('Certiticate', schema);