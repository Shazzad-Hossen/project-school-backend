
const App = require('./app');
const connexctDatabase= require('./controllers/mongodb');
const settings = require('./settings');

const deps = [{
    method: connexctDatabase,
    args: [settings]
  }];


(async()=>{

    const app = new App({deps});
    app.start();

})();