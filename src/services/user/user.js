const { create, login } = require("./user.entity");

module.exports.user=function(){
    this.route.post('/user',create(this));
    this.route.post('/login',login(this));
    


}