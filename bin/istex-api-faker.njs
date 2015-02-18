#!/usr/bin/env node

var app = require('../app.js');

var server = app.listen(process.env.PORT || 35000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Istex API faker listening at http://%s:%s', host, port)
});