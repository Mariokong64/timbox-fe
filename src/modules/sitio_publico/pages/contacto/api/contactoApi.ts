import { timboxApi } from "../../../../../api/timboxApi";
import type { ContactoFormularioValores } from "../servicio/contactoServicio";

export async function enviarFormularioContacto(datos: ContactoFormularioValores): Promise<unknown> {
  const { data } = await timboxApi.post("/contacto", datos);
  return data;
}
