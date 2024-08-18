const createAllowed= new Set(['email','name','username','nid', 'password']);
const User = require('./user.schema');

module.exports.create = ()=>async(req,res)=>{
    try {
        const isValid= Object.keys(req.body).every(key=>createAllowed.has(key));
    if(!isValid) return res.status(400).send({message:'Bad request'});
    const user = await User.create(req.body);
    if(!user) return res.status(500).send({message:'Something went wrong'});
    return res.status(200).send(user);
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({message:'Something went wrong'});
        
    }

}