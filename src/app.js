require('dotenv').config();
const express= require('express');
const cors=require('cors');
const settings = require('./settings');
const http= require('node:http');
const path= require('node:path');
const services= require('./services/index');
const morgan = require('morgan');
const crypto = require('./utils/crypto');
const cookieParser = require('cookie-parser');
const form = require('express-form-data');
const { fileUp } = require('./controllers/fileUp');


class App {
    constructor({ deps } = {}){
        this.express=express();
        this.config=settings;
        this.router = new express.Router();
        this.crypto= crypto;
        this.fileUp=fileUp;
        if (deps) {
            this.depPromises = deps.map(({ method, args }) => new Promise((resolve, reject) => method(...args).then(r => resolve(r)).catch((err) => reject(err))));
          }  
    }

    init(){
        this.express.use(morgan('common')); 
        this.express.use(
            cors({
              origin: this.config.origin,
              credentials: true
            }));
        this.express.use(express.json());
        this.express.use(cookieParser());
        this.express.use(form.parse());
       
        this.express.use('/api', this.router);
        this.express.use(express.static(path.resolve(process.cwd(), 'client')));
        this.server= http.createServer(this.express);

        services(this);
        this.listen()
    }

    configure(callback) {
        callback.call({
          ...this.express,
          route: this.router,
          crypto:this.crypto,
          settings: this.config,
          fileUp:this.fileUp
        });
      }

    listen(){
        this.express.get('*', (req, res) => {
            res.sendFile(path.resolve(process.cwd(), 'client', 'index.html'));
          });
      

        this.server.listen(this.config.port,async()=>{
            console.log(`=> Listening on ${this.config.port}`);
        })
    };

    start(){
        Promise.all(this.depPromises).then(res => res && res.length > 0 && console.log(`=> ${res}`)).then(() => this.init()).catch((err) => console.log(err));
    }

}
module.exports=App;