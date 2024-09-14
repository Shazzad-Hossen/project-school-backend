
const Certificate = require('./certificate.schema');
const fs = require('node:fs');
const path = require('node:path');



module.exports.uploadCertificate = ({ fileUp }) => async (req, res) => {
    try {
        req.body = JSON.parse(req.body.data);
        if (!req.body.user || !req.body.course || !req.files.certificate) return res.status(400).send({ message: 'Bad request' });
        const isExist = await Certificate.findOne({ user: req.body.user, course: req.body.course });
        if (isExist) return res.status(400).send({ message: 'Certificate already exist' });
        req.body.certificate = await fileUp(req.files.certificate.path);
        req.body.cId = (req.body.user.slice(-5) + Date.now()).toString().toUpperCase();
        const certificate = await Certificate.create(req.body);
        if (!certificate) return res.status(500).send({ message: 'Something went wrong' });
        return res.status(201).send({ data: certificate });


    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Something went wrong' });
    }
}

module.exports.getAllCertificate = () => async (req, res) => {
    try {

        const certificates = await Certificate.find().paginate({ populate: { path: 'user course' }, limit: req?.query?.limit || 10, page: req?.query?.page || 0 });
        if (!certificates) return res.status(500).send({ message: 'Something went wrong' });
        return res.status(200).send({ data: certificates });


    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Something went wrong' });
    }
}



module.exports.getSingleCertificate = () => async (req, res) => {
    try {
        if (!req.params.cId) return res.status(400).send({ message: 'Bad request' });

        const certificate = await Certificate.findOne({ cId: req.params.cId }).populate('user course')
        if (!certificate) return res.status(500).send({ message: 'Something went wrong' });
        return res.status(200).send({ data: certificate });


    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Something went wrong' });
    }
}



module.exports.deleteCertificate = () => async (req, res) => {
    try {
        if (!req.params.id) return res.status(400).send({ message: 'Bad request' });

        const certificate = await Certificate.findOne({ _id: req.params.id });
        if (!certificate) return res.status(500).send({ message: 'Something went wrong' });


        const delete_res = await Certificate.deleteOne({ _id: req.params.id });
        if (!delete_res.acknowledged) return res.status(500).send({ message: 'Something went wrong' });
        const filePath = path.join(path.resolve(), 'files', certificate.certificate.slice(4));
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        } else {
            console.log('Failed to delete file');
        }
        return res.status(200).send({ message: 'Successfully deleted' });






    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Something went wrong' });
    }
}