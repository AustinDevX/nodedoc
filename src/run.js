"use strict"

const program   = require('commander-plus')

const fetch     = require('../lib/fetch').fetchDocumentation;
const scanner   = require('../lib/scanner');
const ext       = require('../lib/extractor');
const format    = require('../lib/format');

program
  .version('1.0.0')
  .option('-c, --class <class>',  'Class to lookup')
  .option('-m, --method <method>', 'Method to lookup')
  .option('-e, --event <event>',  'Event to lookup')
  .option('-d, --desc', 'Print the description')
  .parse(process.argv);

let moduleName = program.args[0];

let docs = fetch(moduleName);
docs = docs.then((docs) => {
  let moduleDocs = scanner.getModuleDocumentation(docs, moduleName).val;

  if(program['class']) {
    return scanner.getClassDocumentation(moduleDocs, program.class).val
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
