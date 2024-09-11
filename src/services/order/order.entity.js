const { default: mongoose } = require('mongoose');
const Order =require('./order.schema');


const createAllowed= new Set(['course', 'phone', 'tnxId']);

module.exports.create = ()=>async(req,res)=>{
    try {
        const isValid= Object.keys(req.body.length!==0) && Object.keys(req.body).every(key=>createAllowed.has(key));
        if(!isValid) return res.status(400).send({message:'bad request'});

        const isFound= await Order.findOne({tnxId:req.body.tnxId, status:{$in:['confirmed','pending']}});
        if(isFound) return res.status(400).send({message:'This Tnx is has already been used'});

        const order= await Order.create({
            user: req.user._id.toString(),
            course: req.body.course,
            phone: req.body.phone,
            tnxId: req.body.tnxId
        });
        if(!order) return res.status(500).send({message:'Something went wrong.'});
        return res.status(201).send({message:'Order successfully placed', data: order});
    } catch (error) {
        console.log(error);
        return res.status(500).send({message:'Something went wrong'}); 
    }
}


module.exports.getAll = () => async (req, res) => {
    try {
        const filter = {};
        const status = req.params.status;

        if (status) {
            if (status === 'pending') filter.status = 'pending';
            else if (status === 'cancelled') filter.status = 'cancelled';
            else if (status === 'confirmed') filter.status = 'confirmed';
        }

        const limit = parseInt(req.query.limit) || 10;
        const page = parseInt(req.query.page) || 1;

        const options = {
            populate: { path: 'user course' },
            limit: limit,
            page: page,
        };

        const orders = await Order.paginate(filter, options);

        if (!orders) return res.status(500).send({ message: 'Something went wrong' });

        return res.status(200).send({ message: 'ok', data: orders });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Something went wrong' });
    }
};

module.exports.getSingle = () => async (req, res) => {
    try {
       if(!req.params.id)  return res.status(400).send({message:'Bad request'});
       const order = await Order.findOne({_id:req.params.id}).populate('course user');
       if(!order) return res.status(500).send({message:'Something went wrong.'});
       return res.status(200).send({data: order});

      
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Something went wrong' });
    }
};


module.exports.updateStatus = () => async (req, res) => {
    try {
        if(!req.body.status || !req.params.id) return res.status(400).send({message:'Bad request'});
        else if(req.body.status!=='cancelled' && req.user.role!=='admin') return res.status(401).send({message:'Unauthorized'});
        const order = await Order.findOne({_id: req.params.id});
        if(!order) return res.status(500).send({message:'Something went wrong.'});
        order.status=req.body.status;
        await order.save();
        await order.populate('user course');
        return res.status(200).send({data: order});

      
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Something went wrong' });
    }
};



module.exports.getEnrolledUsers = () => async (req, res) => {
    try {
      if(!req.params.id)  return res.status(400).send({message:'Bad request'});
      const enrolledUsers= await Order.aggregate([
        {
          '$match': {
            'course':new mongoose.Types.ObjectId(req.params.id), 
            'status': 'confirmed'
          }
        }, {
          '$lookup': {
            'from': 'users', 
            'localField': 'user', 
            'foreignField': '_id', 
            'as': 'user'
          }
        }, {
          '$unwind': {
            'path': '$user'
          }
        }, {
          '$project': {
            'user': 1, 
            '_id': 0
          }
        }
      ]);

      return res.status(200).send({data:enrolledUsers});

      
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Something went wrong' });
    }
};