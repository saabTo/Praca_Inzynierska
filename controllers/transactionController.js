const TransactionModel = require("../models/transactionModel");
const mongoose = require('mongoose');

const PlantModel = require("../models/plantModel");
//const Post = require("../server");
const ChatModel = require('../models/chatModel');
const {v4: uuidv4} = require('uuid');
const {Post} = require('../models/postCard');
// const Post = mongoose.model('Post', postSchema);

const getTransaction = async (req, res) => {
  const transactionId = req.params.transactionId;

  try {
    const transaction = await TransactionModel.findOne({ transactionId });

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json(transaction);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const postTransaction = async (req, res) => {
  const chatId = req.body.chatId;
  const plantIdGiver = req.body.plantIdGiver;
  const plantIdTaker = req.body.plantIdTaker;
  try {
    const existingTransaction = await TransactionModel.findOne({ chatId: chatId });

    if (existingTransaction) {
      return res.status(409).json({ message: "Transaction for this chat already exists" });
    }
    
    const transaction = new TransactionModel({
      transactionId: uuidv4(),
      status: req.body.status,
      chatId: chatId,
      plantIdGiver: plantIdGiver,
      plantIdTaker: plantIdTaker
    });
  
    const savedTransaction = await transaction.save();
    res.status(201).json(savedTransaction);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


const endTransaction = async (req, res) => {
  const chatId = req.params.chatId;
  try {
    const transaction = await TransactionModel.findOne({ chatId: chatId });
    
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    
    const plantIdGiver = transaction.plantIdGiver;
    const plantIdTaker = transaction.plantIdTaker;
    
    // Delete the plants with the given ids
    const deletePlantGiver = await Post.deleteOne({ _id: plantIdGiver });
    const deletePlantTaker = await PlantModel.findByIdAndDelete({ _id: plantIdTaker });
    //const deleteChat = await ChatModel.deleteOne({chatId: chatId});

    res.status(200).json({ message: "Transaction ended successfully", deletedPlants: { deletePlantTaker,deletePlantGiver } });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};




module.exports = {
  endTransaction,
  postTransaction,
  getTransaction
};
