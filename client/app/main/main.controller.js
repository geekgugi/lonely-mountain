'use strict';

angular.module('lmApp')
  .controller('MainCtrl', function($scope, $http, uiGmapGoogleMapApi, $log) {

    var init = (function() {
      //Initialise marker for map
      $scope.markers = [];
      //Initialise bonds for map  
      $scope.bounds = {};
      //Initialiase initial cordinates for map
      $scope.map = {
        show: true,
        control: {},
        center: {
          latitude: 12.95,
          longitude: 77.777
        },
        zoom: 14,
        bounds: {}
      };
      //set map options
      $scope.options = {
        scrollwheel: true
      };

    })();

    var loadCurrentLocation = function() {
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
        },
        zoom: 14,
        bounds: {},
        control: {}
      };
      $scope.options = {
        scrollwheel: true
      }
    };

    $scope.findMaxDistance = function() {
      // radius of earth in kms
      var earthRadius = 6373;
      var neLat = $scope.map.bounds.northeast.latitude;
      var neLng = $scope.map.bounds.northeast.longitude;
      var swLat = $scope.map.bounds.southwest.latitude;
      var swLng = $scope.map.bounds.southwest.longitude;
      var dLng = neLng - swLng;
      var dLat = neLat - swLat;
      var a = Math.pow(Math.sin(dLat / 2), 2) + (Math.cos(neLat) * Math.cos(swLat) * Math.pow(Math.sin(dLng / 2), 2));
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
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
      var data = {
        latitude: selectedLatitude,
        longitude: selectedLongitude,
        maxDistance: $scope.findMaxDistance(),
        filter: $scope.filter
      }
      var url = '/api/rooms/'
        // have a promise from $http
      var promise = $http.post(url, data);
      promise.then(function(response) {
          $scope.markers = response.data;
          //Move map to the place
          $scope.map.center = {
            latitude: selectedLatitude,
            longitude: selectedLongitude
          };
        },

        function(error) {
          $log.error("places api returned error");
        });
    };

    var changePlaceCB = function(searchBox) {
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

    $scope.filter = {
      gender: {
        male: true,
        female: true
      },
      price: {
        to: 10000,
        from: 1000
      },
      apply: function() {
        $scope.findPlaces();
      },
      reset: function() {
        $scope.filter.gender.male = true;
        $scope.filter.gender.female = true;
        $scope.filter.price = {
          to: 10000,
          from: 1000
        }
      }
    };
  });
