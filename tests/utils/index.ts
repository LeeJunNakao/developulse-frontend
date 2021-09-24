import { DOMWrapper, VueWrapper } from "@vue/test-utils";

export const dataTestGetter = (
  wrapper: VueWrapper<any>,
  name: string
): DOMWrapper<any> => wrapper.get(`[data-test='${name}']`) as DOMWrapper<any>;

export const getElement = (
  wrapper: VueWrapper<any>,
  name: string
): DOMWrapper<any> => wrapper.get(name) as DOMWrapper<any>;

export const getAttribute = (
  wrapper: VueWrapper<any> | DOMWrapper<any>,
  name: string,
  attribute: string
): any => wrapper.get(name).attributes()[attribute];

export const setData = (
  wrapper: DOMWrapper<any>,
  name: string,
  value: any
): void => {
  wrapper.get(name).setValue(value);
};
