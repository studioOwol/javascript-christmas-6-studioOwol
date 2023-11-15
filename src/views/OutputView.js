import { Console } from '@woowacourse/mission-utils';
import { OUTPUT_MESSAGE, TITLE } from '../constants/texts.js';

const OutputView = {
  printMenu(orderDetails) {
    Console.print(OUTPUT_MESSAGE.preview);
    Console.print(TITLE.menu);
    Console.print(orderDetails);
  },

  printTotalAmount(totalAmount) {
    Console.print(TITLE.totalAmount);
    Console.print(OUTPUT_MESSAGE.totalAmount(totalAmount));
  },

  printGift(gift) {
    Console.print(TITLE.gift);
    Console.print(gift);
  },

  printDetails(benefitDetails) {
    Console.print(TITLE.details);
    Console.print(benefitDetails);
  },

  printTotalBenefit(totalBenefit) {
    Console.print(TITLE.totalBenefit);
    Console.print(OUTPUT_MESSAGE.totalBenefit(totalBenefit));
  },

  printPayment(payment) {
    Console.print(TITLE.payment);
    Console.print(OUTPUT_MESSAGE.payment(payment));
  },

  printBadge(badge) {
    Console.print(TITLE.badge);
    Console.print(badge);
  },
};

export default OutputView;
