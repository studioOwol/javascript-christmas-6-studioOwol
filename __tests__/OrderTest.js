import { KINDS, MENUS } from '../src/constants/menus.js';
import { OUTPUT_MESSAGE } from '../src/constants/texts.js';

describe('Order', () => {
  let orderSheet = new Map();

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

  test('메뉴를 입력하면, 메뉴 이름과 개수로 분리한다.', () => {
    const orders = ['타파스-2', '샴페인-1'];

    orders.forEach(order => {
      const [menuName, quantity] = order.split('-');
      orderSheet.set(menuName, Number(quantity));
    });

    expect(orderSheet.get('타파스')).toBe(2);
  });

  test.each([['타파스 2개'], ['샴페인 1개']])(
    '주문 내역 Map의 메뉴 이름과 개수를 문자열로 묶어 반환한다.',
    order => {
      let orderDetails = '';

      orderSheet.forEach((count, menuName) => {
        if (count !== 0) {
          orderDetails += OUTPUT_MESSAGE.menus(menuName, count);
        }
      });

      expect(orderDetails).toContain(order);
    },
  );

  test('주문 내역 Map으로 총주문 금액을 계산한다.', () => {
    let totalAmount = 0;

    orderSheet.forEach((quantity, menuName) => {
      const menuItem = MENUS[menuName];

      totalAmount += menuItem.price * Number(quantity);
    });

    expect(totalAmount).toBe(36000);
  });

  test('주문 내역에 디저트 메뉴가 있으면, 디저트 메뉴의 개수를 반환한다.', () => {
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
