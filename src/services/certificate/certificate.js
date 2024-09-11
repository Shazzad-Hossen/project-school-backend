const { auth, checkRole } = require("../middleware");
const { uploadCertificate, getAllCertificate } = require("./certificate.entity");




function certificate (){
    this.route.post('/certificate', auth, checkRole(['admin']), uploadCertificate(this));
    this.route.get('/certificate', auth, checkRole(['admin']), getAllCertificate(this));
    


}

module.exports=certificate;