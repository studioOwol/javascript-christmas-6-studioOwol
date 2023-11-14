const ERROR = Object.freeze({
  prefix: message => `[ERROR] ${message}`,
  invalidDay: '유효하지 않은 날짜입니다. 다시 입력해 주세요.',
  invalidOrder: '유효하지 않은 주문입니다. 다시 입력해 주세요.',
  exceedOrder: '메뉴는 한 번에 최대 20개까지만 주문할 수 있습니다.',
  hasDrinkOnly: '음료 메뉴만 주문하실 수 없습니다.',
});

export { ERROR };
