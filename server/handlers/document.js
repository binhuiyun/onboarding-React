const Document = require('../models/document');
const PersonalInformation = require('../models/personalInformation');

const getDocumentsByUserId = async (req, res) => {
  const u_id = req.params.id;
  try{
    const document = await Document.find({ userId: u_id });
    res.status(200).json(document);
    console.log("fetching document", document.length);
  }catch(err){
    res.status(500).json({ message: "Server Error" });
  }
}

const addToDocument = async (req, res) => {
  const u_id = req.params.id;
  const fileType = req.params.fileType;
  try{
    let document = await Document.findOne({ userId: u_id });   
    if (!document) {
      document = new Document({ userId: u_id , documents: [] });
    } 
    const { originalname, buffer } = req.file;
    document.documents.push({
      fileName: originalname,
      fileType: fileType,
      fileDoc: buffer,
      status: "pending",
    });
    await document.save();
    res.status(201).json(document);
  }catch(err){
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
}


module.exports = { getDocumentsByUserId, addToDocument };


