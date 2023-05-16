const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');


const ChatSchema = mongoose.Schema({

    chatId:{
        type: String, // zmiana typu na String
      },
    giverUserId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    takerUserId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    date: {
        type: Date,
        default: Date.now
    },
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    },
    
   
    
});
// dodaj metodę getRecipientId do schematu
ChatSchema.methods.getRecipientId = async function (senderId) {
    const recipientId =
      this.giverUserId.toString() === senderId.toString()
        ? this.takerUserId.toString()
        : this.giverUserId.toString();
  
    if (this.lastMessageRead === false) {
      this.lastMessageRead = true;
      await this.save();
    }
  
    return recipientId;
  };
// ChatSchema.methods.getRecipientId = async function (senderId, receiverId) {
//     const recipientId = this.giverUserId.toString() === senderId.toString() ? this.takerUserId : this.giverUserId;
    
//     if (recipientId.toString() === receiverId.toString() && !this.lastMessageRead) {
//       this.lastMessageRead = true;
//       await this.save();
//     }
  
//     return recipientId.toString();
//   };
  
ChatSchema.statics.CreateNewChat = async function(giverUserId, takerUserId){
    const chatId = uuidv4();
    const chat = { chatId, giverUserId, takerUserId };
    await this.create(chat);
    console.log('Czat stworzony');
}

//metoda, która zostanie wywołana kiedy użytkownik odczyta wiadomość
// ChatSchema.methods.updateLastMessageRead = async function(userId) {
//     const now = new Date();
//     const update = { lastMessageRead: now };
//     const query = { _id: this._id, $or: [{ giverUserId: userId }, { takerUserId: userId }] };
//     const options = { new: true };
  
//     return await ChatModel.findOneAndUpdate(query, update, options).exec();
//   }

//if chat exist true lub false argumenty 2 x id użyt

const ChatModel = mongoose.model("Chat", ChatSchema)
module.exports = ChatModel