import EventService from '../service/EventService.js';
import InputView from '../views/InputView.js';
import { Console } from '@woowacourse/mission-utils';
import OutputView from '../views/OutputView.js';

class EventController {
  async init() {
    await this.#handleOrderSheetStage();
  }

  async #handleOrderSheetStage() {
    const visitDay = await this.#takeVisitDayStage();
    const order = await this.#takeOrderStage();
    const { orderSheet, totalAmount } = EventService.getOrderSheet(order);

    OutputView.printMenu(orderSheet);
    OutputView.printTotalAmount(totalAmount);

    this.#handleBenefitStage(visitDay, order, totalAmount);
  }

  #handleBenefitStage(visitDay, order, totalAmount) {
    const benefit = EventService.createBenefit(visitDay);
    const benefitDetails = EventService.getBenefitSheet(benefit, order);
    const gift = EventService.checkGift(totalAmount);
    const totalBenefit = EventService.getTotalBenefit(benefit);

    OutputView.printGift(gift);
    OutputView.printDetails(benefitDetails);
    OutputView.printTotalBenefit(totalBenefit);

    this.#checkPaymentStage(totalAmount, totalBenefit);
  }

  #checkPaymentStage(totalAmount, totalBenefit) {
    const payment = EventService.checkPaymentAmount(totalAmount, totalBenefit);

    OutputView.printPayment(payment);
    this.#checkBadgeStage(totalBenefit);
  }

  #checkBadgeStage(totalBenefit) {
    const badge = EventService.checkEventBadge(totalBenefit);

    OutputView.printBadge(badge);
  }

  async #takeVisitDayStage() {
    const visitDay = await InputView.readDate();
    return visitDay;
  }

  async #takeOrderStage() {
    let order;
    try {
      const orders = await InputView.readOrder();
      order = EventService.createOrder(orders);
    } catch (error) {
      Console.print(error.message);
      return this.#takeOrderStage();
    }
    return order;
  }
}

export default EventController;
