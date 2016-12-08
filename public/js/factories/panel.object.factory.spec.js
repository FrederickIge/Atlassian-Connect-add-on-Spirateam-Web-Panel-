describe('object factory', function() {
  var object;
  var response = {
    "key": "spira",
    "value": {
      "spiraURL": "https://demo.spiraservice.net/bakaproof",
      "username": "tester",
      "apiKey": "{this-is-for-testingF-E79EC0880809}",
      "projectID": "2",
      "dataMappingID": "6"
    }
  }
  var jsonresponse = JSON.stringify(response)
  var issueKey = 'FEM-16';

  // Before each test load our api.users module
  beforeEach(angular.mock.module('object'));

  // Before each test set our injected Users factory (_object_) to our local Users variable
  beforeEach(inject(function(_object_) {
    object = _object_;
  }));



  // A simple test to verify the object factory exists
  it('should exist', function() {
    expect(object).toBeDefined();
  });

  describe('.objectmaker', function() {
    // A simple test to verify the objectmaker method exists
    it('should exist', function() {
      expect(object.objectmaker).toBeDefined();
    });

    // A test to verify that calling all() returns the array of users we hard-coded above
    it('should return an object', function() {
      expect(object.objectmaker(jsonresponse, issueKey)).toEqual(jasmine.any(Object));
    });
     it('should have the expected properties', function() {
       expect(object.objectmaker(jsonresponse, issueKey)).toEqual(jasmine.objectContaining({
      data: "FEM-16",
      reqUrl: "https://demo.spiraservice.net/bakaproof/Services/v5_0/RestService.svc/projects/2/requirements/",
      encoded: "dGVzdGVyOnt0aGlzLWlzLWZvci10ZXN0aW5nRi1FNzlFQzA4ODA4MDl9",
      url: 'https://demo.spiraservice.net/bakaproof/Services/v5_0/RestService.svc/data-mappings/6/artifacts/1/search'
    }));
    });
  });
});