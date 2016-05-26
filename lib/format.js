var html2text   = require('html-to-text');
var htmlparser  = require('htmlparser2');
const chalk     = require('chalk');

function readable(htmlString) {
  return html2text.fromString(htmlString);
}

function title(title) {
  return chalk.green.bold.underline(`\n${title}\n`.toUpperCase());
}

function deprecated(title) {
  return chalk.red.bold.underline(`\n${title}\n`.toUpperCase());
}

function usage(text) {
  return chalk.green(`${text}\n`);
}

module.exports = {
  readable,
  title,
  deprecated,
  usage
}
