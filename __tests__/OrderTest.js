import { KINDS, MENUS } from '../src/constants/menus.js';
import { SYMBOL } from '../src/constants/texts.js';

describe('Order', () => {
  test.each([
    ['초코케이크', KINDS.dessert],
    ['양송이수프', KINDS.appetizer],
    ['제로콜라', KINDS.drink],
    ['바베큐립', KINDS.main],
  ])('메뉴를 입력하면, 메뉴의 종류를 확인한다.', (order, kind) => {
    const menuItem = MENUS[order];

    if (menuItem) {
      expect(menuItem.kind).toEqual(kind);
    }
  });

  test('주문 내역 배열을 입력하면, 메뉴 이름과 개수를 분리한다.', () => {
    const orders = ['타파스-2', '샴페인-1'];
    let orderSheet = new Map();

    orders.forEach(order => {
      const [menuName, quantity] = order.split(SYMBOL.bar);
      orderSheet.set(menuName, Number(quantity));
    });

    expect(orderSheet.get('타파스')).toBe(2);
  });

  test('주문 내역 배열을 입력하면, 총주문 금액을 계산한다.', () => {
    const orderSheet = new Map([
      ['타파스', 2],
      ['샴페인', 1],
    ]);
    let totalAmount = 0;

    orderSheet.forEach((quantity, menuName) => {
      const menuItem = MENUS[menuName];

      totalAmount += menuItem.price * Number(quantity);
    });

    expect(totalAmount).toBe(36000);
  });

  test('주문 내역 배열에 디저트 메뉴가 있으면, 디저트 메뉴의 개수를 반환한다.', () => {
    const orderSheet = new Map([
      ['초코케이크', 1],
      ['아이스크림', 1],
    ]);
    let dessertCount = 0;

    orderSheet.forEach((quantity, menuName) => {
      const menuItem = MENUS[menuName];

      if (menuItem.kind === KINDS.dessert) {
        dessertCount += Number(quantity);
      }
    });

    expect(dessertCount).toBe(2);
  });
});
