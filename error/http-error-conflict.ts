import HTTPError from "./http-error";
export default class ConflictError extends HTTPError {
  constructor(msg: string) {
    super(409, msg);
  }
}
