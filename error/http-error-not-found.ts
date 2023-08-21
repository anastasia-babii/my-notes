import HTTPError from "./http-error";
export default class NotFoundError extends HTTPError {
  constructor(msg: string) {
    super(404, msg);
  }
}
