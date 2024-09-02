
const file = require("../file/file");
const announcement = require("./announcement/announcement");
const blog = require("./blog/blog");
const course = require("./course/course");
const demo = require("./demo/demo");
const { user } = require("./user/user");

module.exports= (app) => {
    app.configure(demo);
    app.configure(user);
    app.configure(announcement);
    app.configure(course);
    app.configure(file);
    app.configure(blog);
    

  };