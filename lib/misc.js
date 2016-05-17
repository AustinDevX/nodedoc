// homeless functions
"use strict";

const html2Text = require('html-to-text');
const maybe = require('monet').Maybe

const errors  = require('./custom_errors.js');

/**
  * @desc   iterates over an array for objects matching the criterion object
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

module.exports = {
  findPropertyMatch,
  buildURL
};
