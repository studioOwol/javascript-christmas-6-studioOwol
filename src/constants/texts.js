import { EVENTS } from './events.js';

const INPUT_MESSAGE = {
  visitDay:
    '12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)\n',
  orders:
    '주문하실 메뉴를 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)\n',
};

const OUTPUT_MESSAGE = {
  preview: '12월 3일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!',
  menus: (menuName, count) => `${menuName} ${count}개`,
  totalAmount: totalAmount => `${totalAmount.toLocaleString()}원`,
  gift: `${EVENTS.gift.item} ${EVENTS.gift.count}개`,
  details: (eventType, discount) =>
    `${eventType}: ${discount.toLocaleString()}원\n`,
  totalBenefit: totalBenefit => `${totalBenefit.toLocaleString()}원`,
  payment: payment => `${payment.toLocaleString()}원`,
};

const TITLE = {
  menu: '\n<주문 메뉴>',
  totalAmount: '\n<할인 전 총주문 금액>',
  gift: '\n<증정 메뉴>',
  details: '\n<혜택 내역>',
  totalBenefit: '\n<총혜택 금액>',
  payment: '\n<할인 후 예상 결제 금액>',
  badge: '\n<12월 이벤트 배지>',
};

export { INPUT_MESSAGE, OUTPUT_MESSAGE, TITLE };
