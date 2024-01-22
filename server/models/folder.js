const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const documentSchema = new Schema({
  fileName: String,
  fileBuffer: Buffer,
});

const folderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  documents: [documentSchema],
});

const Folder = mongoose.model('Folder', folderSchema);

module.exports = Folder;