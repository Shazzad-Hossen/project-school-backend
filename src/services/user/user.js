const { auth } = require("../middleware");
const { create, login, me, updateOwn, logout } = require("./user.entity");

module.exports.user=function(){
    this.route.post('/user',create(this));
    this.route.post('/login',login(this));
    this.route.get('/me',auth, me(this));
    this.route.patch('/user/:id',auth, updateOwn(this));
    this.route.get('/logout',auth, logout(this));

    
    


}