const { model, Schema } = require("mongoose");
const paginate = require('mongoose-paginate-v2');


const schema = new Schema({
  name: { type: String, required:true },
  instructor: { type: String, required:true },
  price: { type: String, required:true },
  duration: { type: String, required:true },
  language: { type: String, required:true },
  videoUrl: { type: String },
  certificate: { type: Boolean, required:true },
  thumbnail: { type: String, required:true },
  details: {type:String, required: true },
  goal: [{ type: String}],
  outline: [{ type: String}],
  requirement: [{ type: String}],
}, { timestamps: true });
schema.plugin(paginate);
schema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.__v;
  delete obj.updatedAt;

  return JSON.parse(JSON.stringify(obj));
};

module.exports= model('Course', schema);