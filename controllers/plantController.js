const PlantModel = require("../models/plantModel.js");

const createPlant = async (req, res) => {
  const plant = new PlantModel({
    userId: req.body.userId,
    species: req.body.species,
    age: req.body.age,
    notes: req.body.notes
  });

  try {
    const savedPlant = await plant.save();
    res.status(201).send(savedPlant);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const getPlantsByUserId = async (req, res) => {
  try {
    const plants = await PlantModel.find({ userId: req.params.userId });
    if (!plants) {
      res.status(404).send({ error: "Nie posiadasz żadnych roślin w swoim portfelu" });
    } else {
      res.send(plants);
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};


const deletePlant = async (req, res) => {
  try {
    const deletedPlant = await PlantModel.deleteOne({ _id: req.params.plantId });
    if (deletedPlant.deletedCount === 0) {
      res.status(404).send({ error: "Nie znaleziono rośliny do usunięcia" });
    } else {
      res.send({ message: "Roślina została usunięta" });
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = {
  createPlant,
  getPlantsByUserId,
  deletePlant,
  
};
