export type RemitenteMensajeChat = "chatbot" | "usuario";

export interface MensajeChat {
  id: string;
  remitente: RemitenteMensajeChat;
  contenido: string;
  hora: string;
}

export interface ResultadoValidacionMensaje {
  mensaje: string;
  error: string | null;
}
