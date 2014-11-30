/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');
var Room = require('../api/room/room.model');

Thing.find({}).remove(function() {
  Thing.create({
    name : 'Development Tools',
    info : 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
  }, {
    name : 'Server and Client integration',
    info : 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
  }, {
    name : 'Smart Build System',
    info : 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
  },  {
    name : 'Modular Structure',
    info : 'Best practice client and server structures allow for more code reusability and maximum scalability'
  },  {
    name : 'Optimized Build',
    info : 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
  },{
    name : 'Deployment Ready',
    info : 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
  },{
    name : 'Deployment Done',
    info : 'Deployment is done after travis build'
  });
});

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
    console.log('finished populating users');
  });
});

/* Creating dummy rooms for testing purpose.
 * This content has to be replaced with the
 * real content in production
 */
Room.find({}).remove(function() {
  Room.create({
    ownerId: 'Shreyansh',
    houseId: "C17",
    area: "Ejipura",
    geolocation:{ type: "Point", coordinates: [ 12.946985, 77.625459]},
    address: '24th Main 1st cross',
    availability: 'true',
    startingDate: '12-sep-2014',
    type: "apartment",
    preferences: {
      smoking: "yes",
      drinking: "no",
      pets: "no",
      sex: "male",
      nonVeg: "no",
      party: "yes"
    },
    internet: "yes",
    parkingSpace: "no",
    rooms: [{
      rent: 9000,
      floorArea: "800ftsq",
      deposit: 50000,
      airConditioned: "no",
      bathRoom: "yes",
      hotwater: "no",
      tv: "no"
    }],
    sharedSpace: [
      "hall",
      "kitchen",
      "bathroom"
    ]
  }, {
    ownerId: "guru",
    houseId: "D34",
    area: "btm",
    geolocation:{ type: "Point", coordinates: [12.914568, 77.610573]},
    address: "axa building",
    availability: "true",
    startingDate: "12-oct-2014",
    type: "duplex",
    preferences: {
      smoking: "no",
      drinking: "no",
      pets: "no",
      sex: "male",
      nonVeg: "no",
      party: "no"
    },
    internet: "yes",
    parkingSpace: "yes",
    rooms: [{
      rent: 8000,
      floorArea: "1000sqft",
      deposit: "50000",
      airConditioned: "no",
      bathRoom: "yes",
      hotwater: "no",
      tv: "no"
    }],
    sharedSpace: [
      "hall",
      "kitchen",
    ]
  },{
    ownerId: "anshul",
    houseId: "B12",
    area: "Diamond Disrict",
    geolocation:{ type: "Point", coordinates: [12.959950, 77.644042]},
    address: "Domlur Flyover",
    availability: "true",
    startingDate: "29-oct-2014",
    type: "flat",
    preferences: {
      smoking: "no",
      drinking: "no",
      pets: "no",
      sex: "male",
      nonVeg: "no",
      party: "no"
    },
    internet: "yes",
    parkingSpace: "yes",
    rooms: [
      {
      rent: 45000,
      floorArea: "2500sqft",
      deposit: 200000,
      airConditioned: "yes",
      bathRoom: "yes",
      hotwater: "yes",
      tv: "no"
    }
    ],
    sharedSpace: [
      "hall",
      "kitchen"
    ]},{
      ownerId: "divya",
      houseId: "C19",
      area: "btm layout",
      geolocation:{ type: "Point", coordinates: [ 12.914568, 77.610573]},
      address: "near Axa Building",
      availability: true,
      startingDate: "20-dec-2014",
      type: "single room",
      preferences: {
        smoking: "no",
        drinking: "no",
        pets: "no",
        sex: "female",
        nonVeg: "no",
        party: "no"
      },
      internet: "yes",
      parkingSpace: "no",
      rooms: [
        {
        rent: 5000,
        floorArea: "300sqft",
        deposit: 60000,
        airConditioned: "no",
        bathRoom: "yes",
        hotwater: "yes",
        tv: "no"
      }
      ],
      sharedSpace: [
        "room",
        "bathroom"
      ]},{
        ownerId: "vikaas",
        houseId: "C1/19",
        area: "murgesh pallaya",
        geolocation:{ type: "Point", coordinates: [ 12.957825, 77.655583]},
        address: "old airport road",
        availability: true,
        startingDate: "22-dec-2014",
        type: "single room",
        preferences: {
          smoking: "no",
          drinking: "no",
          pets: "no",
          sex: "male",
          nonVeg: "no",
          party: "no"
        },
        internet: "yes",
        parkingSpace: "no",
        rooms: [{
          rent: 5000,
          floorArea: "300sqft",
          deposit: 6000,
          airConditioned: "no",
          bathRoom: "yes",
          hotwater: "yes",
          tv: "no"
        }],
        sharedSpace: [
          "room",
          "bathroom"
        ]
      }, function () {
        console.log("finished populating sample rooms");
      });
});
