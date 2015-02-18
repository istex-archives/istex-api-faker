/**
 * Istex API faker web server
 * (used by unit tests: gulp test)
 *
 * to use it, data folder has to be initialized
 * data/data-generator.njs script has to be called
 * to initialize the data folder
 *
 * then the web server listen on http://127.0.0.1:3000/
 * and can be used instead of the Istex API.
 * Ex: http://127.0.0.1:3000/document/?q=*
 */

// list of URL to fake
var urls    = require('./urls-to-fake.js');

var express = require('express');
var app     = express();
var _       = require('lodash');
var fs      = require('fs');
var url     = require('url');
var cors    = require('cors');

// to allow cross domain (ajax)
app.use(cors());

// Home page to explain the fake api and 
// give a quick access to each fake url
app.get('/', function (req, res) {
  var urlsToHtml = '';
  urls.forEach(function (item) {
    delete item.protocol;
    delete item.hostname;
    urlsToHtml += '<li><a href="' + url.format(item) + '">' + url.format(item) + '</a></li>';
  });

  var msg =
  '<html>' +
  '<body>' +
    '<h1>Racine de l\'API ISTEX pour les développements</h1>' +
    '<p>Cette API propose un extrait de fausses données mais en respectant les JSON et la structure des URLs de l\'API Istex de production. Elle permet de réaliser des tests indépendants de l\'API Istex de production lors des développements des widgets (entre autre).</p>' +
    '<p>Voici la liste des URLs interrogeables :' +
    '<ul>' +
      urlsToHtml + 
    '</ul>' +
    '</p>' +
  '</body>' +
  '</html>';

  res.send(msg);
});

// Catch every GET HTTP request
// and thy to find if a fake url in the list 
// match the current request.
// if it doesn't match, just return 404
app.get('*', function (req, res) {

  // cleanup querystring like _1424268118509
  // used by jquery-jsonp to disable the cache
  Object.keys(req.query).forEach(function (k) {
    if (/^_[0-9]+/.test(k)) {
      delete req.query[k];
    }
  });

  var urlFound = false;
  urls.forEach(function (item) {
    if (item.pathname == req.path &&
        _.isEqual(item.query, req.query)) {
      // build the filepath and check if available
      var filepath = __dirname + '/data/' + item.filename;
      if (!fs.existsSync(filepath)) return;
      // return the file content as JSON data
      urlFound = true;
      res.sendFile(filepath, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
  });

  // if nothing is found, return 404
  if (!urlFound) {
    res.sendStatus(404);
  }

});

module.exports = app;
