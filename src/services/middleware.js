const SETTINGS = require('../settings');
const crypto = require('../utils/crypto');
const User = require('../services/user/user.schema');



module.exports.auth= async(req,res,next)=>{
    try {
        const authorization = req?.headers?.authorization;
    if(!authorization)return res.status(401).send({ message: 'Unauthorized' });
    const decoded =  crypto.decrypt(authorization.split(' ')[1]);
    if(!decoded._id || !decoded.email) return res.status(401).send({ message: 'Unauthorized' });
    const user = await User.findOne({_id:decoded._id});
    if(!user)return res.status(401).send({ message: 'Unauthorized' });
    else req.user=user;
    next();
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({message:'Something went wrong'});
        
    }
};


module.exports.checkRole = (roles = []) => {
    return (req, res, next) => {
        (async () => {
            try {
                if (roles.includes(req.user.role)) {
                    return next();
                } else {
                    return res.status(401).send({ message: 'Unauthorized' });
                }
            } catch (error) {
                console.log(error);
                return res.status(401).send({ message: 'Unauthorized' });
            }
        })();
    };
};
