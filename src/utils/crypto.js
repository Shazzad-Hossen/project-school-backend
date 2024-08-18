const crypto = require('crypto');
const settings= require('../settings');
const secretKey = settings.ENCRYPTION_SECRET;


// Encrypt the password
module.exports={
    encrypt:(data)=>{
        try {
      
            
        } catch (error) {
            console.log(error);
            return null;
            
        }

    },

    decrypt:(hash)=>{
        try {
       
            
        } catch (error) {
            console.log(error);
            return null;
            
        }

    }
}

