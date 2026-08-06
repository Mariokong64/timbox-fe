import { apiPrivada } from "../../../api/apiPrivada";
import type { EdicionEnlace } from "../servicio/enlacesServicio";

const ruta = "/gestion-url";

export async function obtenerSeccionesApi(): Promise<unknown> {
  return (await apiPrivada.get(`${ruta}/secciones`)).data;
}

export async function obtenerEnlacesApi(
  seccionId?: string,
  busqueda?: string
): Promise<unknown> {
  return (
    await apiPrivada.get(ruta, {
      params: { seccionId: seccionId || undefined, busqueda: busqueda || undefined },
    })
  ).data;
}

export async function actualizarEnlaceApi(
  id: string,
  datos: EdicionEnlace
): Promise<unknown> {
  return (await apiPrivada.put(`${ruta}/${id}`, datos)).data;
}
