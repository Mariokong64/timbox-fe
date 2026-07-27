import { apiPrivada } from "../../../api/apiPrivada";
import type { RecursoFormulario, TipoRecurso } from "../servicio/contenidosServicio";

function ruta(tipo: TipoRecurso): string {
  return tipo === "contenido" ? "/gestion-contenido" : "/gestion-url";
}

export async function obtenerSeccionesApi(tipo: TipoRecurso): Promise<unknown> {
  return (await apiPrivada.get(`${ruta(tipo)}/secciones`)).data;
}

export async function obtenerRecursosApi(
  tipo: TipoRecurso,
  seccionId?: string,
  busqueda?: string
): Promise<unknown> {
  return (
    await apiPrivada.get(ruta(tipo), {
      params: { seccionId: seccionId || undefined, busqueda: busqueda || undefined },
    })
  ).data;
}

export async function crearRecursoApi(tipo: TipoRecurso, datos: RecursoFormulario): Promise<unknown> {
  return (await apiPrivada.post(ruta(tipo), datos)).data;
}

export async function actualizarRecursoApi(
  tipo: TipoRecurso,
  id: string,
  datos: RecursoFormulario
): Promise<unknown> {
  return (await apiPrivada.put(`${ruta(tipo)}/${id}`, datos)).data;
}

export async function eliminarRecursoApi(tipo: TipoRecurso, id: string): Promise<unknown> {
  return (await apiPrivada.delete(`${ruta(tipo)}/${id}`)).data;
}
