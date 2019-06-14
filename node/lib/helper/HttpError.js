module.exports = HttpError;
function HttpError(status, message) {
  if (arguments.length !== 2) throw new Error('HttpError must take two parameters.');

  this.status = status;
  this.message = message;

  this.log = `HttpError ${status}: ${message}`;
}
HttpError.prototype = new Error();
