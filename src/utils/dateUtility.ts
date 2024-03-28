export class DateUtility {
  static today = new Date();

  static getTomorrow(date: Date = this.today) {
    const nextDay = date;
    nextDay.setDate(nextDay.getDate() + 1);
    return nextDay;
  }
}
