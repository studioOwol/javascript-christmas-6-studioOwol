import { ERROR } from '../src/constants/errors.js';
import CustomError from '../src/utils/CustomError.js';
import { KINDS, MENUS } from '../src/constants/menus.js';
import { PERIOD } from '../src/constants/events.js';

describe('Validator', () => {
  describe('orderValidator', () => {
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

      const hasNoneDrinkOrder = orders.some(order => {
        const menuName = order.split('-')[0];
        const menuItem = MENUS[menuName];
        return menuItem?.kind !== KINDS.drink;
      });

      expect(() => {
        if (!hasNoneDrinkOrder) {
          throw new CustomError(ERROR.hasDrinkOnly);
        }
      }).toThrow();
    });
  });

  describe('formValidator', () => {
    function isNumber(number) {
      return /^\d+$/.test(number);
    }

    test('방문 날짜를 입력하면, 숫자인지 확인한다.', () => {
      const visitDay = 'a';

      expect(() => {
        if (!isNumber(visitDay)) {
          throw new CustomError(ERROR.invalidDay);
        }
      }).toThrow();
    });

    test('방문 날짜를 입력하면, 이벤트 기간 범위인지 확인한다.', () => {
      const visitDay = 32;

      expect(() => {
        if (visitDay < PERIOD.min || visitDay > PERIOD.max) {
          throw new CustomError(ERROR.invalidDay);
        }
      }).toThrow();
    });

    test('메뉴를 입력하면, 주문 형식과 일치하는지 확인한다.', () => {
      const order = '양송이수프-a';
      const trimmedOrder = order.trim().replace(/\s/g, '');

      expect(() => {
        const parts = trimmedOrder.split(',');

        parts.forEach(part => {
          const [menuName, quantity] = part.split('-');
          if (!menuName || Number(quantity) < 1 || isNaN(quantity)) {
            throw new CustomError(ERROR.invalidOrder);
          }
        });
      }).toThrow();
    });
  });
});
