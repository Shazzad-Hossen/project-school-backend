const { auth, checkRole } = require("../middleware");
const { uploadCertificate, getAllCertificate, deleteCertificate, getCertificateByNid } = require("./certificate.entity");




function certificate (){
    this.route.post('/certificate', auth, checkRole(['admin']), uploadCertificate(this));
    this.route.get('/certificate', auth, checkRole(['admin']), getAllCertificate(this));
    this.route.get('/certificate/:nid', getCertificateByNid(this));
    this.route.delete('/certificate/:id', deleteCertificate(this));
    
    


}

module.exports=certificate;