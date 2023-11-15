import Benefit from '../src/domain/Benefit.js';
import Order from '../src/domain/Order.js';
import { MENUS } from '../src/constants/menus.js';
import { EVENTS, BADGE } from '../src/constants/events.js';
import { OUTPUT_MESSAGE } from '../src/constants/texts.js';

describe('EventService', () => {
  const visitDay = 3;
  const benefit = new Benefit(visitDay);
  const { totalAmount, dessertCount, mainCount } = makeOrderSheet();
  benefit.createBenefitSheet(totalAmount, { dessertCount, mainCount });
  const totalBenefit = benefit.calcaulteTotalBenefit();

  describe('증정 여부 반환', () => {
    test('총주문 금액 조건에 해당하면, 증정을 제공한다.', () => {
      let gift = '';

      if (totalAmount >= EVENTS.gift.condition) {
        gift = OUTPUT_MESSAGE.gift;
      }

      expect(gift).toBe(OUTPUT_MESSAGE.gift);
    });
  });

  describe('예상 결제 금액 계산', () => {
    test('총주문 금액, 총혜택 금액, 증정품의 가격을 반영하여 예상 결제 금액을 계산한다.', () => {
      if (totalBenefit + MENUS[EVENTS.gift.item].price < 0) {
        const payment =
          totalAmount + totalBenefit + MENUS[EVENTS.gift.item].price;

        expect(payment).toBe(135754);
      }
    });
  });

  describe('배지 결정', () => {
    test('총혜택 금액에 따라 배지 종류를 결정한다.', () => {
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

      expect(badge).toEqual(BADGE.santa.name);
    });
  });
});

function makeOrderSheet() {
  const orders = ['바비큐립-1', '티본스테이크-1', '초코케이크-2', '제로콜라-1'];
  const order = new Order(orders);
  const orderSheet = order.createOrderSheet();
  const totalAmount = order.calculateTotalAmount(orderSheet);
  const dessertCount = order.countDessertMenu(orderSheet);
  const mainCount = order.countMainMenu(orderSheet);
  return { totalAmount, dessertCount, mainCount };
}
