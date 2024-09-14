const { auth, checkRole } = require("../middleware");
const { create, login, me, updateOwn, logout, getAllUser, deleteOneUser, getSingleUser, updateUserStatus } = require("./user.entity");

function user(){
    this.route.post('/user',create(this));
    this.route.post('/login',login(this));
    this.route.get('/me',auth, me(this));
    this.route.patch('/user',auth, updateOwn(this));
    this.route.patch('/user/:id',auth,checkRole(['admin']), updateUserStatus(this));
    this.route.get('/logout',auth, logout(this));
    this.route.get('/user',auth, checkRole(['admin']), getAllUser(this));
    this.route.get('/user/:id',auth, checkRole(['admin']), getSingleUser(this));
    this.route.delete('/user/:id',auth, deleteOneUser(this));

    
    


}

module.exports=user;