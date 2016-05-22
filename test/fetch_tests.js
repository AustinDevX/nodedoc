const docRetriever = require('../lib/DocRetriever');
const html2Text = require('html-to-text');
const mocha = require('mocha');
const sinon = require('sinon');
const assert = require('chai').assert;


describe("Documentation Retriever", function() {
  describe("Retrieving JSON representation of webpage", function() {
    it("Should return an object", function() {
      let docs = docRetriever.getModuleDocumentation('https');
      assert.isObject(docs, "Returns an object");
    })
    it("Should be able to be chainable", function() {

    })
  })
})
