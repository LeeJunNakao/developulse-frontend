import { client } from "./_client";

interface SubmitContactResponse {
  message: string;
}

interface ContactData {
  Name: string;
  Address: string;
  Address2: string;
  City: string;
  Province: string;
  Email: string;
}

export async function submitContact(
  data: ContactData
): Promise<SubmitContactResponse> {
  const response = await client.post<SubmitContactResponse>("", data);
  return response.data;
}
