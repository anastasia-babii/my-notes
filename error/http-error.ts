export default class HTTPError {
  status: number;
  message: string;
  originalErr?: Error;
  constructor(status: number, message: string, originalErr?: Error) {
    this.originalErr = originalErr;
    this.status = status;
    this.message = message;
  }
}
