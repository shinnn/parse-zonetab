'use strong';

const arrayDifference = require('array-difference');
const getZonetab = require('get-zonetab');
const parseZonetab = require('.');
const test = require('tape');
const universalDeepStrictEqual = require('universal-deep-strict-equal');

test('parseZonetab()', t => {
  t.plan(3);

  t.strictEqual(parseZonetab.name, 'parseZonetab', 'should have a function name.');

  getZonetab().then(parseZonetab).then(data => {
    t.strictEqual(
      Array.isArray(data),
      true,
      'should be fulfilled with an array.'
    );
  }).catch(t.fail);

  getZonetab({encoding: null}).then(parseZonetab).then(data => {
    t.strictEqual(
      data.every(row => {
        const diff = arrayDifference(Object.keys(row), [
          'countryCode',
          'coordinate',
          'id',
          'comment'
        ]);

        return universalDeepStrictEqual(diff, []) || universalDeepStrictEqual(diff, ['comment']);
      }),
      true,
      'should parse each rows of TSV.'
    );
  }).catch(t.fail);
});
