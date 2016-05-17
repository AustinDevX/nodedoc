"use strict";

const https   = require('https');
const debug   = require('debug')('Fetch');

const misc    = require('./misc')

/**
  * @desc     Retrieves the documentation associated with a node module
  * @throws   EmptyStringError
  * @param    {string} moduleName - The name of the module to retrieve
  * @returns  {Promise} promise of the module's documentation object
  */
function fetch(moduleName) {
  let url = misc.buildURL(moduleName);
  debug('Making request to %s', url);

  let promise = new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if(res.statusCode !== 200) reject(new Error('BadStatusCode'));
      debug('Response received with status code: %d', res.statusCode);

      let data = [];
      res.on('data', chunk => data.push(chunk));
      res.on('end', () => {
        let docString = Buffer.concat(data).toString();
        let docObject = JSON.parse(docString);
        resolve(docObject);
      });
      res.on('error', err => reject(err));
    });
  });
  
  return promise;
};

//decided to export it with a more semantic name lol
module.exports.fetchDocumentation = fetch;
