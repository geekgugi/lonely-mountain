'use strict';

angular.module('lmApp')
.controller('MainCtrl', function ($scope, $http, uiGmapGoogleMapApi) {
  // map variable will help to load map
  $scope.marks = []; 
  $scope.map = {
    control: {},
    center: {
      latitude: 12.95,
      longitude: 77.777
    },
    zoom: 14
  };
  $scope.options = {
    scrollwheel: false
  };

  $scope.loadCurrentLocation = function() {
    uiGmapGoogleMapApi.then(function(map) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(changeMap);
      }
    });
  };

  var changeMap = function(maps) {
    $scope.map = { 
      center: { 
        latitude: maps.coords.latitude,
        longitude: maps.coords.longitude
      },
      zoom: 14
    };
  };
  // Can be removed
  $scope.dummyMarks = [];  
  var mark1 = {
    latitude: 12.95,
    longitude: 77.77,
    title: 'm' + 1
  }
  mark1['id'] = 1;
  $scope.dummyMarks.push(mark1);
  // removed from here
  
  $scope.search = function() {
    $scope.map.coords = {};
    $scope.map.coords.latitude = $scope.details.geometry.location.lat();
    $scope.map.coords.longitude = $scope.details.geometry.location.lng();
    $scope.map.zoom = 14;
  };

  $scope.findPlaces = function () {
    var selectedLatitude =  $scope.details.geometry.location.lat();
    var selectedLongitude = $scope.details.geometry.location.lng();
    //  TODO: Maximum distance has to be computed from the UI
    //  i) By making use of boundries
    //  ii) By making use of circle
    var maximumDistance = "12"
    // make request with the these selected values
    // to get all the places available within fixed range

  };
//  $scope.loadCurrentLocation();
});
