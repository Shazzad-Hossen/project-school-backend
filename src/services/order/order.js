const { auth, checkRole } = require("../middleware");
const { create, getAll, updateStatus, getSingle, getEnrolledUsers } = require("./order.entity");



function order (){
    this.route.post('/order', auth, checkRole(['user','admin']), create(this));
    this.route.get('/order',auth, checkRole(['admin']), getAll(this));
    this.route.get('/order/:id',auth,  getSingle(this));
    this.route.get('/orders/course/:id', auth, checkRole(['admin']), getEnrolledUsers(this));
    this.route.patch('/order/update/:id', auth, updateStatus(this));

}

module.exports=order;