const Order =require('./order.schema');


const createAllowed= new Set(['course', 'phone', 'tnxId']);

module.exports.create = ()=>async(req,res)=>{
    try {
        const isValid= Object.keys(req.body.length!==0) && Object.keys(req.body).every(key=>createAllowed.has(key));
        if(!isValid) return res.status(400).send({message:'bad request'});

        const isFound= await Order.findOne({tnxId:req.body.tnxId, status:'confirmed'});
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