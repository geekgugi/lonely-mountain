'use strict';

angular.module('lmApp')
.controller('MainCtrl', function ($scope, $http, socket, uiGmapGoogleMapApi) {


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

  $scope.search = function() {
    var map = {};
    map.coords = {};
    map.coords.latitude = $scope.details.geometry.location.lat();
    map.coords.longitude = $scope.details.geometry.location.lng();
    map.zoom = 14;
    changeMap(map);
  };
  $scope.loadCurrentLocation();
});
