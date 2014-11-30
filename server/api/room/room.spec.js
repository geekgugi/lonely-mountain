'use strict';

var should = require('should');
var app = require('../../app');
var Room = require('./room.model');
var request = require('supertest');

var room = new Room({
  ownerId: 'fake owner',
  houseId: 'fake house'
});

describe('Room Model', function() {
  before(function(done) {
    // clear all the rooms before testing
    Room.remove().exec().then(function () {
      done();
    });
  });

  afterEach(function(done){
    Room.remove().exec().then(function() {
      done();
    });
  });

  it('should begin with no sample rooms', function(done) {
    Room.find({}, function(err, rooms) {
      rooms.should.have.length(0);
      done();
    });
  });

  it('should fail when saving a duplicate room', function(done) {
    room.save(function() {
      var roomDup = new Room(room);
      roomDup.save(function(err){
        should.exist(err);
        done();
      });
    });
  });



  it('should respond with JSON array', function(done) {
    request(app)
      .get('/api/rooms')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });
});
