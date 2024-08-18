
module.exports.demoGet=()=>async(req,res)=>{
    res.status(200).send(
        {
            status:'Ok',
            method:'GET',
            message:'Demo servcie is running'
        }

    )
}
