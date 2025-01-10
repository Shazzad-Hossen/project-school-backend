const { auth } = require("../middleware");
const { createMessage } = require("./message.entity");


function sendmessage(){
    this.route.post('/send-message', createMessage(this));

}

module.exports=sendmessage;