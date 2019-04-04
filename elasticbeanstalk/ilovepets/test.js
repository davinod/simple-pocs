const request = require('request');
var expect = require('chai').expect

describe("Ilovepets UnitTests", function() {

  describe("Home Page", function() {
    var url = "http://localhost:3000/";

    it("returns status 200", function() {
      request(url, function(error, response, body) {
        expect(response.statusCode).to.equal(200);
      });
    });

  });

  describe("Dogs Page", function() {
    var url = "http://localhost:3000/dogs";

    it("returns status 200", function() {
      request(url, function(error, response, body) {
        expect(response.statusCode).to.equal(200);
      });
    });

  });


  describe("Cats Page", function() {
    var url = "http://localhost:3000/cats";

    it("returns status 200", function() {
      request(url, function(error, response, body) {
        expect(response.statusCode).to.equal(200);
      });
    });

  });


});