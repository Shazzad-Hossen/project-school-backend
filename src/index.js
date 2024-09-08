
const App = require('./app');
const connectDatabase= require('./controllers/mongodb');
const settings = require('./settings');
const path= require('node:path');
const fs= require('node:fs');


const deps = [{
    method: connectDatabase,
    args: [settings]
  }];


(async()=>{
  const statics = path.resolve(process.cwd(), 'client');
  if (!fs.existsSync(statics)) {
    fs.mkdirSync(statics);
  }


    const app = new App({deps});
    app.start();

})();