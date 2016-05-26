#! /usr/bin/env node
"use strict"

const program   = require('commander-plus')

const fetch     = require('../lib/fetch').fetchDocumentation;
const scanner   = require('../lib/scanner');
const ext       = require('../lib/extractor');
const format    = require('../lib/format');
const misc      = require('../lib/misc');

program
  .version('1.0.0')
  .option('-m', '--method <name>',  'The method to search for')
  .option('-e', '--event <name>',   'The event to search for')
  .parse(process.argv);

let searchString = program.args[0].trim();
//break down the search name into parts
let search = misc.parseModuleName(searchString);

let docs = fetch(search.module).then( doc => {
  let info = {
    module: search.module,
    //will be undefined if classname is undefined
    class: search.class
  }
  return document(info, doc);
});

docs = docs.then((docs) => {
  let moduleDocs = scanner.getModuleDocumentation(docs.documentation, search.module).val;

  if(search.class) {
    return scanner.getClassDocumentation(moduleDocs, docs.class).val
  } else {
    return moduleDocs;
  }
});

if(program['event'] && !program['method']) {
  docs = docs.then((docs) => {
    return scanner.getEventDocumentation(docs, program.event).val;
  });
} else if(program['method'] && !program['event']) {
  docs = docs.then((docs) => {
    return scanner.getMethodDocumentation(docs, program.method).val;
  });
}

if(program.desc) {
  docs = docs.then((docs) => {
    let desc = ext.extractDescription(docs).val;
    console.log(format.readable(desc));
  });
}

docs.catch(console.log);
