const { model, Schema } = require("mongoose");
const paginate = require('mongoose-paginate-v2');


const schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  course: { type: Schema.Types.ObjectId, ref: 'Course' },
  phone: { type: String, required: true },
  tnxId: { type: String, required: true },
  status: { type: String, enum:['pending','confirmed','cancelled'], default:'pending' },
  message: { type: String, },

}, { timestamps: true });
schema.plugin(paginate);
schema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.__v;
  delete obj.updatedAt;

  return JSON.parse(JSON.stringify(obj));
};

module.exports= model('order', schema);