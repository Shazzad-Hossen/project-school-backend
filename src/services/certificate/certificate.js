const { auth, checkRole } = require("../middleware");
const { uploadCertificate, getAllCertificate, getSingleCertificate, deleteCertificate } = require("./certificate.entity");




function certificate (){
    this.route.post('/certificate', auth, checkRole(['admin']), uploadCertificate(this));
    this.route.get('/certificate', auth, checkRole(['admin']), getAllCertificate(this));
    this.route.get('/certificate/:cId', getSingleCertificate(this));
    this.route.delete('/certificate/:id', deleteCertificate(this));
    
    


}

module.exports=certificate;