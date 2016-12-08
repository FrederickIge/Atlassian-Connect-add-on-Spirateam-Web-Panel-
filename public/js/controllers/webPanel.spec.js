describe('WebPanelController', function() {
  var $controller, WebPanelController;

  // Load ui.router and our components.users module which we'll create next
  beforeEach(angular.mock.module('WebPanelController'));
  

  // Inject the $controller service to create instances of the controller (UsersController) we want to test
  beforeEach(inject(function(_$controller_) {
    var $scope = {};
    var object = {};
    var poster= {};
    var datasetter = {};
    $controller = _$controller_;
    WebPanelController = $controller('WebPanelController', {
    $scope:$scope,
    object:object,
    poster:poster,  
    datasetter,datasetter
    
    });
  }));

  // Verify our controller exists
  it('should be defined', function() {
    expect(WebPanelController).toBeDefined();
  });
});