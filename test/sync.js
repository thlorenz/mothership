'use strict';

var test = require('tap').test

var findShip = require('../')
  , path = require('path');

test('\nsync - finding ship starting at lowest dir, looking for dependency unodep', function (t) {
  
  var found = findShip.sync(
      path.join(__dirname, 'uno', 'dos', 'tres')
    , function ismothership (pack) {
        return !!(pack.dependencies && pack.dependencies.unodep);
      }
  );

  if (!found) { t.fail("not found"); return t.end(); }
  t.equal(found.path, path.join(__dirname, 'uno', 'package.json'), 'resolves correct package.json path')
  t.equal(found.pack.name, 'uno', 'resolves correct package.json')
  t.end();

})

test('\nsync - finding ship starting at lowest dir, looking for dependency tresdep', function (t) {
  
  var found = findShip.sync(
      path.join(__dirname, 'uno', 'dos', 'tres')
    , function ismothership (pack) {
        return !!(pack.dependencies && pack.dependencies.tresdep);
      }
  );
  if (!found) { t.fail("not found"); return t.end(); }
  t.equal(found.path, path.join(__dirname, 'uno', 'dos', 'tres', 'package.json'), 'resolves correct package.json path')
  t.equal(found.pack.name, 'tres', 'resolves correct package.json')
  t.end();
})

test('\nsync - finding ship starting at lowest dir, looking for name dos', function (t) {
  var found = findShip.sync(
      path.join(__dirname, 'uno', 'dos', 'tres')
    , function ismothership (pack) {
        return pack.name === 'dos';
      }
  );
  if (!found) { t.fail("not found"); return t.end(); }
  t.equal(found.path, path.join(__dirname, 'uno', 'dos', 'package.json'), 'resolves correct package.json path')
  t.equal(found.pack.name, 'dos', 'resolves correct package.json')
  t.end();
})

test('\nsync - finding ship starting at lowest dir, looking for name cuatro - which does not exist', function (t) {
  var found = findShip.sync(
      path.join(__dirname, 'uno', 'dos', 'tres')
    , function ismothership (pack) {
        return pack.name === 'cuatro';
      }
  );
  // if (err) { t.fail(err); return t.end(); }
  t.notOk(found, 'finds no mother ship')
  t.end();
})
