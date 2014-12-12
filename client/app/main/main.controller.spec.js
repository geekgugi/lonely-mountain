'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('lmApp'));
  beforeEach(module('nouislider'));
  beforeEach(module('socketMock'));

  var MainCtrl,
      scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ( $controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope

    });
    scope.$digest();
  }));

  it('should a filter object to the scope', function () {
    expect(scope.filter).toBeDefined();
  });
});
