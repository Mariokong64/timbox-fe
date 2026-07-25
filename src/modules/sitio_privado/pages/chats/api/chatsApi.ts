import { apiPrivada } from "../../../api/apiPrivada";

const RUTA = "/chat-persona/conversaciones";

export async function listarChatsApi(): Promise<unknown> {
  return (await apiPrivada.get(RUTA)).data;
}

export async function obtenerChatApi(id: string): Promise<unknown> {
  return (await apiPrivada.get(`${RUTA}/${id}`)).data;
}

export async function enviarMensajeChatApi(
  id: string,
  contenido: string
): Promise<unknown> {
  return (await apiPrivada.post(`${RUTA}/${id}/mensajes`, { contenido })).data;
}

export async function finalizarChatApi(id: string): Promise<unknown> {
  return (await apiPrivada.post(`${RUTA}/${id}/finalizar`)).data;
}
