'use strict';

angular.module('lmApp')
.controller('MainCtrl', function($scope, $http, uiGmapGoogleMapApi, $log) {
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
    scrollwheel: true
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

  $scope.findPlaces = function() {
    var selectedLatitude = $scope.map.center.latitude;
    var selectedLongitude = $scope.map.center.longitude;
    //  TODO: Maximum distance has to be computed from the UI
    //  i) By making use of boundries
    //  ii) By making use of circle
    var maximumDistance = "100";
    var url = '/api/rooms/' + selectedLongitude + ',' + 
      selectedLatitude + ',' + maximumDistance; 
    // have a promise from $http
    var promise = $http.get(url);
    promise.then(function (response) {
      $scope.marks = response.data;
    }, function(error) {
      $log.error("places api returned error");
    });
  };

  var changePlaceCB =  function (searchBox) {
    var places = searchBox.getPlaces()
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
  // Initially show a location where user sessioned
  // from
  $scope.loadCurrentLocation();
});
