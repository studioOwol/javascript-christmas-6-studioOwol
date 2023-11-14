import { DAYS, DISCOUNT, EVENTS } from '../src/constants/events.js';
import { KINDS, MENUS } from '../src/constants/menus.js';

describe('Benefit', () => {
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
  ])('방문 날짜가 평일이면, 평일 할인 금액을 계산한다.', (order, discount) => {
    const menuItem = MENUS[order];
    const visitDay = 14;
    let weekdayDiscount = 0;

    if (!DAYS.weekend.includes(visitDay) && menuItem.kind === KINDS.dessert) {
      weekdayDiscount -= DISCOUNT.weekday;
    }

    expect(weekdayDiscount).toBe(discount);
  });

  test('방문 날짜가 일요일 또는 크리스마스 당일이면, 특별 할인 금액을 계산한다.', () => {
    const visitDay = 25;
    let specialDiscount = 0;

    if (DAYS.special.includes(visitDay)) {
      specialDiscount -= DISCOUNT.special;
    }

    expect(specialDiscount).toBe(-1000);
  });
});

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
