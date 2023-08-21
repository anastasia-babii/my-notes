import HTTPError from "./http-error";

export default class Unauthorized extends HTTPError {
  constructor(msg: string) {
    super(401, msg);
  }
}
