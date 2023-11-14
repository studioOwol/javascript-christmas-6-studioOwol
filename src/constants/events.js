const DAYS = Object.freeze({
  season: 25,
  weekend: [1, 2, 8, 9, 15, 16, 22, 23, 29, 30],
  special: [3, 10, 17, 24, 25, 31],
});

const NAMES = Object.freeze({
  season: 'season',
  weekday: 'weekday',
  weekend: 'weekend',
  special: 'special',
  gift: 'gift',
});

const DISCOUNT = Object.freeze({
  minimum: 10000,
  seasonStart: 1000,
  seasonAddDay: 100,
  weekday: 2023,
  weekend: 2023,
  special: 1000,
});

const PERIOD = Object.freeze({
  min: 1,
  max: 31,
});

const EVENTS = Object.freeze({
  none: '없음',
  season: {
    name: '크리스마스 디데이 할인',
    condition: 10000,
  },
  weekday: {
    name: '평일 할인',
    condition: 10000,
  },
  weekend: {
    name: '주말 할인',
    condition: 10000,
  },
  special: {
    name: '특별 할인',
    condition: 10000,
  },
  gift: {
    name: '증정 이벤트',
    condition: 120000,
    item: '샴페인',
    count: 1,
  },
});

export { DAYS, DISCOUNT, PERIOD, EVENTS, NAMES };
