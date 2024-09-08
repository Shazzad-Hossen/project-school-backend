const { auth, checkRole } = require("../middleware");
const { create, getAll } = require("./order.entity");



function order (){
    this.route.post('/order', auth, checkRole(['user','admin']), create(this));
    this.route.get('/order',auth, checkRole(['admin']), getAll(this));
    // this.route.get('/course/:id', getSingle(this));
    // this.route.delete('/course/:id', auth, checkRole(['admin']), deleteOne(this));
    // this.route.patch('/course/', auth, checkRole(['admin']), editOne(this));

}

module.exports=order;