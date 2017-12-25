export class Error {
  public messages: string[];
  public key: string;
}

export class ErrorsList {
  private errors: Error[];

  constructor() {
    this.clear();
  }

  public clear() {
    this.errors = [];
  }

  public isEmpty(): boolean {
    return !(!!this.errors && this.errors.length > 0);
  }

  public get(key: string, separator = '. '): string {
    const err = this.errors.find(p => p.key === key);
    if (!err) {
      return '';
    }
    return err.messages.join(separator);
  }

  public push(key: string, message: string) {
    const err = this.errors.find(e => e.key === key);
    if (!!err) {
      err.messages.push(message);
    } else {
      this.errors.push({ messages: [message], key: key });
    }
  }
}
