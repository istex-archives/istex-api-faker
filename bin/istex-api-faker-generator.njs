#!/usr/bin/env node

/**
 * Script used to harvest few ISTEX API documents
 * in order to be able to simulate a fake API locally
 */

'use strict';

// list of URL to harvest
var urls    = require('../urls-to-fake.js');

// load libraries dependencies
var request = require('superagent');
var async   = require('async');
var fs      = require('fs');
var faker   = require('faker');
var url     = require('url');
var nconf   = require('nconf');
nconf.argv().env()
  .file('local', __dirname + '/../config.local.json')
  .defaults({
    username: 'chuck.norris@inist.fr',
    password: 'xxx'
  });
var config = nconf.get();

// do not parse JSON
delete request.parse['application/json'];

// download every ressources
async.each(urls, function (reqData, cb) {
  reqData.url = url.format(reqData);
  // execute the HTTP GET request
  request
    .get(reqData.url)
    .auth(config.username, config.password)
    .end(function (err, res) {
      if (res.statusCode != 200) {
        console.error('Cannot access to https://api.istex.fr [' + res.statusCode + ']');
        if (res.statusCode == 403) {
          console.error('see https://github.com/istex/istex-api-faker#mettre-%C3%A0-jour-les-donn%C3%A9es');
        }
        process.exit(1);
      }
      try {
        res.body = JSON.parse(res.text);
        res.body = fakeIstexApiJSON(res.body);
        fs.writeFile(__dirname + '/../data/' + reqData.filename, JSON.stringyfy(res.body, null, '  '), cb);
      } catch (err) {
        fs.writeFile(__dirname + '/../data/' + reqData.filename, res.text, cb);
      }
      console.log('Downloaded ' + reqData.url)
    });
}, function (err) {
  if (err) console.error(err);
  console.log('Downloading completed.')
});

/**
 * Replace real data by faked one
 */
function fakeIstexApiJSON(body) {
  if (!body.hits) return body;
  body.hits.map(function (doc) {
    // doc.title
    if (doc.title) {
      doc.title = faker.lorem.sentence();
    }
    // doc.doi
    if (doc.doi) {
      doc.doi = '10.1016/0022-328X(85)80287-4';
    }
    // doc.pii
    if (doc.pii) {
      doc.pii.map(function (pii) {
        return '0022-328X(94)87114-0';
      });
    }
    // doc.serie
    if (doc.serie) {
      // doc.host.genre
      if (doc.serie.genre) {
        doc.serie.genre.map(function (g) {
          if (g.value) {
            g.value = faker.lorem.words().join(' ');
          }
          return g;
        });
      }
      // doc.serie.title
      if (doc.serie.title) {
        doc.serie.title = faker.lorem.sentence();
      }
    }
    // doc.abstract
    if (doc.abstract) {
      doc.abstract = faker.lorem.paragraph();
    }
    // doc.genre
    if (doc.genre) {
      doc.genre.map(function (g) {
        if (g.value) {
          g.value = faker.lorem.words().join(' ');
        }
        return g;
      });
    }
    // doc.subject
    if (doc.subject) {
      doc.subject.map(function (s) {
        if (s.value) {
          s.value = faker.lorem.words().join(' ');
        }
        return s;
      });
    }
    // doc.author
    if (doc.author) {
      doc.author.map(function (a) {
        if (a.name) {
          a.name = faker.name.firstName() + ' ' + faker.name.lastName();
        }
        // doc.author.affiliations
        if (a.affiliations) {
          a.affiliations.map(function (aff) {
            aff = faker.company.companyName();
            aff += ', ' + faker.address.usState();
            return aff;
          });
        }
        return a;
      });
    }
    // doc.host
    if (doc.host) {
      // doc.host.genre
      if (doc.host.genre) {
        doc.host.genre.map(function (g) {
          if (g.value) {
            g.value = faker.lorem.words().join(' ');
          }
          return g;
        });
      }
      // doc.host.pii
      if (doc.host.pii) {
        doc.host.pii.map(function (pii) {
          return 'S0022-328X(00)X0782-6';
        });
      }
      // doc.host.issn
      if (doc.host.issn) {
        doc.host.issn.map(function (issn) {
          return '0022-328X';
        });
      }
      // doc.host.title
      if (doc.host.title) {
        doc.host.title = faker.lorem.sentence();
      }
    }
    return doc;
  });

  return body;
}