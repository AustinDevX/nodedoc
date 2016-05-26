"use strict"

const MODULE_DOCUMENT     = 1;
const CLASS_DOCUMENT      = 2;
const EVENT_DOCUMENT      = 3;
const METHOD_DOCUMENT     = 4;
const SIGNATURES_DOCUMENT = 5;
const PROPERTIES_DOCUMENT = 6;

/**
 * Creates a new documentation object containing the actual module
 * documenation and any associated meta data
 *
 * @param  {string} moduleName    The name of the node module
 * @param  {string} sourceUrl     The url that the documenation was retrieved from
 * @param  {Object} documentation The JSON parsed object representing the documentation
 * @return {Object}               The new document object
 */
function document(docInfo, documentation) {
  if(!new.target) {
    return new document(moduleName, sourceUrl, documentation);
  }

  this.module     = docInfo.module;
  this.class      = docInfo.class;
  this.documentation = documentation;

  return this;
}
