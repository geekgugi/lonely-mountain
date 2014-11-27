'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('GET /api/curious', function() {

  it('should respond with JSON array', function(done) {
    request(app)
      .get('/api/curious')
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
});
