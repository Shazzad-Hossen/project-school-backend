const { auth, checkRole } = require("../middleware");
const { uploadGallaryImage, getAllGallaryImages, deleteOneGallaryImage } = require("./gallary.entity");


function gallary (){
    this.route.post('/gallary', auth, checkRole(['admin']), uploadGallaryImage(this));
    this.route.get('/gallary', getAllGallaryImages(this));
    this.route.delete('/gallary/:id', auth, checkRole(['admin']), deleteOneGallaryImage(this));



}

module.exports=gallary;