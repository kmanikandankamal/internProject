// Bike.js
const mongoose = require('mongoose');

const BikeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  cost: { type: Number, required: true },
  isElectric: { type: Boolean, required: true },
  rating: { type: Number, required: true },
});

const Bike = mongoose.model('Bike', BikeSchema);
module.exports = Bike;
