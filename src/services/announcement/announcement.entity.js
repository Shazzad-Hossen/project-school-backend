const Announcement= require('./announcement.schema');
const createAllowed = new Set(['content']);

module.exports.create = ()=>async(req,res)=>{
    try {
        const isValid= Object.keys(req.body).every(key=>createAllowed.has(key));
        if(!isValid) return res.status(400).send({message:'Bad request'}); 
        const announcement = await Announcement.create({...req.body});
        if(!announcement) return res.status(400).send({message:'Bad request'}); 
        else return res.status(201).send({message:'Successfully created', data: announcement});
 
    } catch (error) {
        console.log(error);
        return res.status(500).send({message:'Something went wrong'}); 
    }
}



module.exports.getAll = ()=>async(req,res)=>{
    try {
        let announcemens = req.query?.paginate==='true'? await Announcement.find().paginate({limit:req?.query?.limit ||10, page:req?.query?.page || 0}): await Announcement.find();
        if(!announcemens) return res.status(400).send({message:'Bad request'}); 
        else return res.status(201).send(announcemens);
 
    } catch (error) {
        console.log(error);
        return res.status(500).send({message:'Something went wrong'}); 
    }
}

module.exports.deleteOne = ()=>async(req,res)=>{
    try {

        console.log(req.params);
        const id= req?.params?.id;
        if(!id)  return res.status(400).send({message:'Bad request'}); 
        
        const response = await Announcement.deleteOne({_id:id});
        if(response?.acknowledged===true && response?.deletedCount===1) return res.status(200).send({message:'Successfully deleted'});
        else  return res.status(500).send({message:'Something went wrong'}); 
 
    } catch (error) {
        console.log(error);
        return res.status(500).send({message:'Something went wrong'}); 
    }
}

module.exports.editOne = ()=>async(req,res)=>{
    try {

        if(!req?.body?.id || !req.body?.content)  return res.status(400).send({message:'Bad request'}); 

        const announcement = await Announcement.findOne({_id: req.body.id});
        if(!announcement)  return res.status(400).send({message:'Bad request'});
        announcement.content= req.body.content;
        await announcement.save();
        return  res.status(200).send({message:'Successfully Updated'});
 
    } catch (error) {
        console.log(error);
        return res.status(500).send({message:'Something went wrong'}); 
    }
}

