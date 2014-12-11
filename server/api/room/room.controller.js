'use strict';

var _ = require('lodash');
var Room = require('./room.model');

// Get list of rooms
exports.index = function(req, res) {
  Room.find(function(err, rooms) {
    if (err) {
      return handleError(res, err);
    }
    return res.json(200, rooms);
  });
};

// Get list of places given a coordinate within the given range
exports.getPlaces = function(req, res) {
  var places = [],
    latitude = req.body.latitude,
    longitude = req.body.longitude,
    range = req.body.maxDistance,
    filter = req.body.filter;


  if (typeof latitude === 'undefined' || typeof longitude === 'undefined' ||
    typeof range === 'undefined') {
    return handleError(res, "Insufficient parameters");
  }

  var query = {},
    gender_query = [],
    price_query = {};

  //if filter object is available in the request
  if (filter) {
    //filter have gender filter
    if (filter.gender) {
      //add them to the query as array which can be used for in query 
      if (filter.gender.male) {
        gender_query.push("male");
      }
      if (filter.gender.female) {
        gender_query.push("female");
      }

      //if price filter is selected
      if (filter.price) {
        if (filter.price.from) {
          price_query.rooms = {$elemMatch:{rent:{$lt:filter.price.from}}};
          
        }

        if (filter.price.to) {
          price_query.rooms = {$elemMatch:{rent:{$gt:filter.price.to}}};
        }
      }
    }
  }

  //if gender_query is not empty add to original query
  // it will form mongo query as follows
  // db.rooms.find({"preferences.sex":{$in:["male","female"]}});
  if (gender_query.length > 0) {
    query.preferences = {
      $in: gender_query
    };
  }

  //price_query is not empty add to origin query
  // it will form mongo query ass follows
  //db.rooms.find({rooms:{$elemMatch:{rent:{$gt:1000,$lt:10000}}}})
  if (price_query.rooms) {
    query.rooms = price_query.rooms;
  }



  //add location info to the query
  query.geolocation = {
    $nearSphere: [longitude, latitude],
    $maxDistance: range
  }


  Room.find(query, function(error, rooms) {
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
  Room.findById(req.params.id, function(err, room) {
    if (err) {
      return handleError(res, err);
    }
    if (!room) {
      return res.send(404);
    }
    return res.json(room);
  });
};

// Creates a new room in the DB.
exports.create = function(req, res) {
  Room.create(req.body, function(err, room) {
    if (err) {
      return handleError(res, err);
    }
    return res.json(201, room);
  });
};

// Updates an existing room in the DB.
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Room.findById(req.params.id, function(err, room) {
    if (err) {
      return handleError(res, err);
    }
    if (!room) {
      return res.send(404);
    }
    var updated = _.merge(room, req.body);
    updated.save(function(err) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(200, room);
    });
  });
};

// Deletes a room from the DB.
exports.destroy = function(req, res) {
  Room.findById(req.params.id, function(err, room) {
    if (err) {
      return handleError(res, err);
    }
    if (!room) {
      return res.send(404);
    }
    room.remove(function(err) {
      if (err) {
        return handleError(res, err);
      }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
