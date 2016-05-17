var html2text = require('html-to-text');

function readable(htmlString) {
  return html2text.fromString(htmlString);
}

module.exports = {
  readable
}
