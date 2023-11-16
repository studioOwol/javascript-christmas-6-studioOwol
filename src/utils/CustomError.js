import { ERROR } from '../constants/errors.js';

class CustomError extends Error {
  constructor(message) {
    super(ERROR.prefix(message));
    this.name = this.constructor.name;
  }
}

export default CustomError;
