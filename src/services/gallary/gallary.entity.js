const Gallary = require('./gallary.schema');
const fs = require('fs');
const path = require('path');
module.exports.uploadGallaryImage=({fileUp})=>async(req,res)=>{
    try {
        if(!req?.files?.image) return res.status(400).send({message:'Image is required'});
        const image = await fileUp(req.files.image.path);
        const data= await Gallary.create({path:image});
        return res.status(201).send({message:'Successfully created', data });

        
    } catch (error) {
        console.log(error);
        return res.status(500).send({message:'Something went wrong'});  
        
    }
}

module.exports.getAllGallaryImages=()=>async(req,res)=>{
    try {
        const data = await Gallary.find();
        return res.status(200).send({data});
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({message:'Something went wrong'});
        
    }
}

module.exports.deleteOneGallaryImage=()=>async(req,res)=>{
    try {
        const id = req?.params?.id;
        if(!id) return res.status(400).send({message:'Bad request'});
        const image = await Gallary.findOne({_id:id});
        if(!image) return res.status(400).send({message:'Image does not exist'});
        const imagePath = path.join(path.resolve(), 'files', image.path.slice(4));
        if(fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
        const response = await Gallary.deleteOne({_id:id});
        if(response?.acknowledged===true && response?.deletedCount===1) return res.status(200).send({message:'Successfully deleted'});
        else return res.status(500).send({message:'Something went wrong'});
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({message:'Something went wrong'});
        
    }
}