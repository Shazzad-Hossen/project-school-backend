const { auth, checkRole } = require("../middleware");
const { create, getAll, deleteOne, editOne, getSingle } = require("./course.entity");


function course (){
    this.route.post('/course', auth, checkRole(['admin']), create(this));
    this.route.get('/course', getAll(this));
    this.route.get('/course/:id', getSingle(this));
    this.route.delete('/course/:id', auth, checkRole(['admin']), deleteOne(this));
    this.route.patch('/course/', auth, checkRole(['admin']), editOne(this));

}

module.exports=course;