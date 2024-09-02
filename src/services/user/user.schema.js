const { model, Schema } = require("mongoose");


const schema = new Schema({
  email: { type: String, required: true, unique:true },
  name: { type: String, required:true },
  password: { type: String, required: true },
  image:{ type: String },
  uid:{ type: String },
  nid:{ type: String, unique:true},
  npi:{ type: String },
  role: { type: String, enum:['user', 'admin']},
 
}, { timestamps: true });

schema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.__v;
  delete obj.password;
  delete obj.updatedAt;
 
  return JSON.parse(JSON.stringify(obj));
};

module.exports= model('User', schema);