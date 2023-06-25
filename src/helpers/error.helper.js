class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
  }
}

export default (message, statusCode) => {
  throw new CustomError(message, statusCode);
};
