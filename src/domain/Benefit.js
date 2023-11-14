import { DAYS, DISCOUNT, EVENTS, NAMES } from '../constants/events.js';
import { MENUS } from '../constants/menus.js';
import { OUTPUT_MESSAGE } from '../constants/texts.js';

class Benefit {
  #visitDay;
  #benefitSheet;

  constructor(visitDay) {
    this.#visitDay = visitDay;
    this.#benefitSheet = new Map([
      [EVENTS.season.name, 0],
      [EVENTS.special.name, 0],
      [EVENTS.weekday.name, 0],
      [EVENTS.weekend.name, 0],
      [EVENTS.gift.name, 0],
    ]);
  }

  hasGift() {
    if (this.#benefitSheet.get(EVENTS.gift.name) === 0) {
      return EVENTS.none;
    }

    return OUTPUT_MESSAGE.gift;
  }

  calcaulteTotalBenefit() {
    let totalBenefit = 0;

    this.#benefitSheet.forEach(discount => {
      totalBenefit += discount;
    });

    return totalBenefit;
  }

  processBenefitDetails() {
    let benefitDetails = '';

    if (this.hasNoneDiscounts()) {
      return EVENTS.none;
    }

    this.#benefitSheet.forEach((discount, eventType) => {
      if (discount !== 0) {
        benefitDetails += OUTPUT_MESSAGE.details(eventType, discount);
      }
    });

    return benefitDetails;
  }

  hasNoneDiscounts() {
    const noneDiscount = [...this.#benefitSheet.values()].every(
      discount => discount === 0,
    );

    return noneDiscount;
  }

  createBenefitSheet(totalAmount, { dessertCount, mainCount }) {
    const events = Object.keys(EVENTS);

    events.forEach(eventType => {
      if (totalAmount >= EVENTS[eventType].condition) {
        const discount = this.calculateDiscount(eventType, {
          dessertCount,
          mainCount,
        });
        this.#benefitSheet.set(EVENTS[eventType].name, discount);
      }
    });

    return this.processBenefitDetails();
  }

  calculateDiscount(eventType, { dessertCount, mainCount }) {
    let discount = 0;

    discount -= this.calculateSeasonDiscount(eventType);
    discount -= this.calculateWeekdayDiscount(eventType) * dessertCount;
    discount -= this.calculateWeekendDiscount(eventType) * mainCount;
    discount -= this.calculateSpecialDiscount(eventType);
    discount -= this.calculateGiftDiscount(eventType);

    return discount;
  }

  calculateSeasonDiscount(eventType) {
    let seasonDiscount = 0;
    const seasonMap = this.#checkSeason();

    if (seasonMap.has(this.#visitDay) && eventType === NAMES.season) {
      seasonDiscount += seasonMap.get(this.#visitDay);
    }

    return seasonDiscount;
  }

  #checkSeason() {
    const discounts = new Map();
    const seasonDays = DAYS.season;
    let amount = DISCOUNT.seasonStart;

    Array.from({ length: seasonDays }, (_, day) => {
      discounts.set(day + 1, amount);
      amount += DISCOUNT.seasonAddDay;
    });

    return discounts;
  }

  calculateWeekdayDiscount(eventType) {
    let weekdayDiscount = 0;

    if (!DAYS.weekend.includes(this.#visitDay) && eventType === NAMES.weekday) {
      weekdayDiscount += DISCOUNT.weekday;
    }
    return weekdayDiscount;
  }

  calculateWeekendDiscount(eventType) {
    let weekendDiscount = 0;

    if (DAYS.weekend.includes(this.#visitDay) && eventType === NAMES.weekend) {
      weekendDiscount += DISCOUNT.weekend;
    }

    return weekendDiscount;
  }

  calculateSpecialDiscount(eventType) {
    let specialDiscount = 0;

    if (DAYS.special.includes(this.#visitDay) && eventType === NAMES.special) {
      specialDiscount += DISCOUNT.special;
    }

    return specialDiscount;
  }

  calculateGiftDiscount(eventType) {
    let giftDiscount = 0;

    if (eventType === NAMES.gift) {
      giftDiscount += MENUS[EVENTS[eventType].item].price;
    }

    return giftDiscount;
  }
}

export default Benefit;
