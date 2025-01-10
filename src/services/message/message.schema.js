const { model, Schema } = require("mongoose");
const paginate = require('mongoose-paginate-v2');


const schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  message: { type: String, required: true},
}, { timestamps: true });
schema.plugin(paginate);
schema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.__v;
  delete obj.password;
  delete obj.updatedAt;
 
  return JSON.parse(JSON.stringify(obj));
};

module.exports= model('Message', schema);