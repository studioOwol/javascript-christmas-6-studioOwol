import { Console } from '@woowacourse/mission-utils';
import { INPUT_MESSAGE, SYMBOL } from '../constants/texts.js';
import formValidator from '../utils/formValidator.js';

const InputView = {
  async readDate() {
    let visitDay;
    try {
      visitDay = await Console.readLineAsync(INPUT_MESSAGE.visitDay);
      formValidator.validateDate(visitDay);
    } catch (error) {
      Console.print(error.message);
      return this.readDate();
    }
    return Number(visitDay);
  },

  async readOrder() {
    let orders;
    try {
      const order = await Console.readLineAsync(INPUT_MESSAGE.orders);
      orders = order.trim().replace(/\s/g, '').split(SYMBOL.comma);
      formValidator.validateOrderForm(orders);
    } catch (error) {
      Console.print(error.message);
      return this.readOrder();
    }
    return orders;
  },
};

export default InputView;
