import { errorMessages } from "./error-messages";
export type validationFn = (value: string) => string;

export const required = (value: string): string =>
  value ? "" : errorMessages.required();

export const maxLength =
  (length: number): validationFn =>
  (value: string): string =>
    value.length <= length ? "" : errorMessages.maxLength(length);

export const validEmail: validationFn = (value: string): string => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(value).toLowerCase()) ? "" : errorMessages.validEmail();
};
