export type validationFn = (value: string, ...fns: any) => boolean;

export const required: validationFn = (value: string): boolean =>
  Boolean(value);
export const maxLength: validationFn = (
  value: string,
  length: number
): boolean => value.length <= length;
export const validEmail: validationFn = (value: string): boolean => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(value).toLowerCase());
};
