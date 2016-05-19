"use strict";

const maybe = require('monet').Maybe
const debug = require('debug')('Property Extractor');

/**
  * @desc     Extracts a property value from a object
  * @param    {Object} object The object containing the property to extracts
  * @param    {String} propertyName The property to extract
  * @returns  {Maybe} The property's value
  */
function extractProperty(object, propertyName) {
  // since null is also an object test that the object is truthy
  // in addition to the expected types of both arguments
  if ( (!object) || (typeof object !== 'object')
    || (typeof propertyName !== 'string')) {
    throw new TypeError("Invalid Argument");
  }

  let {[propertyName]:value} = object;
  if(value) {
    debug(`Property ${propertyName} found`);
    return maybe.Some(value)
  }
  debug(`Property ${propertyName} not found`);
  return maybe.None()
}

/**
  * @desc     Binds a property name to the extractProperty function
  * @params   {string}    propertyName The name of property to be bound
  * @returns  {Function}
  */
function extractX(propertyName) {
  if (typeof propertyName !== 'string') {
    throw new TypeError("Invalid Argument");
  }
  
  // returns a function that accepts an object and extracts the value
  // of the property name that has been bound
  return ( (object) => extractProperty(object, propertyName) );
}

module.exports.extractX            = extractX;
module.exports.extractProperty     = extractProperty;

module.exports.extractRawText      = extractX('textRaw');
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
