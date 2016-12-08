describe('setter factory', function() {
  var datasetter;
  
  

  // Before each test load our api.users module
  beforeEach(angular.mock.module('datasetter'));

  // Before each test set our injected Users factory (_object_) to our local Users variable
  beforeEach(inject(function(_datasetter_) {
    datasetter = _datasetter_;
  }));



  // A simple test to verify the object factory exists
  it('should exist', function() {
    expect(datasetter).toBeDefined();
  });
  
describe('.postmaker', function() {
    // A simple test to verify the objectmaker method exists
    it('should exist', function() {
      expect(datasetter.set).toBeDefined();
    });

    
  });
  
});