import axios from "axios";

interface HttpResponse<T> {
  status: number;
  data: T;
}

export const post = async <Type>(
  url: string,
  data: any
): Promise<HttpResponse<Type>> => {
  return axios.post(url, data);
};

export const get = async <Type>(url: string): Promise<HttpResponse<Type>> => {
  return axios.get(url);
};
