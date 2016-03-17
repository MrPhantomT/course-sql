/* global require describe it */

var assert = require("assert");
var pgp = require("pg-promise")(/*options*/);
var cn = "postgres://postgres:@localhost/docker";
var db = pgp(cn);

describe("rows", function () {
    "use strict";
    it("should be updated", (done) => {
        var extSQL = new pgp.QueryFile('./solution.sql', {minify: true});
        db.task(t=>t.batch([
                t.query(extSQL),
                t.query("select solution() AS name")
            ]))
            .then((values) => {
                assert.equal(JSON.stringify(values[0]), JSON.stringify(values[1]));
            })
            .then(done, done);
    });
});
