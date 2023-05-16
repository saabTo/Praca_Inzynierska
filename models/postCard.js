const mongoose = require('mongoose');
const multer = require('multer');

const postSchema = mongoose.Schema({
  name: String,
  type: String,
  price: String,
  state: String,
  description: String,
  productImg: {
    data: Buffer,
    contentType: String
  },
  imgBase64: String,
  userId: String,
  date: {
    type: Date,
    default: Date.now
  },
  isUsed:{
    type: Boolean,
    default: false
  }
});


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './');
  },
  filename: (req, file, cb) => {
    cb(null,  file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/png'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter, limits: {fileSize:5*1024*1024} });
const Post = mongoose.model('Post', postSchema);

module.exports = { Post, upload };
