describe('poster factory', function() {
  var poster;
  
  

  // Before each test load our api.users module
  beforeEach(angular.mock.module('poster'));

  // Before each test set our injected Users factory (_object_) to our local Users variable
  beforeEach(inject(function(_poster_) {
    poster = _poster_;
  }));



  // A simple test to verify the object factory exists
  it('should exist', function() {
    expect(poster).toBeDefined();
  });
  
describe('.postmaker', function() {
    // A simple test to verify the objectmaker method exists
    it('should exist', function() {
      expect(poster.postmaker).toBeDefined();
    });

    
  });
  
});