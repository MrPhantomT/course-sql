/* global require describe it */

const fs = require("fs");
const assert = require("assert");
const pgp = require("pg-promise")(/*options*/);
const cn = {
  user: "nobody",
  host: "/var/run/postgresql"
};

describe("rows", function() {
  it("should be updated", (done) => {
    const db = pgp(cn);
    const solution = fs.readFileSync("./solution.sql", "utf8")
                       .split(/--.*/)
                       .map(query => query.trim())
                       .filter(query => query !== "");

    const userSolutionChain = solution.reduce((acc, line) => {
      return acc.then(() => db.query(line));
    }, Promise.resolve());

    const solutionPromise = Promise.resolve().then(() => db.query("select solution() AS name;"));

    Promise.all([userSolutionChain, solutionPromise]).then((values) => {
      assert.equal(JSON.stringify(values[0]), JSON.stringify(values[1]));
    }).then(done, done);

  });
});

