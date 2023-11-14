import { DAYS, DISCOUNT, EVENTS } from '../src/constants/events.js';
import { KINDS, MENUS } from '../src/constants/menus.js';
import Benefit from '../src/domain/Benefit.js';
import Order from '../src/domain/Order.js';

describe('Benefit', () => {
  describe('방문 날짜에 따른 할인 금액 계산', () => {
    test('방문 날짜가 12/1~12/25 기간이면, 크리스마스 디데이 할인 금액을 계산한다.', () => {
      const visitDay = 25;
      let seasonDiscount = 0;

      const seasonMap = checkSeason();

      if (seasonMap.has(visitDay)) {
        seasonDiscount -= seasonMap.get(visitDay);
      }

      expect(seasonDiscount).toBe(-3400);
    });

    test.each([
      ['초코케이크', -2023],
      ['티본스테이크', 0],
      ['아이스크림', -2023],
    ])(
      '방문 날짜가 평일이면, 평일 할인 금액을 계산한다.',
      (order, discount) => {
        const menuItem = MENUS[order];
        const visitDay = 14;
        let weekdayDiscount = 0;

        if (
          !DAYS.weekend.includes(visitDay) &&
          menuItem.kind === KINDS.dessert
        ) {
          weekdayDiscount -= DISCOUNT.weekday;
        }

        expect(weekdayDiscount).toBe(discount);
      },
    );

    test('방문 날짜가 일요일 또는 크리스마스 당일이면, 특별 할인 금액을 계산한다.', () => {
      const visitDay = 25;
      let specialDiscount = 0;

      if (DAYS.special.includes(visitDay)) {
        specialDiscount -= DISCOUNT.special;
      }

      expect(specialDiscount).toBe(-1000);
    });
  });

  describe('혜택 내역 생성', () => {
    test('방문 날짜와 메뉴 이름이 담긴 배열이 입력되면, 혜택 내역을 생성한다.', () => {
      const visitDay = 3;
      const benefit = new Benefit(visitDay);

      const { totalAmount, dessertCount, mainCount } = makeOrderSheet();

      const events = Object.keys(EVENTS);

      events.forEach(eventType => {
        if (totalAmount >= EVENTS[eventType].condition) {
          const discount = benefit.calculateDiscount(eventType, {
            dessertCount,
            mainCount,
          });
          benefitSheet.set(EVENTS[eventType].name, discount);
        }
      });

      expect(benefitSheet.get(EVENTS.gift.name)).toBe(-25000);
    });
  });
});

let benefitSheet = new Map([
  [EVENTS.season.name, 0],
  [EVENTS.special.name, 0],
  [EVENTS.weekday.name, 0],
  [EVENTS.weekend.name, 0],
  [EVENTS.gift.name, 0],
]);

function checkSeason() {
  const discounts = new Map();
  const seasonDays = 25;
  let amount = 1000;

  Array.from({ length: seasonDays }, (_, day) => {
    discounts.set(day + 1, amount);
    amount += 100;
  });
  return discounts;
}

function makeOrderSheet() {
  const orders = ['바비큐립-1', '티본스테이크-1', '초코케이크-2', '제로콜라-1'];
  const order = new Order(orders);
  const orderSheet = order.createOrderSheet();
  const totalAmount = order.calculateTotalAmount(orderSheet);
  const dessertCount = order.countDessertMenu(orderSheet);
  const mainCount = order.countMainMenu(orderSheet);
  return { totalAmount, dessertCount, mainCount };
}
