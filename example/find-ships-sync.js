'use strict';

var mothership = require('../')
  , path = require('path');

var res = mothership.sync(
    path.join(__dirname, 'uno', 'dos', 'tres')
  , function ismothership (pack) {
      return !!(pack.dependencies && pack.dependencies.unodep);
    }
)      

console.log('found mothership', res.path);  // => [..]/example/uno/package.json
