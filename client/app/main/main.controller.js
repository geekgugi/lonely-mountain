'use strict';

angular.module('lmApp')
.controller('MainCtrl', function($scope, $http, uiGmapGoogleMapApi, $log) {
  // map variable will help to load map
  $scope.markers = [];
  $scope.bounds;
  $scope.map = {
    show: true,
    control: {},
    center: {
      latitude: 12.95,
      longitude: 77.777
    },
    zoom: 14
  };
  $scope.options = {
    scrollwheel: true
  };

  $scope.loadCurrentLocation = function() {
    uiGmapGoogleMapApi.then(function(maps) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(changeMap);
      }
    });
  };

  var changeMap = function(position) {
    $scope.map = {
      center: {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }
    };
  };

  $scope.findMaxDistance = function () {
    // radius of earth in kms
    var earthRadius = 6373;
    var neLat = $scope.bounds.northeast.latitude;
    var neLng = $scope.bounds.northeast.longitude;
    var swLat = $scope.bounds.southwest.latitude;
    var swLng = $scope.bounds.southwest.longitude;
    var dLng = neLng - swLng;
    var dLat = neLat - swLat;
    var a = Math.pow(Math.sin(dLat/2), 2) + (Math.cos(neLat) * Math.cos(swLat) * Math.pow(Math.sin(dLng/2), 2));
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var distance = earthRadius * c;
    // If distance is 12 km from center point we will have half distance
    return distance / 2;
  }

  $scope.findPlaces = function() {
    var selectedLatitude = $scope.map.center.latitude;
    var selectedLongitude = $scope.map.center.longitude;
    // TODO: Draw circle and use diameter as maximumDistance.
    // At present bounds are used to find maximum distance
    // Formula is taken from andrews website 
    // Please refer for more information
    // @http://andrew.hedges.name/experiments/haversine/
    var url = '/api/rooms/' + selectedLongitude + ',' + 
      selectedLatitude + ',' + $scope.findMaxDistance(); 
    // have a promise from $http
    var promise = $http.get(url);
    promise.then(function (response) {
      $scope.markers = response.data;
    }, function(error) {
      $log.error("places api returned error");
    });
  };

  var changePlaceCB =  function (searchBox) {
    var places = searchBox.getPlaces();
    if (places.length === 0) {
      return;
    }
    //change map to selected location
    $scope.map.center.latitude = places[0].geometry.location.lat();
    $scope.map.center.longitude = places[0].geometry.location.lng();
    $scope.findPlaces();
  }

  $scope.searchbox = {
    //template to load for the search box !mandatory field
    template: 'app/search/search.html',
    //position of search bar
    position: 'top-right',
    // Only one event associated with search box
    // See @https://developers.google.com/maps/documentation/javascript/reference#SearchBoxOptions
    events: {
      // format event: callback
      places_changed: changePlaceCB
    }
  };
  // Initially show a location where user sessioned from
  $scope.loadCurrentLocation();
});
