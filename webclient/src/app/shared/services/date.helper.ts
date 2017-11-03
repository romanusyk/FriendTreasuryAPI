export class DateHelper {
  static currentUnixTime() {
    return Math.floor(Date.now() / 1000);
  }
}
