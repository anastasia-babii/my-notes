import { ValidationError } from "class-validator";
export default class ValidationHTTPError {
  status: number;
  message: string;

  constructor(errors: ValidationError[] | ValidationError | string) {
    const errorArray = Array.isArray(errors) ? errors : [errors];
    const errorMessages = errorArray.flatMap((error: ValidationError) =>
      Object.values(error.constraints)
    );
    const allErrorMessages = errorMessages.join(",\r\n- ");
    this.message = `Validation errors: \r\n- ${allErrorMessages}`;
    this.status = 422;
  }
}
