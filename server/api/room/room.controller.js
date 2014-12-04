'use strict';

var _ = require('lodash');
var Room = require('./room.model');

// Get list of rooms
exports.index = function(req, res) {
  Room.find(function (err, rooms) {
    if(err) { return handleError(res, err); }
    return res.json(200, rooms);
  });
};

// Get list of places given a coordinate within the given range
exports.getPlaces =  function(req, res) {
  var places = [];
  var latitude = req.params.latitude;
  var longitude = req.params.longitude;
  var range = req.params.range;

  if ( typeof latitude === 'undefined' || typeof longitude === 'undefined' ||
      typeof range === 'undefined' ) {
    return handleError(res, "Insufficient parameters");
  }
  
  Room.find({
    geolocation: {
      $nearSphere: [ longitude, latitude ],
      $maxDistance: range
    }
  }, function(error, rooms) {
    if (error) {
      return handleError(res, error);
    }
    for (var i = 0; i < rooms.length; i++) {
      var place = {
        latitude: rooms[i].geolocation.coordinates[0],
        longitude: rooms[i].geolocation.coordinates[1],
        id: rooms[i].houseId,
        title: rooms[i].area
      }
      places.push(place);
    }
    return res.json(200, places);
  });
}


// Get a single room
exports.show = function(req, res) {
  Room.findById(req.params.id, function (err, room) {
    if(err) { return handleError(res, err); }
    if(!room) { return res.send(404); }
    return res.json(room);
  });
};

// Creates a new room in the DB.
exports.create = function(req, res) {
  Room.create(req.body, function(err, room) {
    if(err) { return handleError(res, err); }
    return res.json(201, room);
  });
};

// Updates an existing room in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Room.findById(req.params.id, function (err, room) {
    if (err) { return handleError(res, err); }
    if(!room) { return res.send(404); }
    var updated = _.merge(room, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, room);
    });
  });
};

// Deletes a room from the DB.
exports.destroy = function(req, res) {
  Room.findById(req.params.id, function (err, room) {
    if(err) { return handleError(res, err); }
    if(!room) { return res.send(404); }
    room.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
