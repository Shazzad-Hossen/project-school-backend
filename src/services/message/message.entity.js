const Message = require('./message.schema');


module.exports.createMessage=()=>async(req,res)=>{
    try {

        if(!req.body.name || !req.body.email || !req.body.phone || !req.body.message) return res.status(400).send({message:'Bad request'});
        const message = await Message.create(req.body);
        if(!message) return res.status(500).send({message:'Something went wrong'}); 
        return res.status(201).send({data:message})
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({message:'Something went wrong'}); 
    }
}