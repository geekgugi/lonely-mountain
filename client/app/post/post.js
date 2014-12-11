'use strict';

angular.module('lmApp')
.config(function ($routeProvider) {
  $routeProvider
  .when('/post', {
    templateUrl: 'app/post/post.html',
    controller: 'PostCtrl'
  });
});
