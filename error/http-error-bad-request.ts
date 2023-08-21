import HTTPError from "./http-error";
export default class BadRequestError extends HTTPError {
  constructor(msg: string) {
    super(400, msg);
  }
}
