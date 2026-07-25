export type OrigenSolicitud = "formulario" | "chat";

export type EstadoAtencionSolicitud =
  | "por_atender"
  | "en_atencion"
  | "cerrada";

export type EstadoFiltroSolicitud =
  | EstadoAtencionSolicitud
  | "inactivas_30_dias"
  | "todas";

export interface SolicitudResumen {
  id: string;
  origen: OrigenSolicitud;
  nombre: string;
  correo: string;
  telefono: string | null;
  estatus: string;
  estadoAtencion: EstadoAtencionSolicitud;
  fechaRegistro: string;
  fechaUltimaActividad: string;
  resumen: string | null;
  cantidadMensajes: number;
  ultimaFechaMensajeVisitante: string | null;
  eliminablePorInactividad: boolean;
}

export interface SolicitudFormularioDetalle {
  id: string;
  nombre: string;
  correo: string;
  telefono: string | null;
  rfc: string | null;
  mensaje: string | null;
  estatus: string;
  estadoAtencion: EstadoAtencionSolicitud;
  fechaRegistro: string;
  respuestas: RespuestaSolicitudFormulario[];
}

export interface RespuestaSolicitudFormulario {
  id: string;
  detalles: string;
  fechaAtencion: string;
  usuarioId: string;
  nombreUsuario: string;
}

export type RemitenteSolicitudChat = "visitante" | "agente" | "sistema";

export interface MensajeSolicitudChat {
  id: string;
  contenido: string;
  remitente: RemitenteSolicitudChat;
  nombreRemitente: string | null;
  fechaRegistro: string;
}

export interface SolicitudChatDetalle {
  id: string;
  nombreVisitante: string;
  correoVisitante: string;
  telefonoVisitante: string | null;
  estatus: string;
  estadoAtencion: EstadoAtencionSolicitud;
  fechaInicio: string;
  fechaFin: string | null;
  fechaUltimaActividad: string;
  cantidadMensajes: number;
  ultimaFechaMensajeVisitante: string | null;
  eliminablePorInactividad: boolean;
  ultimoMensaje: string | null;
  mensajes: MensajeSolicitudChat[];
}
