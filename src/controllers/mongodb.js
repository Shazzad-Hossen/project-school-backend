const { connect, set } = require("mongoose");

module.exports=function (settings) {
    return new Promise(async function (resolve, reject) {
      // Set mongoose properties
      set('strictQuery', true);
  
      // Connect
    try {
        const connection = await connect(settings.MONGODB_URL);

        if(connection) resolve('Connected to Database');
        
    } catch (error) {
        reject(error)
        
    }


    
    });
  }