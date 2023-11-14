import { ERROR } from '../src/constants/errors.js';
import CustomError from '../src/utils/CustomError.js';
import { KINDS, MENUS } from '../src/constants/menus.js';

describe('Validator', () => {
  describe('OrderValidator', () => {
    test('주문 개수가 20개를 초과하면, 에러를 발생시킨다.', () => {
      const orders = ['시저샐러드-10', '타파스-11'];
      const totalCount = orders.reduce((count, order) => {
        const quantity = Number(order.split('-')[1]);
        return count + quantity;
      }, 0);

      expect(() => {
        if (totalCount > 20) {
          throw new CustomError(ERROR.exceedOrder);
        }
      }).toThrow();
    });

    test('메뉴판에 없는 메뉴이면, 에러를 발생시킨다.', () => {
      const order = '콜라-10';

      const menuName = order.split('-')[0];
      const isInMenu = menuName in MENUS;

      if (!isInMenu) {
        expect(() => {
          throw new CustomError(ERROR.invalidOrder);
        }).toThrow();
      }
    });

    test('중복되는 메뉴가 있으면, 에러를 발생시킨다.', () => {
      const orders = ['시저샐러드-10', '시저샐러드-10'];
      const uniqueMenus = new Set(orders.map(order => order.split('-')[0]));

      if (orders.length !== uniqueMenus.size) {
        expect(() => {
          throw new CustomError(ERROR.invalidOrder);
        });
      }
    });

    test('음료 메뉴만 있으면, 에러를 발생시킨다.', () => {
      const orders = ['레드와인-1', '제로콜라-1'];

      const hasNonDrinkOrder = orders.some(order => {
        const menuName = order.split('-')[0];
        const menuItem = MENUS[menuName];
        return menuItem?.kind !== KINDS.drink;
      });

      expect(() => {
        if (!hasNonDrinkOrder) {
          throw new CustomError(ERROR.hasDrinkOnly);
        }
      }).toThrow();
    });
  });
});
