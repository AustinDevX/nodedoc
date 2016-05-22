var html2text   = require('html-to-text');
var htmlparser  = require('htmlparser2');


function readable(htmlString) {
  return html2text.fromString(htmlString);
}

module.exports = {
  readable
}
