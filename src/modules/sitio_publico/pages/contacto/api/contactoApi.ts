import { timboxApi } from "../../../../../api/timboxApi";

export interface ContactoPayloadApi {
  nombre: string;
  correo: string;
  telefono: string;
  rfc: string;
  mensaje: string;
  captchaToken: string;
}

export async function enviarContacto(payload: ContactoPayloadApi): Promise<unknown> {
  const { data } = await timboxApi.post("/contacto", payload);

  return data;
}
