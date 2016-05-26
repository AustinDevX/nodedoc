#! /usr/bin/env node
"use strict"

const program   = require('commander-plus');

const fetch     = require('../lib/fetch').fetchDocumentation;
const scanner   = require('../lib/scanner');
const ext       = require('../lib/extractor');
const format    = require('../lib/format');
const misc      = require('../lib/misc');

program
  .version('1.0.0')
  .option('-m, --method <method>',  'The method to search for')
  .option('-e, --event <event>',   'The event to search for')
  .parse(process.argv);

let searchString = program.args[0];
//break down the search name into parts
let search = misc.parseModuleName(searchString);

let docs = fetch(search.module);

docs = docs.then((docs) => {
  let moduleDocs = scanner.getModuleDocumentation(docs, search.module).val;

  if(search.class) {
    return scanner.getClassDocumentation(moduleDocs, search.class).val
  } else {
    return moduleDocs;
  }
});

if(program['event'] && !program['method']) {
  docs = docs.then((docs) => {
  });
  return scanner.getEventDocumentation(docs, program.event).val;
} else if(program['method'] && !program['event']) {
  docs = docs.then((docs) => {
    return scanner.getMethodDocumentation(docs, program.method).val;
  });
}

docs = docs.then((doc) => {
  if(doc.stabilityText) {
    let info = `${doc.name} [${doc.stabilityText}]`;
    if(doc.stability === 0) {
      var title = format.deprecated(info);
      console.log(`${title}`);
      return;
    } else {
      var title = format.title(info);
    }
  } else {
    var title = format.title(`${doc.name}`);
  }
  console.log(`${title}`);

  if(program['method']) {
    let usage = format.usage(doc.textRaw);
    console.log(usage);
  }

  let desc = ext.extractDescription(doc).val;
  console.log(format.readable(desc));
});

docs.catch(console.log);
