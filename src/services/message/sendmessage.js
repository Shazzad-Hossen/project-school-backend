const { auth } = require("../middleware");
const { createMessage, getMessages, getSingleMessage, updateSeenStatus, deleteMessage } = require("./message.entity");


function sendmessage(){
    this.route.post('/send-message', createMessage(this));
    this.route.get('/message', auth, getMessages(this));
    this.route.get('/message/:id', auth, getSingleMessage(this));
    this.route.patch('/message/:id', auth, updateSeenStatus(this));
    this.route.delete('/message/:id', auth, deleteMessage(this));
    

}

module.exports=sendmessage;