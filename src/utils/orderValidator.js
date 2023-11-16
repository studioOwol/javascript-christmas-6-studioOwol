import { ERROR } from '../constants/errors.js';
import { MENUS, KINDS, MENU_RULE } from '../constants/menus.js';
import CustomError from './CustomError.js';
import { SYMBOL } from '../constants/texts.js';

const orderValidator = {
  validateOrder(orders) {
    this.isExceedCount(orders);
    this.isInMenu(orders);
    this.hasDuplicates(orders);
    this.hasDrinkOnly(orders);
  },

  isExceedCount(orders) {
    const totalCount = orders.reduce((count, order) => {
      const quantity = Number(order.split(SYMBOL.bar)[1]);
      return count + quantity;
    }, 0);

    if (totalCount > MENU_RULE.max) {
      throw new CustomError(ERROR.exceedOrder);
    }
  },

  isInMenu(orders) {
    orders.forEach(order => {
      const menuName = order.split(SYMBOL.bar)[0];
      const isInMenu = menuName in MENUS;

      if (!isInMenu) {
        throw new CustomError(ERROR.invalidOrder);
      }
    });
  },

  hasDuplicates(orders) {
    const uniqueMenus = new Set(
      orders.map(order => order.split(SYMBOL.bar)[0]),
    );

    if (orders.length !== uniqueMenus.size) {
      throw new CustomError(ERROR.invalidOrder);
    }
  },

  hasDrinkOnly(orders) {
    const hasNoneDrinkOrder = orders.some(order => {
      const menuName = order.split(SYMBOL.bar)[0];
      const menu = MENUS[menuName];
      return menu?.kind !== KINDS.drink;
    });

    if (!hasNoneDrinkOrder) {
      throw new CustomError(ERROR.hasDrinkOnly);
    }
  },
};

export default orderValidator;
