const isNil = require('lodash/isNil');

module.exports = {
  isInvalid: isInvalid,
  isValid: isValid,
  processError: processError
};

// EXPORTS

function isInvalid(object, errorCode, errorMessage, success) {
  return new Promise((resolve, reject) => {
    if (isNil(object)) {
      resolve(success);
    } else {
      reject(getError(errorCode, errorMessage));
    }
  });
}

function isValid(object, errorCode, errorMessage, success) {
  success = success !== undefined ? success : object;
  return new Promise((resolve, reject) => {
    if (isNil(object)) {
      reject(getError(errorCode, errorMessage));
    } else {
      resolve(success);
    }
  });
}

function processError(err, next) {
  if (err.status) {
    next(err);
  } else {
    next(new Error(err));
  }
}

// INTERNALS

function getError(code, message) {
  return new HttpError(code, message);
}
