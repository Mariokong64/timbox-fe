import {
  enviarMensajeChatApi,
  finalizarChatApi,
  listarChatsApi,
  obtenerChatApi,
} from "../api/chatsApi";

export type RemitenteChat = "visitante" | "agente" | "sistema";

export interface MensajeChatPrivado {
  id: string;
  contenido: string;
  remitente: RemitenteChat;
  nombreRemitente: string | null;
  fechaRegistro: string;
}

export interface ChatPrivado {
  id: string;
  nombreVisitante: string;
  correoVisitante: string;
  telefonoVisitante: string | null;
  estatus: string;
  fechaInicio: string;
  fechaFin: string | null;
  fechaUltimaActividad: string;
  ultimoMensaje: string | null;
  mensajes: MensajeChatPrivado[];
}

function esRegistro(valor: unknown): valor is Record<string, unknown> {
  return typeof valor === "object" && valor !== null;
}

function texto(origen: Record<string, unknown>, llave: string): string {
  const valor = origen[llave];
  return typeof valor === "string" ? valor : "";
}

function datos(respuesta: unknown): unknown {
  return esRegistro(respuesta) && "data" in respuesta
    ? respuesta.data
    : respuesta;
}

function normalizarMensaje(valor: unknown): MensajeChatPrivado | null {
  if (!esRegistro(valor)) {
    return null;
  }

  const remitente = texto(valor, "remitente") as RemitenteChat;
  const mensaje: MensajeChatPrivado = {
    id: texto(valor, "id"),
    contenido: texto(valor, "contenido"),
    remitente: ["visitante", "agente", "sistema"].includes(remitente)
      ? remitente
      : "sistema",
    nombreRemitente: texto(valor, "nombreRemitente") || null,
    fechaRegistro: texto(valor, "fechaRegistro"),
  };

  return mensaje.id ? mensaje : null;
}

function normalizarChat(valor: unknown): ChatPrivado | null {
  if (!esRegistro(valor)) {
    return null;
  }

  const mensajes = Array.isArray(valor.mensajes)
    ? valor.mensajes
        .map(normalizarMensaje)
        .filter((mensaje): mensaje is MensajeChatPrivado => Boolean(mensaje))
    : [];
  const chat: ChatPrivado = {
    id: texto(valor, "id"),
    nombreVisitante: texto(valor, "nombreVisitante"),
    correoVisitante: texto(valor, "correoVisitante"),
    telefonoVisitante: texto(valor, "telefonoVisitante") || null,
    estatus: texto(valor, "estatus"),
    fechaInicio: texto(valor, "fechaInicio"),
    fechaFin: texto(valor, "fechaFin") || null,
    fechaUltimaActividad: texto(valor, "fechaUltimaActividad"),
    ultimoMensaje: texto(valor, "ultimoMensaje") || null,
    mensajes,
  };

  return chat.id ? chat : null;
}

export async function listarChats(): Promise<ChatPrivado[]> {
  const valor = datos(await listarChatsApi());

  return Array.isArray(valor)
    ? valor
        .map(normalizarChat)
        .filter((chat): chat is ChatPrivado => Boolean(chat))
    : [];
}

export async function obtenerChat(id: string): Promise<ChatPrivado> {
  const chat = normalizarChat(datos(await obtenerChatApi(id)));

  if (!chat) {
    throw new Error("El servidor no devolvió la conversación.");
  }

  return chat;
}

export async function enviarMensajeChat(
  id: string,
  contenido: string
): Promise<void> {
  await enviarMensajeChatApi(id, contenido.trim());
}

export async function finalizarChat(id: string): Promise<void> {
  await finalizarChatApi(id);
}

export function obtenerErrorChats(error: unknown): string {
  if (
    esRegistro(error) &&
    esRegistro(error.response) &&
    esRegistro(error.response.data)
  ) {
    const mensaje = texto(error.response.data, "message");
    if (mensaje) {
      return mensaje;
    }
  }

  return error instanceof Error
    ? error.message
    : "No fue posible actualizar los chats.";
}
