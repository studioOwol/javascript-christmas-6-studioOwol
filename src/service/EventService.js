import { BADGE, EVENTS } from '../constants/events.js';
import { MENUS } from '../constants/menus.js';
import Benefit from '../domain/Benefit.js';
import Order from '../domain/Order.js';
import { OUTPUT_MESSAGE } from '../constants/texts.js';

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
    const orderDetails = order.createOrderSheet();

    return orderDetails;
  },

  getTotalAmount(order) {
    const totalAmount = order.calculateTotalAmount();

    return totalAmount;
  },

  checkGift(totalAmount) {
    if (totalAmount < EVENTS.gift.condition) {
      return EVENTS.none;
    }

    return OUTPUT_MESSAGE.gift;
  },

  getBenefitSheet(benefit, order, totalAmount) {
    const dessertCount = order.countDessertMenu();
    const mainCount = order.countMainMenu();
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
