const { auth, checkRole } = require("../middleware");
const { create, login, me, updateOwn, logout, getAllUser } = require("./user.entity");

function user(){
    this.route.post('/user',create(this));
    this.route.post('/login',login(this));
    this.route.get('/me',auth, me(this));
    this.route.patch('/user/:id',auth, updateOwn(this));
    this.route.get('/logout',auth, logout(this));
    this.route.get('/user',auth, checkRole(['admin']), getAllUser(this));

    
    


}

module.exports=user;