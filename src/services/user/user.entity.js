const createAllowed= new Set(['email','name','username','nid', 'password']);
const User = require('./user.schema');
const SETTINGS =require('../../settings');

module.exports.create = ({crypto})=>async(req,res)=>{
    try {
    const isValid= Object.keys(req.body).every(key=>createAllowed.has(key));
    req.body.password= crypto.encrypt(req.body.password)
    if(!isValid) return res.status(400).send({message:'Bad request'});
    const isFound = await User.findOne({email:req.body.email})
    if(isFound) return res.status(409).send({message:'User already exist with this email address'});
    const user = await User.create(req.body);
    if(!user) return res.status(500).send({message:'Something went wrong'});
    return res.status(201).send({message:'Sign up successfull', data: user});
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({message:'Something went wrong'}); 
    }
}

module.exports.login=({crypto})=>async(req,res)=>{
    try {
        if(!req.body.email || !req.body.password) return res.status(400).send({message:'Please enter username or email adress and password'});
        let user = await User.findOne({email:req.body.email});
        if(!user) {
            user = await User.findOne({username:req.body.email});
            if(!user) return res.status(404).send({message:'No user exist with this email or username'})
        }
        
        const password = crypto.decrypt(user.password);
        if(password!==req.body.password) return res.status(400).send({message:'Invalid password'});
        const token = crypto.encrypt({id: user._id});
        //setup cookie here
        res.cookie(SETTINGS.COOKIE_NAME, token, {
            httpOnly: true,
            ...SETTINGS.useHTTP2 && {
              sameSite: 'None',
              secure: true,
            },
            ...!req.body.rememberMe && { expires: new Date(Date.now() + 172800000/*2 days*/) },
          });


        return res.status(200).send({message:"Sign in successful", data:user});

        
    } catch (error) {
        console.log(error);
        return res.status(500).send({message:'Something went wrong'});
        
    }
}

module.exports.me=({crypto})=>async(req,res)=>{
    try {
       res.status(200).send(req.user)

     
    } catch (error) {
        console.log(error);
        return res.status(500).send({message:'Something went wrong'});
        
    }
}

module.exports.updateOwn=({fileUp,crypto})=>async(req,res)=>{
    try {
        if(req.params.id!==req.user._id.toString()) return res.status(401).send({message: 'Unauthorized'});
        if(req.body.data) req.body=JSON.parse(req.body.data);
        if(req.files.file) req.body.image= await fileUp(req.files.file.path);
        if(req.files.nidFront) {
            req.body.nidFront= await fileUp(req.files.nidFront.path);
        }
        if(req.files.nidBack) {
            req.body.nidBack= await fileUp(req.files.nidBack.path);
        }
        if(req.body.currentPassword && req.body.newPassword){
            const password = crypto.decrypt(req.user.password);
            if(password===req.body.currentPassword) {
                req.body.password=crypto.encrypt(req.body.newPassword);
                delete req.body.currentPassword;
             delete req.body.newPassword;
            }
            else return res.status(400).send({message:'Wrong password'})

        }
        else {
            delete req.body.password;
            delete req.body.currentPassword;
            delete req.body.newPassword;
        }
        Object.keys(req.body).forEach(key=>req.user[key]=req.body[key]);
        req.user.save();
        return res.status(200).send({data:req.user});
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({message:'Something went wrong'});
        
    }
}


module.exports.logout = () => async (req, res) => {
    try {
      res.clearCookie(SETTINGS.COOKIE_NAME, {
        httpOnly: true,
        ...SETTINGS.useHTTP2 && {
          sameSite: 'None',
          secure: true,
        },
        expires: new Date(Date.now())
      });
      return res.status(200).send({message: 'Logout successful'});
    }
    catch (err) {
      console.log(err);
      return res.status(500).send({message:'Something went wrong'});
    }
  };