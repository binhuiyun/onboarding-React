const Folder = require("../models/folder");

const createFolderIfNotExists = async (u_id) => {
  const existingFolder = await Folder.findOne({ user: u_id });

  if (!existingFolder) {
    const newFolder = new Folder({ user: u_id, documents: [] });
    await newFolder.save();
    return newFolder;
  }

  return existingFolder;
};

const addToFolder = async (req, res) => {
  const u_id = req.params.id;
  const data = req.file;
  const { originalname, buffer } = req.file;
  console.log(u_id, data);

  const folder = await createFolderIfNotExists(u_id);

  folder.documents.push({
    fileName: originalname,
    fileBuffer: buffer,
  });
  await folder.save();
  res.status(200).json(folder);
};

const getFolder = async (req, res) => {
  const u_id = req.params.id;
  try {
    const folder = await Folder.findOne({ user: u_id });
    if (!folder) {
      res.status(404).json({ message: "Folder not found" });
    } else {
      const documents = folder.documents;
      return res.status(200).json(documents);
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const updateFolder = async (req, res) => {
  const u_id = req.params.id;
  const folder = req.body;
  console.log(u_id, folder);

  const record = await Folder.findOne({ user: u_id });
  if (!record) {
    res.status(404).json({ message: "Folder not found" });
  } else {
    await Folder.findOneAndUpdate({ user: u_id }, folder);
    res.status(200).json(folder);
  }
};

module.exports = {
  addToFolder,
  getFolder,
  updateFolder,
};
