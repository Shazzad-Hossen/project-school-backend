const SETTINGS = require('../settings');
const crypto = require('../utils/crypto');
const User = require('../services/user/user.schema');


module.exports.auth= async(req,res,next)=>{
    const cookie = req.cookies[SETTINGS.COOKIE_NAME];
    if(!cookie) return res.status(401).send({ message: 'Unauthorized' });
    const decoded =  crypto.decrypt(cookie);
    if(!decoded.id) return res.status(401).send({ message: 'Unauthorized' });
    const user = await User.findOne({_id:decoded.id});
    if(!user)return res.status(401).send({ message: 'Unauthorized' });
    else req.user=user;
    next();
}