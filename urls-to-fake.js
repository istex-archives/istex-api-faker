/**
 * list of URL to harvest
 * in order to build a fake API
 */

var urls = [];

urls.push({
  pathname: '/corpus/',
  query: { }
});

urls.push({
  pathname: '/corpus/',
  query: { callback: '_jqjsp' }
});

urls.push({
  pathname: '/document/',
  query: { q: '*' }
});

urls.push({
  pathname: '/document/',
  query: { q: '*', output: '*' }
});

urls.push({
  pathname: '/document/',
  query: { q: 'brain', output: '*', size: '10', from: '0', stats: '1' }
});

urls.push({
  pathname: '/document/',
  query: { callback: '_jqjsp', q: 'brain', output: '*', size: '10', from: '0', stats: '1' }
});


urls.push({
  pathname: '/document/',
  query: { q: 'brain', output: '*', size: '10', from: '10', stats: '1' }
});

module.exports = urls;