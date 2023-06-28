const express = require('express');

const bikeController = require('../controllers/bikeController');

const router = express.Router();

router.get('/', bikeController.getAllBikeItems);

router.get('/:id', bikeController.getBikeById);

router.get('/type/:type', bikeController.getBikeItemsByType);

router.get('/cost/:min/:max', bikeController.getBikeItemsByCostRange);

router.get('/location/:location', bikeController.getBikeItemsByLocation);

router.post('/', bikeController.addBikeItem);

router.put('/:id', bikeController.updateBikeItem);

router.delete('/:id', bikeController.deleteBikeItem);

module.exports = router;
