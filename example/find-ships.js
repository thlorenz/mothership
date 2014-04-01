'use strict';

var mothership = require('../')
  , path = require('path');

mothership(
    path.join(__dirname, 'uno', 'dos', 'tres')
  , function ismothership (pack) {
      return !!(pack.dependencies && pack.dependencies.unodep);
    }
  , function (err, res) {
      if (err) return console.error(err);
      console.log('first mothership', res.path);  // => [..]/example/uno/package.json
  }
)

mothership(
    path.join(__dirname, 'uno', 'dos', 'tres')
  , function ismothership (pack) {
      return pack.name === 'dos';
    }
  , function (err, res) {
      if (err) return console.error(err);
      console.log('second mothership', res.path);  // => [..]/example/uno/dos/package.json
  }
)
