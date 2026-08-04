import {
  cerrarSolicitudFormularioApi,
  eliminarSolicitudChatApi,
  enviarMensajeSolicitudChatApi,
  finalizarSolicitudChatApi,
  guardarRespuestaSolicitudFormularioApi,
  listarSolicitudesApi,
  obtenerSolicitudChatApi,
  obtenerSolicitudFormularioApi,
} from "../api/solicitudesApi";
import type {
  EstadoAtencionSolicitud,
  EstadoFiltroSolicitud,
  MensajeSolicitudChat,
  OrigenSolicitud,
  ResultadoGuardarRespuestaFormulario,
  RespuestaSolicitudFormulario,
  RemitenteSolicitudChat,
  SolicitudChatDetalle,
  SolicitudFormularioDetalle,
  SolicitudResumen,
} from "./solicitudes.types";

function esRegistro(valor: unknown): valor is Record<string, unknown> {
  return typeof valor === "object" && valor !== null;
}

function datos(respuesta: unknown): unknown {
  return esRegistro(respuesta) && "data" in respuesta
    ? respuesta.data
    : respuesta;
}

function texto(origen: Record<string, unknown>, llave: string): string {
  const valor = origen[llave];
  return typeof valor === "string" ? valor : "";
}

function numero(origen: Record<string, unknown>, llave: string): number {
  const valor = Number(origen[llave] ?? 0);
  return Number.isFinite(valor) ? valor : 0;
}

function estadoAtencion(
  origen: Record<string, unknown>
): EstadoAtencionSolicitud {
  const estado = texto(origen, "estadoAtencion");

  return ["por_atender", "en_atencion", "cerrada"].includes(estado)
    ? (estado as EstadoAtencionSolicitud)
    : "por_atender";
}

function normalizarFormulario(
  valor: unknown
): SolicitudFormularioDetalle | null {
  if (!esRegistro(valor)) {
    return null;
  }

  const respuestas = Array.isArray(valor.respuestas)
    ? valor.respuestas
        .map(normalizarRespuestaFormulario)
        .filter(
          (
            respuesta
          ): respuesta is RespuestaSolicitudFormulario =>
            Boolean(respuesta)
        )
    : [];
  const solicitud: SolicitudFormularioDetalle = {
    id: texto(valor, "id"),
    nombre: texto(valor, "nombre"),
    correo: texto(valor, "correo"),
    telefono: texto(valor, "telefono") || null,
    rfc: texto(valor, "rfc") || null,
    mensaje: texto(valor, "mensaje") || null,
    estatus: texto(valor, "estatus"),
    estadoAtencion: estadoAtencion(valor),
    fechaRegistro: texto(valor, "fechaRegistro"),
    respuestas,
  };

  return solicitud.id ? solicitud : null;
}

function normalizarRespuestaFormulario(
  valor: unknown
): RespuestaSolicitudFormulario | null {
  if (!esRegistro(valor)) {
    return null;
  }

  const respuesta: RespuestaSolicitudFormulario = {
    id: texto(valor, "id"),
    detalles: texto(valor, "detalles"),
    fechaAtencion: texto(valor, "fechaAtencion"),
    usuarioId: texto(valor, "usuarioId"),
    nombreUsuario: texto(valor, "nombreUsuario"),
  };

  return respuesta.id ? respuesta : null;
}

function normalizarMensaje(valor: unknown): MensajeSolicitudChat | null {
  if (!esRegistro(valor)) {
    return null;
  }

  const remitente = texto(valor, "remitente") as RemitenteSolicitudChat;
  const mensaje: MensajeSolicitudChat = {
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

function normalizarChat(valor: unknown): SolicitudChatDetalle | null {
  if (!esRegistro(valor)) {
    return null;
  }

  const mensajes = Array.isArray(valor.mensajes)
    ? valor.mensajes
        .map(normalizarMensaje)
        .filter((mensaje): mensaje is MensajeSolicitudChat => Boolean(mensaje))
    : [];
  const chat: SolicitudChatDetalle = {
    id: texto(valor, "id"),
    nombreVisitante: texto(valor, "nombreVisitante"),
    correoVisitante: texto(valor, "correoVisitante"),
    telefonoVisitante: texto(valor, "telefonoVisitante") || null,
    estatus: texto(valor, "estatus"),
    estadoAtencion: estadoAtencion(valor),
    fechaInicio: texto(valor, "fechaInicio"),
    fechaFin: texto(valor, "fechaFin") || null,
    fechaUltimaActividad: texto(valor, "fechaUltimaActividad"),
    cantidadMensajes: numero(valor, "cantidadMensajes"),
    ultimaFechaMensajeVisitante:
      texto(valor, "ultimaFechaMensajeVisitante") || null,
    eliminablePorInactividad:
      valor.eliminablePorInactividad === true,
    ultimoMensaje: texto(valor, "ultimoMensaje") || null,
    mensajes,
  };

  return chat.id ? chat : null;
}

function formularioAResumen(
  solicitud: SolicitudFormularioDetalle
): SolicitudResumen {
  return {
    id: solicitud.id,
    origen: "formulario",
    nombre: solicitud.nombre,
    correo: solicitud.correo,
    telefono: solicitud.telefono,
    estatus: solicitud.estatus,
    estadoAtencion: solicitud.estadoAtencion,
    fechaRegistro: solicitud.fechaRegistro,
    fechaUltimaActividad: solicitud.fechaRegistro,
    resumen: solicitud.mensaje,
    cantidadMensajes: 0,
    ultimaFechaMensajeVisitante: null,
    eliminablePorInactividad: false,
  };
}

function chatAResumen(chat: SolicitudChatDetalle): SolicitudResumen {
  return {
    id: chat.id,
    origen: "chat",
    nombre: chat.nombreVisitante,
    correo: chat.correoVisitante,
    telefono: chat.telefonoVisitante,
    estatus: chat.estatus,
    estadoAtencion: chat.estadoAtencion,
    fechaRegistro: chat.fechaInicio,
    fechaUltimaActividad: chat.fechaUltimaActividad,
    resumen: chat.ultimoMensaje,
    cantidadMensajes: chat.cantidadMensajes,
    ultimaFechaMensajeVisitante: chat.ultimaFechaMensajeVisitante,
    eliminablePorInactividad: chat.eliminablePorInactividad,
  };
}

export async function listarSolicitudes(
  origen: OrigenSolicitud,
  estado: EstadoFiltroSolicitud
): Promise<SolicitudResumen[]> {
  const respuesta = datos(await listarSolicitudesApi(origen, estado));

  if (!Array.isArray(respuesta)) {
    return [];
  }

  return origen === "formulario"
    ? respuesta
        .map(normalizarFormulario)
        .filter(
          (solicitud): solicitud is SolicitudFormularioDetalle =>
            Boolean(solicitud)
        )
        .map(formularioAResumen)
    : respuesta
        .map(normalizarChat)
        .filter((chat): chat is SolicitudChatDetalle => Boolean(chat))
        .map(chatAResumen);
}

export async function obtenerSolicitudFormulario(
  id: string
): Promise<SolicitudFormularioDetalle> {
  const solicitud = normalizarFormulario(
    datos(await obtenerSolicitudFormularioApi(id))
  );

  if (!solicitud) {
    throw new Error("El servidor no devolvió la solicitud.");
  }

  return solicitud;
}

export async function guardarRespuestaSolicitudFormulario(
  id: string,
  respuesta: string
): Promise<ResultadoGuardarRespuestaFormulario> {
  const resultado = datos(
    await guardarRespuestaSolicitudFormularioApi(id, respuesta.trim())
  );

  return {
    correoEnviado:
      esRegistro(resultado) && resultado.correoEnviado === true,
  };
}

export async function cerrarSolicitudFormulario(id: string): Promise<void> {
  await cerrarSolicitudFormularioApi(id);
}

export async function obtenerSolicitudChat(
  id: string
): Promise<SolicitudChatDetalle> {
  const chat = normalizarChat(datos(await obtenerSolicitudChatApi(id)));

  if (!chat) {
    throw new Error("El servidor no devolvió la conversación.");
  }

  return chat;
}

export async function enviarMensajeSolicitudChat(
  id: string,
  contenido: string
): Promise<void> {
  await enviarMensajeSolicitudChatApi(id, contenido.trim());
}

export async function finalizarSolicitudChat(id: string): Promise<void> {
  await finalizarSolicitudChatApi(id);
}

export async function eliminarSolicitudChat(id: string): Promise<void> {
  await eliminarSolicitudChatApi(id);
}

export function obtenerErrorSolicitudes(error: unknown): string {
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
    : "No fue posible consultar las solicitudes.";
}
