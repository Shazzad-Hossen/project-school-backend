const { auth, checkRole } = require("../middleware");
const { create, getAll, deleteOne, editOne } = require("./announcement.entity");


function announcement (){
    this.route.post('/announcement', auth, checkRole(['admin']), create(this));
    this.route.get('/announcement', getAll(this));
    this.route.delete('/announcement/:id', auth, checkRole(['admin']), deleteOne(this));
    this.route.patch('/announcement/', auth, checkRole(['admin']), editOne(this));
}

module.exports=announcement;