const { auth } = require("../middleware");
const { create, login, me } = require("./user.entity");

module.exports.user=function(){
    this.route.post('/user',create(this));
    this.route.post('/login',login(this));
    this.route.get('/me',auth, me(this));
    


}