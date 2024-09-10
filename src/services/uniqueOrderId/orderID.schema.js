
const { model, Schema } = require("mongoose");

const schema = new Schema({
  _id: { type: String, default: 'orderId' }, 
  seq: { type: Number, default: 101 }, 

}, { timestamps: true });

schema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.__v;
  delete obj.updatedAt;

  return JSON.parse(JSON.stringify(obj));
};

module.exports= model('OrderId', schema);