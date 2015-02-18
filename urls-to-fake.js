/**
 * list of URL to harvest
 * in order to build a fake API
 */

var urls = [];

urls.push({
  filename: 'corpus.json',

  protocol: 'https',
  hostname: 'api.istex.fr',
  pathname: '/corpus/',
  query: { }
});

urls.push({
  filename: 'document_q_eq_star.json',

  protocol: 'https',
  hostname: 'api.istex.fr',
  pathname: '/document/',
  query: { q: '*' }
});

urls.push({
  filename: 'document_q_eq_star_and_output_eq_star.json',

  protocol: 'https',
  hostname: 'api.istex.fr',
  pathname: '/document/',
  query: { q: '*', output: '*' }
});

urls.push({
  filename: 'document_q_eq_star_and_output_eq_star_and_size_eq_10_and_from_eq_0_and_stats_eq_1.json',

  protocol: 'https',
  hostname: 'api.istex.fr',
  pathname: '/document/',
  query: { q: 'brain', output: '*', size: '10', from: '0', stats: '1' }
});

urls.push({
  filename: 'document_q_eq_star_and_output_eq_star_and_size_eq_10_and_from_eq_10_and_stats_eq_1.json',

  protocol: 'https',
  hostname: 'api.istex.fr',
  pathname: '/document/',
  query: { q: 'brain', output: '*', size: '10', from: '10', stats: '1' }
});

module.exports = urls;