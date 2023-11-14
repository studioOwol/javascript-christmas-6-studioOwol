import { BADGE, EVENTS } from '../constants/events.js';
import { MENUS } from '../constants/menus.js';
import Benefit from '../domain/Benefit.js';
import Order from '../domain/Order.js';

const EventService = {
  createBenefit(visitDay) {
    const benefit = new Benefit(visitDay);

    return benefit;
  },

  createOrder(orders) {
    const order = new Order(orders);

    return order;
  },

  getOrderSheet(order) {
    const orderSheet = order.createOrderSheet();
    const totalAmount = order.calculateTotalAmount(orderSheet);

    return { orderSheet, totalAmount };
  },

  getGift(benefit) {
    return benefit.hasGift();
  },

  getBenefitSheet(benefit, order) {
    const { orderSheet, totalAmount } = this.getOrderSheet(order);
    const dessertCount = order.countDessertMenu(orderSheet);
    const mainCount = order.countMainMenu(orderSheet);
    const benefitDetails = benefit.createBenefitSheet(totalAmount, {
      dessertCount,
      mainCount,
    });

    return benefitDetails;
  },

  getTotalBenefit(benefit) {
    return benefit.calcaulteTotalBenefit();
  },

  checkPaymentAmount(totalAmount, totalBenefit) {
    if (totalBenefit + MENUS[EVENTS.gift.item].price < 0) {
      return totalAmount + totalBenefit + MENUS[EVENTS.gift.item].price;
    }

    return totalAmount + totalBenefit;
  },

  checkEventBadge(totalBenefit) {
    const badges = new Map([
      [BADGE.star.condition, BADGE.star.name],
      [BADGE.tree.condition, BADGE.tree.name],
      [BADGE.santa.condition, BADGE.santa.name],
    ]);
    let badge = EVENTS.none;

    badges.forEach((name, condition) => {
      if (totalBenefit <= condition) {
        badge = name;
      }
    });

    return badge;
  },
};

export default EventService;
