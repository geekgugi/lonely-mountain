'use strict';

angular.module('lmApp')
.controller('MainCtrl', function($scope, $http, uiGmapGoogleMapApi) {
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


  $scope.findPlaces = function() {
    var selectedLatitude = $scope.details.geometry.location.lat();
    var selectedLongitude = $scope.details.geometry.location.lng();
    //  TODO: Maximum distance has to be computed from the UI
    //  i) By making use of boundries
    //  ii) By making use of circle
    var maximumDistance = "12"
    // make request with the these selected values
    // to get all the places available within fixed range

  };

  var changePlaceCB =  function (searchBox) {
    var places = searchBox.getPlaces()
    if (places.length === 0) {
      return;
    }
    //change map to selected location
    $scope.map.center.latitude = places[0].geometry.location.lat();
    $scope.map.center.longitude = places[0].geometry.location.lng();
    //temp: remove all other markers and show one in the selected location
    $scope.dummyMarks = []
    $scope.dummyMarks.push({
      latitude: places[0].geometry.location.lat(),
      longitude: places[0].geometry.location.lng(),
      title: places[0].name,
      id: 'MAP_CENTER'

    });
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
  //  $scope.loadCurrentLocation();
});
