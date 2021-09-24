import { validationFn } from "./fns";
export { required, validEmail, maxLength } from "./fns";

export const validator = (value: string, ...fns: validationFn[]): boolean => {
  const result = fns.map((fn) => fn(value));
  const isValid = result.every((i) => i);

  return isValid;
};
