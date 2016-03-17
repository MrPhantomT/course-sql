/* global require describe it */

var fs = require("fs");
var assert = require("assert");
var pgp = require("pg-promise")(/*options*/);
var cn = {
  user: 'nobody',
  host: '/var/run/postgresql'
};

describe("rows", function() {
  "use strict";
  it("should be updated", (done) => {
    var db = pgp(cn);
    const solution = fs.readFileSync("./solution.sql", "utf8").split(/--.*/).map(query => query.trim()).filter(query => query !== "");

var userSolutionChain = solution.reduce((acc, line) => {
  return acc.then(() => db.query(line));
}, Promise.resolve());

var solutionPromise = Promise.resolve().then(() => db.query("select solution() AS name;"));

Promise.all([userSolutionChain, solutionPromise]).then((values) => {
  assert.equal(JSON.stringify(values[0]), JSON.stringify(values[1]));
}).then(done, done);

  });
});

