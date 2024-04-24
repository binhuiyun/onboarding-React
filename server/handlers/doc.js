const Doc = require('../models/doc');

const getAllDocument = async (req, res) => {
    try{
        const doc = await Doc.find();
        res.status(200).json(doc);
        console.log("fetching all doc", doc.length);
    }catch(err){
        res.status(500).json({ message: "Server Error" });
    }
}

const updateDocument = async (req, res) => {
    try{
        const doc = await Doc.findById(req.params.id);
        if(doc){
            doc.status = req.body.status ?? doc.status;
            doc.feedback = req.body.feedback ?? doc.feedback;
            await doc.save();
            res.status(200).json(doc);
        }
    }catch(err){
        res.status(500).json({ message: "Server Error" });
    }
}

module.exports = {getAllDocument, updateDocument};