
const Certificate =require('./certificate.schema');



module.exports.uploadCertificate = ({fileUp})=>async(req,res)=>{
    try {
       req.body= JSON.parse(req.body.data);
       if(!req.body.user  || !req.body.course || !req.files.certificate)  return res.status(400).send({message:'bad request'});
       const isExist = await Certificate.findOne({user: req.body.user, course: req.body.course});
       if(isExist)  return res.status(400).send({message:'Certificate already exist'});
        req.body.certificate = await fileUp(req.files.certificate.path);
        req.body.cId = (req.body.user.slice(-5) + Date.now()).toString().toUpperCase();
        const certificate= await Certificate.create(req.body);
        if(!certificate)  return res.status(500).send({message:'Something went wrong'}); 
        return res.status(201).send({data:certificate});

       
    } catch (error) {
        console.log(error);
        return res.status(500).send({message:'Something went wrong'}); 
    }
}

module.exports.getAllCertificate = ()=>async(req,res)=>{
    try {

        const certificates= await Certificate.find().paginate({ limit: req?.query?.limit || 10, page: req?.query?.page || 0 });
        if (!certificates) return res.status(500).send({ message: 'Something went wrong' });
        return res.status(200).send({ data: certificates });

       
    } catch (error) {
        console.log(error);
        return res.status(500).send({message:'Something went wrong'}); 
    }
}