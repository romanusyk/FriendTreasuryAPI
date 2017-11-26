export class DateHelper {
  static currentUnixTime() {
    return Math.floor(Date.now() / 1000);
  }
  static currentDate(){
    return new Date(Date.now());
  }
}
