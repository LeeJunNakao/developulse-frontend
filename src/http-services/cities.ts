import { client } from "./_client";

interface GetCitiesResponse {
  Items: string[];
}

export const getCities = async (
  provinceCode: string
): Promise<GetCitiesResponse> => {
  const url = `${process.env.VUE_APP_CITIES_URL}?province=${provinceCode}`;
  const response = await client.get<GetCitiesResponse>(url);
  return response.data;
};
