class HttpError extends Error {
  constructor(message, response, options = {}) {
    super(message, options);
    this.response = response;
  }
}

module.exports = HttpError;
