'use strict';

var express = require('express');
var controller = require('./room.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:latitude,:longitude,:range', controller.getPlaces);
router.get('/:id', controller.show);
router.post('/', controller.getPlaces);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
