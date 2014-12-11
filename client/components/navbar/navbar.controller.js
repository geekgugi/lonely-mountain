'use strict';

angular.module('lmApp')
.controller('NavbarCtrl', function ($scope, $location, Auth, ngDialog) {
  $scope.menu = [{
    'title': 'Search',
    'link': '/'
  }];
  $scope.isCollapsed = true;
  $scope.isLoggedIn = Auth.isLoggedIn;
  $scope.isAdmin = Auth.isAdmin;
  $scope.getCurrentUser = Auth.getCurrentUser;

  $scope.openDialog = function($event) {
    var dialog = ngDialog.open({
      template: 'post.html',
      scope: $scope,
      controller: 'PostCtrl',
      $event: $event,
      className: 'ngdialog-theme-plain'
    });
  };

  $scope.logout = function() {
    Auth.logout();
    $location.path('/login');
  };

  $scope.isActive = function(route) {
    return route === $location.path();
  };
});
