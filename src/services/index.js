
const file = require("../file/file");
const announcement = require("./announcement/announcement");
const blog = require("./blog/blog");
const certificate = require("./certificate/certificate");
const course = require("./course/course");
const demo = require("./demo/demo");
const gallary = require("./gallary/gallary");
const sendmessage = require("./message/sendmessage");
const order = require("./order/order");
const team = require("./team/team");
const user = require("./user/user");


module.exports= (app) => {
    app.configure(demo);
    app.configure(user);
    app.configure(announcement);
    app.configure(course);
    app.configure(file);
    app.configure(blog);
    app.configure(order);
    app.configure(certificate);
    app.configure(team);
    app.configure(gallary);
    app.configure(sendmessage);
    
    
    

  };