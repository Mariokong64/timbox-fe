import axios from "axios";
import { timboxApi } from "../../../../../api/timboxApi";

export const RUTA_MENSAJE_CHATBOT = "/chatbot/mensaje";

const TIEMPO_ESPERA_CHATBOT_MS = 130_000;
const MENSAJE_ERROR_CONEXION =
  "No fue posible conectar con el asistente. Inténtalo nuevamente.";

interface RespuestaChatbotApi {
  ok: boolean;
  data?: {
    respuesta?: string;
    modelo?: string;
  };
  message?: string;
}

export interface RespuestaChatbot {
  respuesta: string;
  modelo: string;
}

function obtenerMensajeError(error: unknown): string {
  if (!axios.isAxiosError<RespuestaChatbotApi>(error)) {
    return MENSAJE_ERROR_CONEXION;
  }

  if (error.code === "ECONNABORTED") {
    return "El asistente tardó demasiado en responder. Inténtalo nuevamente.";
  }

  const mensajeBackend = error.response?.data?.message?.trim();

  if (mensajeBackend) {
    return mensajeBackend;
  }

  if (!error.response) {
    return "El servicio del asistente no está disponible en este momento.";
  }

  return MENSAJE_ERROR_CONEXION;
}

export async function solicitarRespuestaChatbot(
  mensaje: string,
  signal?: AbortSignal
): Promise<RespuestaChatbot> {
  try {
    const { data } = await timboxApi.post<RespuestaChatbotApi>(
      RUTA_MENSAJE_CHATBOT,
      { mensaje },
      {
        signal,
        timeout: TIEMPO_ESPERA_CHATBOT_MS,
      }
    );

    const respuesta = data.data?.respuesta?.trim();

    if (!data.ok || !respuesta) {
      throw new Error(data.message?.trim() || MENSAJE_ERROR_CONEXION);
    }

    return {
      respuesta,
      modelo: data.data?.modelo?.trim() || "modelo local",
    };
  } catch (error: unknown) {
    if (signal?.aborted) {
      throw error;
    }

    if (error instanceof Error && !axios.isAxiosError(error)) {
      throw error;
    }

    throw new Error(obtenerMensajeError(error), { cause: error });
  }
}
