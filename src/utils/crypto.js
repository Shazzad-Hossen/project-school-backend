const crypto = require('crypto');
const settings= require('../settings');
const [KEY, IV]= settings.SECRET.split(':');
const jwt=require('jsonwebtoken')


// Encrypt the password
module.exports={
    encrypt:(data)=>{
        try {
            const encodedData= jwt.sign(data, settings.SECRET);
            const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(KEY,'hex'), Buffer.from(IV,'hex'));
            let encrypted = cipher.update(encodedData, 'utf8', 'hex');
            encrypted += cipher.final('hex');
            return encrypted;  
            
        } catch (error) {
            console.log(error);
            return null;
            
        }

    },

    decrypt:(encryptedText)=>{
        try {
            const decipher = crypto.createDecipheriv('aes-256-cbc',Buffer.from(KEY,'hex'), Buffer.from(IV,'hex'));
            let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
            decrypted += decipher.final('utf8');
            const encodedData=jwt.verify(decrypted, settings.SECRET);

            return encodedData
 
        } catch (error) {
            console.log(error);
            return null;
            
        }

    }
};

//use this function one time to generate secret key and store in the env then commentout it
// (()=>{
    
//     const key= crypto.randomBytes(32).toString('hex');
//     const iv= crypto.randomBytes(16).toString('hex');
//     console.log({SECRET:key+':'+iv});
// })();
