const path = require('path');

module.exports.getFile=()=>async(req,res)=>{
    try {
        if (!req.params.id) return res.status(400).send({ success: false, message: 'Invalid file id' });
        const filePath = path.join(path.resolve(), 'files', req.params.id);
        res.status(200).sendFile(filePath);
    
      } catch (error) {
        console.log(error);
        res.status(500).send('Something wents wrong');
    
      }
    
}