export class DateHelper {
  public static currentUnixTime() {
    return Math.floor(Date.now() / 1000);
  }
  public static currentDate() {
    return new Date(Date.now());
  }
}
