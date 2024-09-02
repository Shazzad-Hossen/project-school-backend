const { getFile } = require("./file.entity");

function file (){
    this.route.get('/file/:id', getFile(this));


}

module.exports=file;