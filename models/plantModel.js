const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const plantSchema = new Schema({
userId: {
  type: String,
  ref: 'User'
}, //id użytkownika do którego należy
species: String, //gatunek rośliny (np aloes)
age: String,
notes: String //opis
});
  
plantSchema.statics.FindPlantsByUserId = async function(userId) {
    const plants = await this.find({ userId });
    if (plants != null) {
      return plants;
    } else {
      return 0;
    }
  };
  
const PlantModel = mongoose.model("PlantModel", plantSchema);
module.exports = PlantModel;

//MODEL ROŚLINY W WIRTUALNYM PORTFELU