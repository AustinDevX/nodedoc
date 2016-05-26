"use strict";

const mocha   = require('mocha');
const assert  = require('chai').assert;

const misc    = require('../lib/misc');

describe('Misc' , function(){
  describe('#parseModuleName', function(){
    it('Should return null for invalide names', function(){
      assert.isNull(misc.parseModuleName("/home"));
      assert.isNull(misc.parseModuleName("/"));
      assert.isNull(misc.parseModuleName("hey/hat/bat"));
      assert.isNull(misc.parseModuleName("rat//bat"));
    });
    it("Should split a class path into parts", function(){
      assert.isObject(misc.parseModuleName("Http/Agent"));

      let res = misc.parseModuleName("Http/Agent");
      let count = 0;
      for (var prop in res) {
        if (res.hasOwnProperty(prop)) {
          count ++;
        }
      }
      assert.strictEqual(count, 2);
    });
    it("Should truncate trailing '/' from module names", function() {
      assert.strictEqual(misc.parseModuleName("http/").module , 'http');
      assert.strictEqual(misc.parseModuleName("lwan/").module , 'lwan');
    })
  });
});
