const { create } = require("./user.entity");

module.exports.user=function(){
    this.route.post('/user',create(this));


}