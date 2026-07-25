import { timboxApi } from "../../../../../api/timboxApi";

const RUTA_CHAT_PERSONA = "/chat-persona";

export interface DatosInicioChatPersonaApi {
  nombre: string;
  correo: string;
  telefono: string;
  mensaje: string;
}

export async function crearConversacionChatPersonaApi(
  datos: DatosInicioChatPersonaApi
): Promise<unknown> {
  const respuesta = await timboxApi.post(
    `${RUTA_CHAT_PERSONA}/conversaciones`,
    datos
  );

  return respuesta.data;
}

export async function obtenerConversacionChatPersonaApi(
  token: string
): Promise<unknown> {
  const respuesta = await timboxApi.get(`${RUTA_CHAT_PERSONA}/conversacion`, {
    headers: { "X-Chat-Token": token },
  });

  return respuesta.data;
}

export async function enviarMensajeChatPersonaApi(
  token: string,
  contenido: string
): Promise<unknown> {
  const respuesta = await timboxApi.post(
    `${RUTA_CHAT_PERSONA}/mensajes`,
    { contenido },
    { headers: { "X-Chat-Token": token } }
  );

  return respuesta.data;
}
