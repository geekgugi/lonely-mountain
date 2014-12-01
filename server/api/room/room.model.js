'use strict';

var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var RoomSchema = new Schema({
  ownerId: String,
  houseId: String,
  area: String,
  geolocation: {
    type: { type: String },
    coordinates: []
  },
  address: String,
  availability: Boolean,
  startingDate: Date,
  type: String,
  preferences: {
    smoking: String,
    drinking: String,
    pets: String,
    sex: String,
    nonVeg: String,
    party: String
  },
  internet: String,
  parkingSpace: String,
  rooms: [
    {
    rent: Number,
    floorArea: String,
    deposit: Number,
    airConditioned: String,
    bathRoom: String,
    hotwater: String,
    tv: String
  }
  ],
  sharedSpace: [
    String,
    String,
    String
  ],
  active: Boolean
});

// define index
RoomSchema.index({ geolocation: '2dsphere'});

module.exports = mongoose.model('Room', RoomSchema);

