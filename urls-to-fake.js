/**
 * list of URL to harvest
 * in order to build a fake API
 */

var _ = require('lodash');

var urls = [];
var urlTmp = {};

// /corpus/
urlTmp = {
  pathname: '/corpus/',
  query: { }
};
urls.push(_.clone(urlTmp, true));
urlTmp.query.callback = '_jqjsp';
urls.push(_.clone(urlTmp, true));

// /document/?q=*
urlTmp = {
  pathname: '/document/',
  query: { q: '*' }
};
urls.push(_.clone(urlTmp, true));
urlTmp.query.callback = '_jqjsp';
urls.push(_.clone(urlTmp, true));

// /document/?q=*&output=*
urlTmp = {
  pathname: '/document/',
  query: { q: '*', output: '*' }
};
urls.push(_.clone(urlTmp, true));
urlTmp.query.callback = '_jqjsp';
urls.push(_.clone(urlTmp, true));

// /document/?q=brain&output=*&size=10&from=0&stats=1
urlTmp = {
  pathname: '/document/',
  query: { q: 'brain', output: '*', size: '10', from: '0', stats: '1' }
};
urls.push(_.clone(urlTmp, true));
urlTmp.query.callback = '_jqjsp';
urls.push(_.clone(urlTmp, true));

// /document/?q=brain&output=*&size=10&from=0&stats=1
urlTmp = {
  pathname: '/document/',
  query: { q: 'brain', output: '*', size: '10', from: '0', stats: '1' }
};
urls.push(_.clone(urlTmp, true));
urlTmp.query.callback = '_jqjsp';
urls.push(_.clone(urlTmp, true));

// /document/?q=brain&output=*&size=10&from=10&stats=1
urlTmp = {
  pathname: '/document/',
  query: { q: 'brain', output: '*', size: '10', from: '10', stats: '1' }
};
urls.push(_.clone(urlTmp, true));
urlTmp.query.callback = '_jqjsp';
urls.push(_.clone(urlTmp, true));


module.exports = urls;