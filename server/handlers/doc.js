const Doc = require('../models/doc');


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

const deleteDocument = async (req, res) => {
    try{    
      const doc = await Doc.findById(req.params.id);
        if(doc){
            console.log("delete", req.params.id);
            await doc.deleteOne();
            res.status(200).json({ message: "Document deleted" });
        }
    }catch(err){
        console.log(err);
        res.status(500).json({ message: err.message });
    }
}

module.exports = {deleteDocument, updateDocument};