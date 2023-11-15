import { PERIOD } from '../constants/events.js';
import { ERROR } from '../constants/errors.js';
import CustomError from './CustomError.js';
import { SYMBOL } from '../constants/texts.js';
import { MENU_RULE } from '../constants/menus.js';

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
      const quantity = part.split(SYMBOL.bar)[1];

      if (!this.isRightForm(part)) {
        throw new CustomError(ERROR.invalidOrder);
      }

      if (Number(quantity) < MENU_RULE.min) {
        throw new CustomError(ERROR.invalidOrder);
      }
    });
  },

  isRightForm(menu) {
    return /^[a-z|A-z|ㄱ-ㅎ|가-힣|0-9|\s]+-[0-9\s]+$/.test(menu);
  },

  isNumber(number) {
    return /^\d+$/.test(number);
  },

  isNumberInRange(number) {
    return number < PERIOD.min || number > PERIOD.max;
  },
};

export default formValidator;
