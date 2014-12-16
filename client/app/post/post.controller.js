'use strict';

angular.module('lmApp')
.controller('PostCtrl', Controller);

Controller.$inject = ['$scope', '$http', '$log', 'ngDialog', 'uiGmapGoogleMapApi', '$rootScope'];

function Controller ($scope, $http, $log, ngDialog, uiGmapGoogleMapApi, $rootScope) {
  $scope.place = {};

  uiGmapGoogleMapApi.then(function(maps) {
    $scope.googleVersion = maps.version;
    maps.visualRefresh = true;
  });

  angular.extend($scope, {
    map: {
      center: {
        latitude: 45,
        longitude: -73
      },
      zoom: 14,
      dragging: false,
      bounds: {},
      clickedMarker: {
        id: 0,
        options: {},
        title: 'You clicked here',
        latitude: null,
        longitude: null
      },
      events: {
        click: function (mapModel, eventName, originalEventArgs) {
          // 'this' is the directive's scope
          var e = originalEventArgs[0];
          $rootScope.latitude = e.latLng.lat();
          $rootScope.longitude = e.latLng.lng();
          // Call the ngDialog from here show address 
          // only house number should be filled in by user
          $rootScope.dialogBox = ngDialog.open({
            template: 'postDetails',
            scope: $scope
          });
          $rootScope.$apply();
        }
      }
    }
  });


  $scope.addPost = function () {

    $http.post('/api/rooms', {
      houseId: $scope.place.number,
      availability: false,
      address: $scope.place.addressLine1,
      area: $scope.place.addressLine2,
      geolocation: {
        type: "Point",
        coordinates: [$rootScope.latitude,$rootScope.longitude] 
      }
    }).success(function (data) {
      $rootScope.dialogBox.close();
      $log.log("Success");
    }).error(function () {
      $rootScope.dialogBox.close();
      $log.log("Failure");
    });
  }

  var changePlaceCB =  function (searchBox) {
    var places = searchBox.getPlaces();
    if (places.length === 0) {
      return;
    }
    //change map to selected location
    $scope.map.center.latitude = places[0].geometry.location.lat();
    $scope.map.center.longitude = places[0].geometry.location.lng();
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
};
