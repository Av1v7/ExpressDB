class ExpressError extends Error {
  constructor(message) {
    super(message);
    this.name = "ExpressDBError";
  }
}

module.exports = { ExpressError }