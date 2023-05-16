const mongoose = require('mongoose');
const UserModel = require('../models/userModel');

  const deleteUser = async (req, res) => {
    try {
        const deletedUser= await UserModel.deleteOne({ _id: req.params.userId });
        if (deletedUser.deletedCount === 0) {
          res.status(404).send({ error: "Nie znaleziono użytkownika do usunięcia" });
        } else {
          res.send({ message: "Użytkownik został usunięty" });
        }
      } catch (error) {
        res.status(400).send({ error: error.message });
      }
    };
  
  module.exports = {deleteUser};  