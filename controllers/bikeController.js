// bikeController.js
const Bike = require('../models/Bike');
const APIFeatures = require('../utils/apiFeatures');
const GetInfoByID = require('../utils/getInfoById');
const DeleteInfoByID = require('../utils/deleteInfo');
const AddEntity = require('../utils/addEntity');

const aliasTopBikeItems = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-rating,cost';
  req.query.fields = 'name,cost,loaction,rating';
  next();
};

// const catchAsync= fn =>{
// fn(req,res,next)
// }

const getAllBikeItems = async (req, res) => {
  try {
    //Execute Query
    const features = new APIFeatures(Bike.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const bikeItems = await features.query;

    //Send Response
    res.status(200).json(bikeItems);
  } catch (error) {
    // console.error('Error fetching bike details:', error);
    res.status(500).json({ message: 'Failed to fetch bike details' });
  }
};

const getBikeById = async (req, res) => {
  try {
    const getBikeDataById = new GetInfoByID(Bike);
    await getBikeDataById.getById(req, res);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch Bike' });
  }
};

const addBikeItem = async (req, res) => {
  try {
    const addBikeData = new AddEntity(Bike);
    await addBikeData.addItem(req, res);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add Bike details' });
  }
};

const updateBikeItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, location, cost, isElectric, rating } = req.body;
    const updatedBikeItem = await Bike.findByIdAndUpdate(
      id,
      { name, location, cost, isElectric, rating },
      { new: true }
    );
    if (!updatedBikeItem) {
      return res.status(404).json({ message: 'Bike not found' });
    }
    res
      .status(200)
      .json({ message: 'Bike details updated successfully', updatedBikeItem });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update bike details' });
  }
};

const deleteBikeItem = async (req, res) => {
  try {
    const delBikeDataById = new DeleteInfoByID(Bike);
    await delBikeDataById.deleteInfo(req, res);
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete bike data' });
  }
};

const getBikeItemsByType = async (req, res) => {
  try {
    const { type } = req.params;
    const isElectric = type === 'Electric';
    const bikeItems = await Bike.find({ isElectric });
    res.status(200).json(bikeItems);
  } catch (error) {
    // console.error('Error fetching bike details:', error);
    res.status(500).json({ message: 'Failed to fetch bike details' });
  }
};

const getBikeItemsByCostRange = async (req, res) => {
  try {
    const { min, max } = req.params;

    const bikeItems = await Bike.find({ cost: { $gte: min, $lte: max } });

    // const bikeItems = await Bike.find(req.query);

    res.status(200).json(bikeItems);
  } catch (error) {
    // console.error('Error fetching bike details:', error);
    res.status(500).json({ message: 'Failed to fetch bike details' });
  }
};

const getBikeItemsByLocation = async (req, res) => {
  try {
    const { location } = req.params;

    const bikeItems = await Bike.find({ location });
    res.status(200).json(bikeItems);
  } catch (error) {
    // console.error('Error fetching bike details:', error);
    res.status(500).json({ message: 'Failed to fetch bike details' });
  }
};

const getBikeStats = async (req, res) => {
  try {
    const stats = await Bike.aggregate([
      {
        $match: { rating: { $gte: 4.5 } },
      },
      {
        $group: {
          _id: '$isElectric',
          numBikes: { $sum: 1 },
          avgRating: { $avg: '$rating' },
          avgCost: { $avg: '$cost' },
          minCost: { $min: '$cost' },
          maxCost: { $max: '$cost' },
        },
      },
      {
        $sort: { avgCost: 1 },
      },
      // {
      //   $match: { _id: { $ne: false } },
      // },
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        stats,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
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
  getBikeItemsByLocation,
  aliasTopBikeItems,
  getBikeStats,
};
