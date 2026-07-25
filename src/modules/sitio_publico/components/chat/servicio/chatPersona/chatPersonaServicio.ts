import {
  crearConversacionChatPersonaApi,
  enviarMensajeChatPersonaApi,
  obtenerConversacionChatPersonaApi,
} from "../../api/chatPersonaApi";
import type {
  ConversacionChatPersona,
  ErroresFormularioChatPersona,
  FormularioChatPersona,
  MensajeChatPersona,
  RemitenteChatPersona,
} from "./chatPersona.types";

const TOKEN_CHAT_PERSONA = "timboxChatPersonaToken";
const CORREO_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const chatPersonaDisponible = true;
export const LIMITE_MENSAJE_CHAT_PERSONA = 2000;
export const formularioChatPersonaInicial: FormularioChatPersona = {
  nombre: "",
  correo: "",
  telefono: "",
  mensaje: "",
};

function esRegistro(valor: unknown): valor is Record<string, unknown> {
  return typeof valor === "object" && valor !== null;
}

function texto(origen: Record<string, unknown>, llave: string): string {
  const valor = origen[llave];
  return typeof valor === "string" ? valor : "";
}

function normalizarMensaje(valor: unknown): MensajeChatPersona | null {
  if (!esRegistro(valor)) {
    return null;
  }

  const remitente = texto(valor, "remitente") as RemitenteChatPersona;
  const mensaje: MensajeChatPersona = {
    id: texto(valor, "id"),
    contenido: texto(valor, "contenido"),
    remitente: ["visitante", "agente", "sistema"].includes(remitente)
      ? remitente
      : "sistema",
    nombreRemitente: texto(valor, "nombreRemitente") || null,
    fechaRegistro: texto(valor, "fechaRegistro"),
  };

  return mensaje.id && mensaje.contenido ? mensaje : null;
}

function extraerDatos(respuesta: unknown): unknown {
  return esRegistro(respuesta) && "data" in respuesta
    ? respuesta.data
    : respuesta;
}

function normalizarConversacion(respuesta: unknown): ConversacionChatPersona {
  const valor = extraerDatos(respuesta);

  if (!esRegistro(valor)) {
    throw new Error("El servidor no devolvió una conversación válida.");
  }

  const mensajes = Array.isArray(valor.mensajes)
    ? valor.mensajes
        .map(normalizarMensaje)
        .filter((mensaje): mensaje is MensajeChatPersona => Boolean(mensaje))
    : [];
  const conversacion: ConversacionChatPersona = {
    id: texto(valor, "id"),
    nombreVisitante: texto(valor, "nombreVisitante"),
    correoVisitante: texto(valor, "correoVisitante"),
    telefonoVisitante: texto(valor, "telefonoVisitante") || null,
    estatus: texto(valor, "estatus"),
    fechaInicio: texto(valor, "fechaInicio"),
    fechaFin: texto(valor, "fechaFin") || null,
    fechaUltimaActividad: texto(valor, "fechaUltimaActividad"),
    mensajes,
  };

  if (!conversacion.id) {
    throw new Error("El servidor no devolvió una conversación válida.");
  }

  return conversacion;
}

export function obtenerTokenChatPersona(): string | null {
  return localStorage.getItem(TOKEN_CHAT_PERSONA);
}

export function eliminarTokenChatPersona(): void {
  localStorage.removeItem(TOKEN_CHAT_PERSONA);
}

export function validarFormularioChatPersona(
  formulario: FormularioChatPersona
): ErroresFormularioChatPersona {
  const errores: ErroresFormularioChatPersona = {};

  if (formulario.nombre.trim().length < 2) {
    errores.nombre = "Escribe tu nombre.";
  }

  if (!CORREO_REGEX.test(formulario.correo.trim())) {
    errores.correo = "Escribe un correo electrónico válido.";
  }

  const telefono = formulario.telefono.trim();
  if (telefono && (telefono.length < 7 || telefono.length > 20)) {
    errores.telefono = "Escribe un teléfono válido.";
  }

  const mensaje = formulario.mensaje.trim();
  if (!mensaje) {
    errores.mensaje = "Cuéntanos brevemente en qué podemos ayudarte.";
  } else if (mensaje.length > LIMITE_MENSAJE_CHAT_PERSONA) {
    errores.mensaje = `El mensaje no debe superar ${LIMITE_MENSAJE_CHAT_PERSONA} caracteres.`;
  }

  return errores;
}

export function formularioChatPersonaValido(
  errores: ErroresFormularioChatPersona
): boolean {
  return Object.values(errores).every((error) => !error);
}

export async function iniciarConversacionChatPersona(
  formulario: FormularioChatPersona
): Promise<ConversacionChatPersona> {
  const respuesta = await crearConversacionChatPersonaApi({
    nombre: formulario.nombre.trim(),
    correo: formulario.correo.trim().toLowerCase(),
    telefono: formulario.telefono.trim(),
    mensaje: formulario.mensaje.trim(),
  });
  const datos = extraerDatos(respuesta);

  if (!esRegistro(datos)) {
    throw new Error("El servidor no devolvió la sesión del chat.");
  }

  const token = texto(datos, "token");
  if (!token) {
    throw new Error("El servidor no devolvió el identificador del chat.");
  }

  localStorage.setItem(TOKEN_CHAT_PERSONA, token);
  return normalizarConversacion(datos.conversacion);
}

export async function recuperarConversacionChatPersona(): Promise<
  ConversacionChatPersona | null
> {
  const token = obtenerTokenChatPersona();

  if (!token) {
    return null;
  }

  try {
    return normalizarConversacion(
      await obtenerConversacionChatPersonaApi(token)
    );
  } catch (error: unknown) {
    if (
      esRegistro(error) &&
      esRegistro(error.response) &&
      [401, 404].includes(Number(error.response.status))
    ) {
      eliminarTokenChatPersona();
      return null;
    }

    throw error;
  }
}

export async function enviarMensajeChatPersona(
  contenido: string
): Promise<MensajeChatPersona> {
  const token = obtenerTokenChatPersona();
  const mensaje = contenido.trim();

  if (!token) {
    throw new Error("La sesión del chat no está disponible.");
  }

  if (!mensaje) {
    throw new Error("Escribe un mensaje.");
  }

  const valor = extraerDatos(
    await enviarMensajeChatPersonaApi(token, mensaje)
  );
  const normalizado = normalizarMensaje(valor);

  if (!normalizado) {
    throw new Error("El servidor no devolvió el mensaje enviado.");
  }

  return normalizado;
}

export function obtenerMensajeErrorChatPersona(error: unknown): string {
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
    : "No fue posible conectar con el equipo de TIMBOX.";
}
