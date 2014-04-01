'use strict';

var findParentDir = require('find-parent-dir')
  , path = require('path')

var go = module.exports = 

/**
 * Searches upwards from start for package.json files, asking for each if it is the mothership.
 * If a mothership is found it calls back with that.
 * If it reaches the top of the univers it calls back with nothing.
 *
 * ##### mothership result
 *  - `path`: full path to the `package.json` that is the mother ship
 *  - `pack`: the `package.json` object, same that was passed to ismothership
 * 
 * @name mothership
 * @function
 * @param {string} start full path at which to start looking for the mothership
 * @param {function} ismothership invoked with the package object, needs to return true if it is the mothership
 * @param {function} cb called back with either an error or full path to package.json that is the mothership
 */
function mothership(start, ismothership, cb) {
  (function findShip (root) {
    findParentDir(root, 'package.json', function (err, packageDir) {
      if (err) return cb(err);
      if (!packageDir) return cb();

      var pack;
      try {
        pack = require(path.join(packageDir, 'package.json'));
        if (ismothership(pack)) return cb(null, { path: path.join(packageDir, 'package.json'), pack: pack });
        findShip(path.resolve(root, '..'));
      } catch (e) {
        cb(e);
      }
    });

  })(start);
}

/**
 * Synchronous version of mothership.
 * 
 * @name mothership::sync
 * @function
 * @param {string} start full path at which to start looking for the mothership
 * @param {function} ismothership invoked with the package object, needs to return true if it is the mothership
 * @return {string} full path to package.json that is the mothership or `null` if it wasn't found
 */
go.sync = function sync(start, ismothership) {
  return (function findShip (root) {
    var packageDir = findParentDir.sync(root, 'package.json')

      var pack;
      try {
        pack = require(path.join(packageDir, 'package.json'));
        if (ismothership(pack)) return { path: path.join(packageDir, 'package.json'), pack: pack };
        return findShip(path.resolve(root, '..'));
      } catch (e) {
        return false
      }

  })(start);
}
