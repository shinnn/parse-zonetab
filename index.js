/*!
 * parse-zonetab | MIT (c) Shinnosuke Watanabe
 * https://github.com/shinnn/parse-zonetab
*/
'use strict';

const neatCsv = require('neat-csv');
const parseTzdataCoordinate = require('parse-tzdata-coordinate');
const toFastProperties = require('to-fast-properties');

const csvParserOptions = {
  separator: '\t',
  headers: ['countryCode', 'coordinate', 'id', 'comment']
};

function parseTsv(data) {
  return neatCsv(data, csvParserOptions);
}

function isValidZoneTabRow(row) {
  return /^[A-Z]{2}$/.test(row.countryCode);
}

function ammendRow(row) {
  row.coordinate = parseTzdataCoordinate(row.coordinate);

  if (row.comment === undefined) {
    delete row.comment;
    toFastProperties(row);
  }

  return row;
}

function parseRows(rows) {
  return rows.filter(isValidZoneTabRow).map(ammendRow);
}

module.exports = function parseZonetab(contents) {
  return parseTsv(contents).then(parseRows);
};
