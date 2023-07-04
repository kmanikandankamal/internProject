// Bike.js
const mongoose = require('mongoose');

const bikeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  cost: { type: Number, required: true },
  isElectric: { type: Boolean, required: true },
  rating: { type: Number, required: true },
  secretBike: { type: Boolean, default: false },
});

bikeSchema.pre('/^find/', function (next) {
  this.find({ secretBike: { $ne: true } });
  next();
});

bikeSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { secretBike: { $ne: true } } });
  next();
});

const Bike = mongoose.model('Bike', bikeSchema);
module.exports = Bike;
