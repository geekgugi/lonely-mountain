'use strict';

angular.module('lmApp')
.controller('SettingsCtrl', function ($scope, User, Auth, $window) {
  $scope.errors = {};
  $scope.tabs = [
    { title:'Profile1', content:'Lets generate dynamic content' },
    { title:'Profile2', content:'Disabled content', disabled: true }
  ];

  $scope.alertMe = function() {
    setTimeout(function() {
      $window.alert('You\'ve selected the alert tab!');
    });
  };

  $scope.changePassword = function(form) {
    $scope.submitted = true;
    if(form.$valid) {
      // Change this code suitably
      // Auth.updateProfile();
      Auth.changePassword( $scope.user.oldPassword, $scope.user.newPassword )
      .then( function() {
        $scope.message = 'Profile updated successfully.';
      })
      .catch( function() {
        form.password.$setValidity('mongoose', false);
        $scope.errors.other = 'Incorrect password';
        $scope.message = '';
      });
    }
  };
});
