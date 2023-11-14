import { KINDS, MENUS } from '../constants/menus.js';
import orderValidator from '../utils/orderValidator.js';

class Order {
  #orders;

  constructor(orders) {
    orderValidator(orders);
    this.#orders = orders;
  }

  createOrderSheet() {
    let orderSheet = new Map();

    this.#orders.forEach(order => {
      const [menuName, quantity] = order.split('-');

      orderSheet.set(menuName, Number(quantity));
    });

    return orderSheet;
  }

  calculateTotalAmount(orderSheet) {
    let totalAmount = 0;

    orderSheet.forEach((quantity, menuName) => {
      const menuItem = MENUS[menuName];

      totalAmount += menuItem.price * Number(quantity);
    });

    return totalAmount;
  }

  countDessertMenu(orderSheet) {
    let dessertCount = 0;

    orderSheet.forEach((quantity, menuName) => {
      const menuItem = MENUS[menuName];

      if (menuItem.kind === KINDS.dessert) {
        dessertCount += Number(quantity);
      }
    });

    return dessertCount;
  }

  countMainMenu(orderSheet) {
    let mainCount = 0;

    orderSheet.forEach((quantity, menuName) => {
      const menuItem = MENUS[menuName];

      if (menuItem.kind === KINDS.main) {
        mainCount += Number(quantity);
      }
    });

    return mainCount;
  }
}

export default Order;
