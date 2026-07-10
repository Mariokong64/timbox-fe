import { timboxApi } from "../../../../../api/timboxApi";

const BASE_URL = "/validador";

export async function enviarFormDataValidador(formData: FormData): Promise<unknown> {
  const { data } = await timboxApi.post(BASE_URL, formData);

  return data;
}
