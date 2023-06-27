// bikeController.js
const Bike = require('../models/Bike');

const getAllBikeItems = async (req, res) => {
  try {
    const bikeItems = await Bike.find();
    res.status(200).json(bikeItems);
  } catch (error) {
    console.error('Error fetching bike details:', error);
    res.status(500).json({ message: 'Failed to fetch bike details' });
  }
};

const getBikeById = async (req, res) => {
  try {
    const { id } = req.params;
    const bike = await Bike.findById(id);
    if (!bike) {
      return res.status(404).json({ message: 'Bike not found' });
    }
    res.status(200).json(bike);
  } catch (error) {
    console.error('Error fetching Bike:', error);
    res.status(500).json({ message: 'Failed to fetch Bike' });
  }
};

const getBikeItemsByType = async (req, res) => {
  try {
    const { type } = req.params;
    const isElectric = type === 'Electric';
    const bikeItems = await Bike.find({ isElectric });
    res.status(200).json(bikeItems);
  } catch (error) {
    console.error('Error fetching bike details:', error);
    res.status(500).json({ message: 'Failed to fetch bike details' });
  }
};

const getBikeItemsByCostRange = async (req, res) => {
  try {
    const { min, max } = req.params;
    const bikeItems = await Bike.find({ cost: { $gte: min, $lte: max } });
    res.status(200).json(bikeItems);
  } catch (error) {
    console.error('Error fetching bike details:', error);
    res.status(500).json({ message: 'Failed to fetch bike details' });
  }
};

const addBikeItem = async (req, res) => {
  try {
    const { name, location, cost, isElectric } = req.body;
    const bikeItem = new Bike({ name, location, cost, isElectric });

    const existingBike = await Bike.findOne({ name, cost });
    if (existingBike) {
      return res.status(409).json({
        message: 'Employee already exists',
        employee: existingBike,
      });
    }

    await bikeItem.save();
    res
      .status(201)
      .json({ message: 'Bike details added successfully', bikeItem });
  } catch (error) {
    console.error('Error adding bike details', error);
    res.status(500).json({ message: 'Failed to add Bike details' });
  }
};

const updateBikeItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, location, cost, isElectric } = req.body;
    const updatedBikeItem = await Bike.findByIdAndUpdate(
      id,
      { name, location, cost, isElectric },
      { new: true }
    );
    if (!updatedBikeItem) {
      return res.status(404).json({ message: 'Bike not found' });
    }
    res
      .status(200)
      .json({ message: 'Bike details updated successfully', updatedBikeItem });
  } catch (error) {
    console.error('Error updating Bike details:', error);
    res.status(500).json({ message: 'Failed to update bike details' });
  }
};

const deleteBikeItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBikeItem = await Bike.findByIdAndDelete(id);
    if (!deletedBikeItem) {
      return res.status(404).json({ message: 'Bike details not found' });
    }
    res
      .status(200)
      .json({ message: 'Bike details deleted successfully', deletedBikeItem });
  } catch (error) {
    console.error('Error deleting bike details:', error);
    res.status(500).json({ message: 'Failed to delete bike details' });
  }
};

module.exports = {
  getAllBikeItems,
  getBikeItemsByType,
  getBikeItemsByCostRange,
  addBikeItem,
  updateBikeItem,
  deleteBikeItem,
  getBikeById,
};
