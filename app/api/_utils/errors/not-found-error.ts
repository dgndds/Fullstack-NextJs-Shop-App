import { BaseError } from "./base-error";

export class NotFoundError extends BaseError {
  propertyName: string;

  constructor(propertyName: string) {
    super(404, `${propertyName} is not found.`);

    this.propertyName = propertyName;
  }
}
