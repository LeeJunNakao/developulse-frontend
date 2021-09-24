import { validationFn } from "./fns";
export { required, validEmail, maxLength } from "./fns";

export const validate = (value: string, ...fns: validationFn[]): string => {
  const [fn, ...restFns] = fns;
  if (!fn) {
    return "";
  }

  return fn(value) || validate(value, ...restFns);
};
