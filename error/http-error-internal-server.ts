import HTTPError from "./http-error";
export default class InternalServerError extends HTTPError {
  constructor(msg: string) {
    super(500, msg);
  }
}
