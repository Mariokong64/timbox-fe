import { timboxApi } from "../../../../../api/timboxApi";

export interface ValidarComprobantePayload {
  archivo: File;
  captchaToken: string;
}

export async function validarComprobanteFiscal({
  archivo,
  captchaToken,
}: ValidarComprobantePayload): Promise<unknown> {
  const formData = new FormData();
  formData.append("archivo", archivo);
  formData.append("captchaToken", captchaToken);

  const { data } = await timboxApi.post("/validador", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
}
