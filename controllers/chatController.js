const ChatModel = require('../models/chatModel.js');
const MessageModel = require('../models/messagesModel.js');
const {v4: uuidv4} = require('uuid');


async function createOrGetChat(giverUserId, takerUserId) {
    // czy czat dla podanych użytkowników istnieje
    let chat = await ChatModel.findOne({ giverUserId, takerUserId });
  
    // jeśli istnieje otrzymujemy jego id
    if (chat) {
      return chat.chatId;
    }
  
    // jeśli nie istnieje, tworzymy nowy czat i zwracamy jego id
    await ChatModel.CreateNewChat(giverUserId, takerUserId);
    chat = await ChatModel.findOne({ giverUserId, takerUserId});
    return chat.chatId;

  }

const createChat = async (req,res) =>{
    const x = await createOrGetChat(req.body.giverUserId, req.body.takerUserId);
    try {
    res.status(200).json({chatId: x});

    } catch (error) {
        res.status(400).json({result:'Error'});
    }

}
const getChatsForUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const chats = await ChatModel.find({ $or: [{ giverUserId: userId }, { takerUserId: userId }] });
    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

const lastChatMessage = async (req, res) => {
  const { userId, chatId } = req.params;

  try {
    // Szukamy czatu po id i id użytkownika
    const chat = await ChatModel.findOne({
      chatId,
      $or: [{ giverUserId: userId }, { takerUserId: userId }],
    });

    if (!chat) {
      return res.status(404).json({ message: 'Czat nie znaleziony.' });
    }

    // Pobieramy ostatnią wiadomość dla czatu
    const lastMessage = await MessageModel.findOne({ chatId })
      .sort({ date: -1 })
      .limit(1);

    // Sprawdzamy, czy ostatnia wiadomość została przeczytana
    const lastMessageRead = await MessageModel.findOne({
      chatId,
      isRead: false,
    });

    res.status(200).json({ chat, lastMessage, lastMessageRead });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Błąd podczas pobierania czatu i wiadomości.' });
  }
};


module.exports = {createChat, createOrGetChat, getChatsForUser, lastChatMessage};