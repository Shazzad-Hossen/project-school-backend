const { auth, checkRole } = require("../middleware");
const { create, getAll, updateStatus, getSingle, getEnrolledUsers, getEnrolledCourses, checkEnrollments } = require("./order.entity");



function order (){
    this.route.post('/order', auth, create(this));
    this.route.get('/order',auth, checkRole(['admin']), getAll(this));
    this.route.get('/user-orders',auth, getEnrolledCourses(this));
    this.route.get('/check-enrollmenmts/:id',auth, checkEnrollments(this));
    this.route.get('/order/:id',auth,  getSingle(this));
    this.route.get('/orders/course/:id', auth, checkRole(['admin']), getEnrolledUsers(this));
    this.route.patch('/order/update/:id', auth, updateStatus(this));
    

}

module.exports=order;