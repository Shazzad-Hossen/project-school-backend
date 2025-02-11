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

module.exports.getMessages=()=>async(req,res)=>{
    try {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const messages = await Message.paginate({}, { page, limit });
        return res.status(200).send({data:messages})
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({message:'Something went wrong'}); 
    }
}

module.exports.getSingleMessage=()=>async(req,res)=>{
    try {
        const message = await Message.findById(req.params.id);
        if(!message) return res.status(404).send({message:'Message not found'});
        return res.status(200).send({data:message})
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({message:'Something went wrong'}); 
        
    }
}

module.exports.updateSeenStatus=()=>async(req,res)=>{
    try {
        const message = await Message.findById(req.params.id);
        if(!message) return res.status(404).send({message:'Message not found'});
        message.seen = true;
        await message.save();
        return res.status(200).send({data:message})
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({message:'Something went wrong'}); 
        
    }
}

module.exports.deleteMessage=()=>async(req,res)=>{
    try {
        const message = await Message.findByIdAndDelete(req.params.id);
        if(!message) return res.status(404).send({message:'Message not found'});
        return res.status(200).send({data:message})
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({message:'Something went wrong'});
        
    }
}