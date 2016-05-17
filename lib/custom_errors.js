"use strict";

function EmptyStringError(msg) {
  this.name     = 'EmptyStringError';
  this.message  = msg || 'String is empty';
  this.stack    = (new Error()).stack;
}
EmptyStringError.prototype    = Object.create(Error.prototype);
EmptyStringError.constructor  = EmptyStringError;

function InvalidModuleError(msg) {
  this.name     = 'InvalidModuleError';
  this.message  = msg || 'Module does not exist';
  this.stack    = (new Error()).stack;
}
InvalidModuleError.prototype = Object.create(Error.prototype);
InvalidModuleError.constructor = InvalidModuleError;

module.exports.EmptyStringError = EmptyStringError;
module.exports.InvalidModuleError = InvalidModuleError;
