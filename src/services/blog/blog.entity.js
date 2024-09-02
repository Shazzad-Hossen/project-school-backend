const Blog =require('./blog.schema');


module.exports.create = ({fileUp})=>async(req,res)=>{
    try {
        if(req.body.data) req.body= JSON.parse(req.body.data);
        if(req?.files?.file?.path){
            req.body.thumbnail= await fileUp(req.files.file.path);
        }
        const blog= await Blog.create(req.body);
        if(!blog) return res.status(400).send({message:'Bad request'}); 
        return res.status(201).send({message:'Successfully created'});

 
    } catch (error) {
        console.log(error);
        return res.status(500).send({message:'Something went wrong'}); 
    }
}


module.exports.getAll = ()=>async(req,res)=>{
    try {

        const blogs =  await Blog.find().paginate({limit:req?.query?.limit ||10, page:req?.query?.page || 0});
        if(!blogs) return res.status(500).send({message:'Something went wrong'}); 
        return res.status(200).send({data: blogs});

       

 
    } catch (error) {
        console.log(error);
        return res.status(500).send({message:'Something went wrong'}); 
    }
}


module.exports.deleteOne = ()=>async(req,res)=>{
    try {

    
        const id= req?.params?.id;
        if(!id)  return res.status(400).send({message:'Bad request'}); 
        
        const response = await Blog.deleteOne({_id:id});
        if(response?.acknowledged===true && response?.deletedCount===1) return res.status(200).send({message:'Successfully deleted'});
        else  return res.status(500).send({message:'Something went wrong'}); 
 
    } catch (error) {
        console.log(error);
        return res.status(500).send({message:'Something went wrong'}); 
    }
}


module.exports.editOne = ({fileUp})=>async(req,res)=>{
    try {

        if(req.body.data) req.body= JSON.parse(req.body.data);
        if(req.files?.file?.path){
            req.body.thumbnail= await fileUp(req.files.file.path);
        }

        const blog = await Blog.findOne({_id: req.body.id});
        if(!blog)  return res.status(400).send({message:'Bad request'});
        Object.keys(req.body).forEach(key=>blog[key]=req.body[key]);
        await blog.save();
        return  res.status(200).send({message:'Successfully Updated'});
 
    } catch (error) {
        console.log(error);
        return res.status(500).send({message:'Something went wrong'}); 
    }
}

module.exports.getSingle=()=>async(req,res)=>{
    try {
        if(!req.params.id)  return res.status(400).send({message:'Bad request'}); 
        const blog = await Blog.findOne({_id: req.params.id});
        if(!blog)  return res.status(400).send({message:'Bad request'});
        return res.status(200).send({data:blog});
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({message:'Something went wrong'});
        
    }
}