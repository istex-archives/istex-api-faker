var assert  = require('chai').assert;
var app     = require('../app.js');
var request = require('superagent');

describe('Istex API faker', function () {
  before(function (done) {
    this.server = app.listen(35001, done);
  });

  it('should return a html home page', function (done) {
    request
      .get('http://127.0.0.1:35001/')
      .end(function (res) {
        assert.equal(res.statusCode, 200);
        assert.include(res.text, '<html>');
        done();
      });
  });
  
  it('should return a JSON when /document/?q=* is requested', function (done) {
    request
      .get('http://127.0.0.1:35001/document/?q=*')
      .end(function (res) {
        assert.equal(res.statusCode, 200);
        assert.isObject(res.body);
        assert.property(res.body, 'hits');
        assert.property(res.body, 'total');
        done();
      });
  });
  
  it('should return 404 when the requested URL is not in data/', function (done) {
    request
      .get('http://127.0.0.1:35001/wrongpath/?q=*')
      .end(function (res) {
        assert.equal(res.statusCode, 404);
        done();
      });
  });

  it('should ignore _1424268118509 querystring parameters comming from jquery-jsonp', function (done) {
    request
      .get('http://127.0.0.1:35001/document/?q=*&_1424268118509=')
      .end(function (res) {
        assert.equal(res.statusCode, 200);
        done();
      });
  });

  after(function () {
    this.server.close();
  });
});