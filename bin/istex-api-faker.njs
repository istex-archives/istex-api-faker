#!/usr/bin/env node

var app = require('../app.js');

var server = app.listen(process.env.PORT || 35000, function () {

  var port = server.address().port

  console.log('Istex API faker listening at http://127.0.0.1:%s', port)
});