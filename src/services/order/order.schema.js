const { model, Schema } = require("mongoose");
const paginate = require('mongoose-paginate-v2');
const OrderId = require('../uniqueOrderId/orderID.schema');


const schema = new Schema({
  orderId: { type: String, unique: true},
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

schema.pre('save', async function(next) {
  if (!this.orderId) {
    try {
     
      const orderIdDoc = await OrderId.findByIdAndUpdate(
        { _id: 'orderId' },
        { $inc: { seq: 1 } },
        { new: true, upsert: true } 
      );
      this.orderId = orderIdDoc.seq; 
    } catch (err) {
      return next(err);
    }
  }
  next();
});
module.exports= model('order', schema);