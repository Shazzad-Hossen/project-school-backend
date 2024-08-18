const { demoGet } = require("./demo.entity");
const { demoMiddleware } = require("./demo.middleware");

function demo (){
    this.route.get('/demo',demoMiddleware,demoGet(this));
   


}

module.exports=demo;