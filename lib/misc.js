// homeless functions
"use strict";

const html2Text = require('html-to-text');
const maybe = require('monet').Maybe

const errors  = require('./custom_errors.js');

/**
  * @desc   iterates over an array for objects matching the propecriterion object
  * @param  {Array<Object>} arr - an array of objects
  * @param  {Object} spec - an object containing the properties to be searched for
  * @returns {Maybe} a Maybe monad wrapping the match
  */
function findPropertyMatch(arr, spec) {
  //iterate over the array
  let match = arr.find( (elem)=>{
    //iterate over the properties of the spec object
    for(let prop in spec) {
      //only match on properties defined on the object itself
      if (spec.hasOwnProperty(prop)) {
        // if the current element does not have a property corresponding to
        // the target key or the values do not match then continue to the
        // next element in the array
        if(( elem[prop] == false ) || (elem[prop] !== spec[prop])) {
          return false;
        }
      }
    };
    // element has a match for all the properties
    // defined on the spec object
    return true;
  });
  return maybe.fromNull(match);
}

/**
  * @desc     creates a url to the specified module's documentation page
  * @throws   EmptyStringError
  * @params   {string} moduleName
  * @returns  {string} documentation url
  */
function buildURL(moduleName){
  var baseURL = "https://nodejs.org/api/";    //the base url for the nodejs documentation
  if (moduleName.length > 0) {                //ensure that moduleName is a non empty string
    var pageURL = baseURL+moduleName+".json";
  } else {
    throw new errors.EmptyStringError();
    debug('Module name is an empty string');
  }
  return pageURL;
}


/**
 * parses the first command line parameter passed in to the program and
 * returns an object representing the decomposition of the parameter into its
 * module / class parts
 *
 * @param  {String} moduleName The module name or module/class name string
 * @return {Object}            An object containing the parts of the module name
 */
function parseModuleName(moduleName) {
  //create a character array from 'moduleName'
  var chars = moduleName.split("");
  //get the number of '/' characters in the array
  var slashCount = chars.reduce((count, char) => {
    return char === '/' ? count + 1 : count;
  },0);

  var result = {};
  // if no slashes are found then 'moduleName' is assumed to be
  // only the name of the module
  if (slashCount === 0) {
    result.module = moduleName;
  } else if (slashCount === 1) {
    //name is invalid if it begins with a '/'
    if(moduleName.startsWith("/")) return null;
    //if no characters come after the '/' then remove the '/'
    // and use the characters that preced it as the name of the module
    if(moduleName.endsWith("/")) {
      result.module = moduleName.replace("/", "");
    } else {
      // split 'moduleName' into two parts , the first part representing the
      // name of the module and the second the name of the class
      let parts = moduleName.split("/");
      result.module = parts[0];
      result.class  = parts[1];
    }
  } else {
    //name contains more than 1 '/'
    return null;
  }
  return result;
}

module.exports = {
  findPropertyMatch,
  buildURL,
  parseModuleName
};
