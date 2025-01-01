const Team = require('./team.schema');
const path = require('path');
const fs = require('fs');
const updateAllowed= new Set(['name','designation','details']);
module.exports.createTeamMember=({fileUp})=>async(req,res)=>{
    try {
        if(!req.files) return res.status(400).send({message:'No file found'});
        if(!req.body.name || !req.body.designation || !req.body.details) return res.status(400).send({message:'Bad request'});
       req.body.image = await fileUp(req.files.image.path);
       const team = await Team.create(req.body);
         if(!team) return res.status(500).send({message:'Something went wrong'});
            return res.status(201).send({message:'Successfully created'});
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({message:'Something went wrong'});
        
    }
}


module.exports.getAllTeamMembers=()=>async(req,res)=>{
    try {
        const team = await Team.find().paginate({limit:req?.query?.limit ||10, page:req?.query?.page || 0});
        if(!team) return res.status(500).send({message:'Something went wrong'});
        return res.status(200).send({data: team});
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({message:'Something went wrong'});
        
    }
}

module.exports.deleteOneTeamMember=()=>async(req,res)=>{
    try {
        const id = req?.params?.id;
   
        if(!id) return res.status(400).send({message:'Bad request'});
       const member = await Team.findOne({_id:id});
         if(!member) return res.status(400).send({message:'Member does not exist'});
         const imagePath = path.join(path.resolve(), 'files', member.image.slice(4));
         console.log(imagePath);
         if(fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
            const response = await Team.deleteOne({_id:id});
            if(response?.acknowledged===true && response?.deletedCount===1) return res.status(200).send({message:'Successfully deleted'});
            else return res.status(500).send({message:'Something went wrong'});
    
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({message:'Something went wrong'});
        
    }
}

module.exports.getSingleTeamMember=()=>async(req,res)=>{
    try {
        const id = req?.params?.id;
        if(!id) return res.status(400).send({message:'Bad request'});
        const member = await Team.findOne({_id:id});
        if(!member) return res.status(400).send({message:'Member does not exist'});
        return res.status(200).send({data:member});
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({message:'Something went wrong'});
        
    }
}

module.exports.editOneTeamMember=({fileUp})=>async(req,res)=>{
    try {
        if(!req.params.id) return res.status(400).send({message:'Bad request'});
        const isValid = Object.keys(req.body).every(key=>updateAllowed.has(key));
        if(!isValid) return res.status(400).send({message:'Invalid update field'});
        const member = await Team.findOne({_id:req.params.id});
        if(!member) return res.status(400).send({message:'Member does not exist'});
        if(req.files?.image?.path){
            req.body.image = await fileUp(req.files.image.path);
            const imagePath = path.join(path.resolve(), 'files', member.image.slice(4));
            if(fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
        }
        Object.keys(req.body).forEach(key=>member[key]=req.body[key]);
        await member.save();
        return res.status(200).send({message:'Successfully updated'});
            
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({message:'Something went wrong'});
        
    }
}