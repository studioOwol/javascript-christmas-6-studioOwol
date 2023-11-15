import { KINDS, MENUS } from '../constants/menus.js';
import OrderValidator from '../utils/orderValidator.js';
import { OUTPUT_MESSAGE } from '../constants/texts.js';

class Order {
  #orders;
  #orderSheet;

  constructor(orders) {
    try {
      OrderValidator.validateOrder(orders);
      this.#orders = orders;
      this.#orderSheet = new Map();
    } catch (error) {
      throw error;
    }
  }

  processOrderDetails() {
    let orderDetails = '';

    this.#orderSheet.forEach((count, menuName) => {
      if (count !== 0) {
        orderDetails += OUTPUT_MESSAGE.menus(menuName, count);
      }
    });

    return orderDetails;
  }

  createOrderSheet() {
    this.#orders.forEach(order => {
      const [menuName, quantity] = order.split('-');

      this.#orderSheet.set(menuName, Number(quantity));
    });

    return this.processOrderDetails();
  }

  calculateTotalAmount() {
    let totalAmount = 0;

    this.#orderSheet.forEach((quantity, menuName) => {
      const menuItem = MENUS[menuName];

      totalAmount += menuItem.price * Number(quantity);
    });

    return totalAmount;
  }

  countDessertMenu() {
    let dessertCount = 0;

    this.#orderSheet.forEach((quantity, menuName) => {
      const menuItem = MENUS[menuName];

      if (menuItem.kind === KINDS.dessert) {
        dessertCount += Number(quantity);
      }
    });

    return dessertCount;
  }

  countMainMenu() {
    let mainCount = 0;

    this.#orderSheet.forEach((quantity, menuName) => {
      const menuItem = MENUS[menuName];

      if (menuItem.kind === KINDS.main) {
        mainCount += Number(quantity);
      }
    });

    return mainCount;
  }
}

export default Order;
