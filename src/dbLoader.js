const fs = require('fs');
const Fact = require('../src/fact');

const DBLoader = function DBLoader() {
    this.facts = [];
    this.rules = [];
};

DBLoader.prototype.loadFromFile = function (filePath) {
    let rawDB = fs.readFileSync(filePath, "utf-8");
    this.loadFromString(rawDB);
};

DBLoader.prototype.loadFromString = function (rawDB) {
    rawDB = rawDB.split("\n");
    this.loadFromArray(rawDB)
};

DBLoader.prototype.loadFromArray = function (arr) {
    arr.forEach((element) => {
        if (element !== "") {
            if (element.includes(":-")) {
                this.rules.push(element.replace(/.$/, ''));
            } else {
                this.facts.push(new Fact(element.replace(/.$/, '')));
            }
        }
    });
};

module.exports = DBLoader;