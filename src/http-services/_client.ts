import Axios, { AxiosResponse, AxiosInstance } from "axios";

const makeClient = (client: AxiosInstance) => ({
  async get<Type>(url: string): Promise<AxiosResponse<Type>> {
    return client.get(url);
  },
  async post<Type>(url: string, data: any): Promise<AxiosResponse<Type>> {
    console.log("POST!!", url, data);
    return client.post(url, data);
  },
});

const axios = Axios.create({
  baseURL: process.env.VUE_APP_CONTACT_URL,
  headers: { token: localStorage.getItem("token") },
});

export const client = makeClient(axios);
