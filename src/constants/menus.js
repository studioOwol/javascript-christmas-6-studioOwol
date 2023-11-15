const KINDS = {
  main: 'main',
  drink: 'drink',
  dessert: 'dessert',
  appetizer: 'appetizer',
};

const MENUS = Object.freeze({
  양송이수프: {
    kind: KINDS.appetizer,
    price: 6000,
  },
  타파스: {
    kind: KINDS.appetizer,
    price: 5500,
  },
  시저샐러드: {
    kind: KINDS.appetizer,
    price: 8000,
  },
  티본스테이크: {
    kind: KINDS.main,
    price: 55000,
  },
  바비큐립: {
    kind: KINDS.main,
    price: 54000,
  },
  해산물파스타: {
    kind: KINDS.main,
    price: 35000,
  },
  크리스마스파스타: {
    kind: KINDS.main,
    price: 25000,
  },
  초코케이크: {
    kind: KINDS.dessert,
    price: 15000,
  },
  아이스크림: {
    kind: KINDS.dessert,
    price: 5000,
  },
  제로콜라: {
    kind: KINDS.drink,
    price: 3000,
  },
  레드와인: {
    kind: KINDS.drink,
    price: 60000,
  },
  샴페인: {
    kind: KINDS.drink,
    price: 25000,
  },
});

const MENU_RULE = Object.freeze({
  min: 1,
  max: 20,
});

export { MENUS, KINDS, MENU_RULE };
