const { auth, checkRole } = require("../middleware");
const { create, getAll, deleteOne, editOne, getSingle } = require("./blog.entity");


function blog (){
    this.route.post('/blog', auth, checkRole(['admin']), create(this));
    this.route.get('/blog', getAll(this));
    this.route.get('/blog/:id', auth, getSingle(this));
    this.route.delete('/blog/:id', auth, checkRole(['admin']), deleteOne(this));
    this.route.patch('/blog/', auth, checkRole(['admin']), editOne(this));

}

module.exports=blog;