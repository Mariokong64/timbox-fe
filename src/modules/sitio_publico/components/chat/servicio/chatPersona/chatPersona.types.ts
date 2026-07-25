export type RemitenteChatPersona = "visitante" | "agente" | "sistema";

export interface MensajeChatPersona {
  id: string;
  contenido: string;
  remitente: RemitenteChatPersona;
  nombreRemitente: string | null;
  fechaRegistro: string;
}

export interface ConversacionChatPersona {
  id: string;
  nombreVisitante: string;
  correoVisitante: string;
  telefonoVisitante: string | null;
  estatus: string;
  fechaInicio: string;
  fechaFin: string | null;
  fechaUltimaActividad: string;
  mensajes: MensajeChatPersona[];
}

export interface FormularioChatPersona {
  nombre: string;
  correo: string;
  telefono: string;
  mensaje: string;
}

export type ErroresFormularioChatPersona = Partial<
  Record<keyof FormularioChatPersona, string>
>;
