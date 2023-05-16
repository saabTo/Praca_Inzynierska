const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new mongoose.Schema({
  messageId:{
    type:String
  },
  chatId:{
    type: String
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  text: {
    type:String
  },
  date: {
    type: Date,
    default: Date.now
},
lastMessageRead: {
  type: false,
},

displayed:{
  type: Boolean,
  default: false,},
},
{
    timestamps: true,
}

);
const MessageModel = mongoose.model("Message", MessageSchema);
module.exports = MessageModel;