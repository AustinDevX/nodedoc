var debug = require('debug')('Module Finder');
var maybe = require('monet').Maybe;

var misc  = require('./misc');
var ext   = require('./extractor')

/**
  * @description - Retrieves the documentation associated with a nodejs module
  * @param    - {string} moduleName - The name of the node module
  * @returns  - {Promise} Promise of the module's documentation
  */
function getModuleDocumentation(doc, moduleName) {
    debug(`Retrieving documentation for module ${moduleName}`);
    let modules = ext.extractModules(doc).val;
    let module  = misc.findPropertyMatch(modules, {name: moduleName});
    debug(`Documentation for module: ${moduleName} retrieved`);
    return module;
}

function getClassDocumentation(docs, className) {
  debug(`Retrieving documentation for class: ${className}`);
  //get the name of the module
  let moduleName = ext.extractName(docs).val;
  //get the classes associated with this module
  let classes = ext.extractClasses(docs).val;
  let fullClassName = `${moduleName}.${className}`;
  debug('Class name formulated %s', fullClassName);
  let match = misc.findPropertyMatch(classes, {name: fullClassName}).val
  return maybe.fromNull(match)
}

function getMethodDocumentation(documentation, methodName){
  let methods = ext.extractMethods(documentation).val;
  let match   = misc.findPropertyMatch(methods, {name: methodName}).val;
  return maybe.fromNull(match);
}

function getEventDocumentation(documentation, eventName){
  let methods = ext.extractEvents(documentation).val;
  let match   = misc.findPropertyMatch(methods, {name: eventName}).val;
  return maybe.fromNull(match);
}

var scanner = {
    getModuleDocumentation,
    getClassDocumentation,
    getMethodDocumentation,
    getEventDocumentation
}

module.exports = scanner;
