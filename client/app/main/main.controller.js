'use strict';

angular.module('lmApp')
.controller('MainCtrl', function ($scope, $http, socket, uiGmapGoogleMapApi) {
  $scope.map = {
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
    uiGmapGoogleMapApi.then(function() {
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
  $scope.dummyMarks = [];  
  var mark1 = {
    latitude: 12.95,
    longitude: 77.77,
    title: 'm' + 1
  }
  mark1['id'] = 1;
  $scope.dummyMarks.push(mark1);
  $scope.search = function() {
    $scope.map.coords = {};
    $scope.map.coords.latitude = $scope.details.geometry.location.lat();
    $scope.map.coords.longitude = $scope.details.geometry.location.lng();
    $scope.map.zoom = 14;
  };
//  $scope.loadCurrentLocation();
});
