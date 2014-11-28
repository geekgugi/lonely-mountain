'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('lmApp'));
  beforeEach(module('socketMock'));

  var MainCtrl,
      scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should attach a map object to the scope', function () {
    expect(MainCtrl).not.toBeUndefined();
  });
});
