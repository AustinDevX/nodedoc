"use strict";

const maybe = require('monet').Maybe

/**
  * @desc     Extracts a property value from a object
  * @param    {Object} object The object containing the property to extracts
  * @param    {String} propertyName The property to extract
  * @returns  {Maybe} The property's value
  */
function extractProperty(object, propertyName) {
  let {[propertyName]:value} = object;
  if(value) {
    return maybe.Some(value)
  }
  return maybe.None()
}

/**
  * @desc     Function factory for extracting properties
  * @params   {string} propertyName The property to be extracted
  * @returns  {Function}
  */
function extractX(propertyName) {
  return object => extractProperty(object, propertyName);
}

module.exports.extractRawText      = extractX('textRaw')
module.exports.extractType         = extractX('type');
module.exports.extractName         = extractX('name');
module.exports.extractStability    = extractX('stability');
module.exports.extractDescription  = extractX('desc');
module.exports.extractModules      = extractX('modules');
module.exports.extractClasses      = extractX('classes');
module.exports.extractProperties   = extractX('properties');
module.exports.extractMethods      = extractX('methods');
module.exports.extractParams       = extractX('params');
module.exports.extractSignatures   = extractX('signatures');
module.exports.extractEvents       = extractX('events');
