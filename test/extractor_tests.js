const mocha     = require("mocha");
const assert    = require("chai").assert;
const Maybe     = require('monet').Maybe

const extractProperty = require("../lib/extractor").extractProperty;
const extractX        = require("../lib/extractor").extractX;

context("Extractor", function() {
  describe("#extractProperty", function() {

    var hero = {
      name    : "The Flash",
      power   : "Super Speed",
      status  : "MIA"
    }

    it("Should return an object", function() {
      assert.isObject(extractProperty(hero, "name"));
      assert.isObject(extractProperty(hero, "destiny"));
      assert.isObject(extractProperty(hero, "12"));
    });
    it("Should return a Some when the property is defined", function() {
      assert.strictEqual(extractProperty(hero, "name").val, "The Flash");
      assert.strictEqual(extractProperty(hero, "power").val, "Super Speed");
      assert.strictEqual(extractProperty(hero, "status").val, "MIA");
    })
    it("Should return a None when property is not defined", function() {
      assert.isFalse(extractProperty(hero, "destiny").isValue);
      assert.isFalse(extractProperty(hero, "rival").isValue);
      assert.isFalse(extractProperty(hero, "age").isValue);
    });
    it("Should throw a TypeError when invalid arguments are passed", function(){
      assert.throws(extractProperty.bind(null, [22, "name"]),TypeError);
      assert.throws(extractProperty.bind(null, [[], "name"]),TypeError);
      assert.throws(extractProperty.bind(null, [hero, 22.43]),TypeError);
      assert.throws(extractProperty.bind(null, [hero, []]),TypeError);
      assert.throws(extractProperty.bind(null, [hero, undefined]),TypeError);
    });
  });

  describe("#extractX", function() {
    it("Should return a function", function() {
      assert.isFunction(extractX("name"));
      assert.isFunction(extractX("dog"));
      assert.isFunction(extractX("man"));
    });

    it("Should only accept strings", function() {
      assert.throws(extractX.bind(null, [22]), TypeError);
      assert.throws(extractX.bind(null, [{}]), TypeError);
      assert.throws(extractX.bind(null, [[]]), TypeError);
      assert.throws(extractX.bind(null, [undefined]), TypeError);
      assert.throws(extractX.bind(null, [true]), TypeError);
    });
  });
});
