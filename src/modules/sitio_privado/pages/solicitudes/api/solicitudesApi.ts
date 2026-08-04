import { apiPrivada } from "../../../api/apiPrivada";
import type {
  EstadoFiltroSolicitud,
  OrigenSolicitud,
} from "../servicio/solicitudes.types";

const RUTA_FORMULARIOS = "/contacto/solicitudes";
const RUTA_CHATS = "/chat-persona/conversaciones";

export async function listarSolicitudesApi(
  origen: OrigenSolicitud,
  estado: EstadoFiltroSolicitud
): Promise<unknown> {
  const ruta = origen === "formulario" ? RUTA_FORMULARIOS : RUTA_CHATS;

  return (await apiPrivada.get(ruta, { params: { estado } })).data;
}

export async function obtenerSolicitudFormularioApi(
  id: string
): Promise<unknown> {
  return (await apiPrivada.get(`${RUTA_FORMULARIOS}/${id}`)).data;
}

export async function guardarRespuestaSolicitudFormularioApi(
  id: string,
  respuesta: string
): Promise<unknown> {
  return (
    await apiPrivada.post(`${RUTA_FORMULARIOS}/${id}/respuestas`, {
      respuesta,
    })
  ).data;
}

export async function cerrarSolicitudFormularioApi(
  id: string
): Promise<unknown> {
  return (await apiPrivada.post(`${RUTA_FORMULARIOS}/${id}/cerrar`)).data;
}

export async function obtenerSolicitudChatApi(id: string): Promise<unknown> {
  return (await apiPrivada.get(`${RUTA_CHATS}/${id}`)).data;
}

export async function enviarMensajeSolicitudChatApi(
  id: string,
  contenido: string
): Promise<unknown> {
  return (
    await apiPrivada.post(`${RUTA_CHATS}/${id}/mensajes`, { contenido })
  ).data;
}

export async function finalizarSolicitudChatApi(
  id: string
): Promise<unknown> {
  return (await apiPrivada.post(`${RUTA_CHATS}/${id}/finalizar`)).data;
}

export async function eliminarSolicitudChatApi(id: string): Promise<unknown> {
  return (await apiPrivada.delete(`${RUTA_CHATS}/${id}`)).data;
}
