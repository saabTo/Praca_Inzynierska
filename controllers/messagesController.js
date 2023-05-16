const MessageModel = require('../models/messagesModel');
const mongoose = require('mongoose');
const ChatModel = require('../models/chatModel');
const UserModel = require('../models/userModel');

// //utworzenie wiadomości
// const createMessage = async(req,res)=>{
//   const {chatId, senderId, text} = req.body
//   const newMessage = new MessageModel({
//     chatId,
//     senderId,
//     text,
//   });
//   try {
//     const result = await newMessage.save();
//     res.status(200).json(result);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };


const admin = require('firebase-admin');

// Inicjalizacja Firebase, only if it hasn't already been initialized
if (!admin.apps.length) {
  const serviceAccount = require("C:\\Users\\Legion\\Desktop\\pracaInż\\settings\\chat-6e313-firebase-adminsdk-olak8-2f697e480a.json");
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const createMessage = async (req, res) => {
  const { chatId, senderId, text } = req.body;
  const newMessage = new MessageModel({
    chatId: chatId.toString(),
    senderId,
    text,
    displayed: false
  });
  try {
    const result = await newMessage.save();
    const chat = await ChatModel.findOne({ chatId: chatId.toString() }); // znajdź czat na podstawie chatId
    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }
    
    const recipientId = await chat.getRecipientId(senderId); // wywołaj metodę getRecipientId na obiekcie czatu
    const recipient = await UserModel.findById(recipientId);

    const fcmToken = recipient.fcmToken;
    const message = {
      'notification': {
        'title': 'Nowa wiadomość',
        'body': 'Otrzymałeś nową wiadomość'
      },
      'token': fcmToken

    };
    const updatedMessages = await axios.get(`/messages/${chatId}`); // pobierz zaktualizowaną listę wiadomości
    setMessagesByChatId(updatedMessages.data);
    // Wysłanie powiadomienia
    const response = await admin.messaging().send(message);
    console.log(response);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};
const getMessagesByChatId = async(req,res)=>{
  const {chatId} = req.params;
  try {
    const result = await MessageModel.find({chatId});
    res.status(200).json(result);
  } catch (error) {
        
    res.status(500).json(error)
}
}

const markMessageAsRead = async (req, res) => {
  const { chatId, userId } = req.params;

  try {
    const messages = await MessageModel.find({ chatId });
    if (!messages) {
      return res.status(404).json({ message: 'Message not found' });
    }
    for (const message of messages) {
      if (message && message.senderId !== userId && !message.displayed) {
        console.log(`Zmieniłem dla: ${message.chatId} i ${message._id}`);
        message.displayed = true;
        const updatedMessage = await MessageModel.findByIdAndUpdate(message._id, message, { new: true });
        await updatedMessage.save();
      }
    }

    res.status(200).json({ message: 'Messages marked as read' });
  } catch (error) {
    res.status(500).json(error);
  }
};



module.exports = {getMessagesByChatId,createMessage, markMessageAsRead};  