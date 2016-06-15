# parse-zonetab

[![NPM version](https://img.shields.io/npm/v/parse-zonetab.svg)](https://www.npmjs.com/package/parse-zonetab)
[![Build Status](https://travis-ci.org/shinnn/parse-zonetab.svg?branch=master)](https://travis-ci.org/shinnn/parse-zonetab)
[![Coverage Status](https://img.shields.io/coveralls/shinnn/parse-zonetab.svg)](https://coveralls.io/github/shinnn/is-gist-starred?branch=master)
[![Dependency Status](https://david-dm.org/shinnn/parse-zonetab.svg)](https://david-dm.org/shinnn/parse-zonetab)
[![devDependency Status](https://david-dm.org/shinnn/parse-zonetab/dev-status.svg)](https://david-dm.org/shinnn/parse-zonetab#info=devDependencies)

A [Node](https://nodejs.org/) module to parse [zone.tab](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) file

```javascript
const parseZonetab = require('parse-zonetab');

const source = `
#
# tz zone descriptions
#
AD	+4230+00131	Europe/Andorra
AE	+2518+05518	Asia/Dubai
AF	+3431+06912	Asia/Kabul
AG	+1703-06148	America/Antigua
AI	+1812-06304	America/Anguilla`;

parseZonetab(source).then(rows => {
  rows; /* => [
    {
      countryCode: 'AD',
      coordinate: {
        latitude: {sign: '+', degree: 42, minute: 30},
        longitude: {sign: '+', degree: 1, minute: 31}
      },
      id: 'Europe/Andorra'
    },
    {
      countryCode: 'AE',
      coordinate: {
        latitude: {sign: '+', degree: 25, minute: 18},
        longitude: {sign: '+', degree: 55, minute: 18}
      }
      id: 'Asia/Dubai'
    },
    ...
  ] */
});
```

## Installation

[Use npm.](https://docs.npmjs.com/cli/install)

```
npm install parse-zonetab
```

## API

```javascript
const parseZonetab = require('parse-zonetab');
```

### parseZonetab(*source*)

*source*: [`Buffer`](https://nodejs.org/api/buffer.html#buffer_class_buffer), [`String`](http://www.ecma-international.org/ecma-262/5.1/#sec-4.3.17) or [`Stream`](https://nodejs.org/api/stream.html#stream_stream)  
Return: [`Promise`](http://www.ecma-international.org/ecma-262/6.0/#sec-promise-constructor)

It takes [`zone.tab`](https://www.iana.org/time-zones) file data and returns a promise for an array of parsed rows each of whom is in the form:

```
{
  countryCode: <string>,
  coordinate: {
    latitude: {
      sign: <string> ('+' or '-'),
      degree: <int>,
      minute: <int>,
      [second: <int>] (if available)
    },
    longitude: {
      sign: <string> ('+' or '-'),
      degree: <int>,
      minute: <int>,
      [second: <int>] (if available)
    }
  },
  id: <string>,
  [comment: <string>] (if available)
}
```

## Related project

* [get-zonetab](https://github.com/shinnn/get-zonetab) - get the latest `zone.tab` file form IANA Time Zone Database

## License

Copyright (c) 2016 [Shinnosuke Watanabe](https://github.com/shinnn)

Licensed under [the MIT License](./LICENSE).
