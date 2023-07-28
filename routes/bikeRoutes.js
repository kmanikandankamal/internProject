const express = require('express');

const bikeController = require('../controllers/bikeController');

const router = express.Router();

router.get('/', bikeController.getAllBikeItems); //get all

router.get(
  '/top-5-cheap',
  bikeController.aliasTopBikeItems,
  bikeController.getAllBikeItems
);

router.get('/bike-stats', bikeController.getBikeStats);

router.get('/:id', bikeController.getBikeById);

router.get('/type/:type', bikeController.getBikeItemsByType);

router.get('/cost/:min/:max', bikeController.getBikeItemsByCostRange);

router.get('/location/:location', bikeController.getBikeItemsByLocation);

router.post('/', bikeController.addBikeItem); //add

router.put('/:id', bikeController.updateBikeItem); //update

router.delete('/:id', bikeController.deleteBikeItem); //delete

module.exports = router;
