import { PERIOD } from '../constants/events.js';
import { ERROR } from '../constants/errors.js';
import CustomError from './CustomError.js';

const formValidator = {
  validateDate(visitDay) {
    if (!this.isNumber(visitDay)) {
      throw new CustomError(ERROR.invalidDay);
    }
    if (this.isNumberInRange(visitDay)) {
      throw new CustomError(ERROR.invalidDay);
    }
  },

  validateOrderForm(parts) {
    parts.forEach(part => {
      const [menuName, quantity] = part.split('-');
      if (!menuName || Number(quantity) < 1 || isNaN(quantity)) {
        throw new CustomError(ERROR.invalidOrder);
      }
    });
  },

  isNumber(number) {
    return /^\d+$/.test(number);
  },

  isNumberInRange(number) {
    return number < PERIOD.min || number > PERIOD.max;
  },
};

export default formValidator;
