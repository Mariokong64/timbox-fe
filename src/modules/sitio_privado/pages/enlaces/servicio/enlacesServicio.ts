import {
  actualizarEnlaceApi,
  obtenerEnlacesApi,
  obtenerSeccionesApi,
} from "../api/enlacesApi";

export interface SeccionAdministrable {
  id: string;
  nombre: string;
  descripcion: string;
}

export interface EnlaceAdministrable {
  id: string;
  clave: string;
  url: string;
  activo: boolean;
  fechaActualizacion: string;
  seccion: SeccionAdministrable;
}

export interface EdicionEnlace {
  url: string;
  activo: boolean;
}

export interface ErroresEnlace {
  url?: string;
}

export interface ResultadoGuardadoEnlace {
  enlace: EnlaceAdministrable;
  mensaje: string;
}

function esRegistro(valor: unknown): valor is Record<string, unknown> {
  return typeof valor === "object" && valor !== null;
}

function texto(registro: Record<string, unknown>, llave: string): string {
  const valor = registro[llave];
  return typeof valor === "string" || typeof valor === "number" ? String(valor) : "";
}

function dato(respuesta: unknown): unknown {
  return esRegistro(respuesta) && "data" in respuesta ? respuesta.data : respuesta;
}

function normalizarSeccion(valor: unknown): SeccionAdministrable | null {
  if (!esRegistro(valor)) {
    return null;
  }

  const seccion = {
    id: texto(valor, "id"),
    nombre: texto(valor, "nombre"),
    descripcion: texto(valor, "descripcion"),
  };

  return seccion.id ? seccion : null;
}

function normalizarEnlace(valor: unknown): EnlaceAdministrable | null {
  if (!esRegistro(valor)) {
    return null;
  }

  const seccion = normalizarSeccion(valor.seccion);
  const enlace = {
    id: texto(valor, "id"),
    clave: texto(valor, "clave"),
    url: texto(valor, "url"),
    activo: valor.activo === true,
    fechaActualizacion: texto(valor, "fechaActualizacion"),
    seccion,
  };

  return enlace.id && seccion ? { ...enlace, seccion } : null;
}

export async function listarSecciones(): Promise<SeccionAdministrable[]> {
  const respuesta = dato(await obtenerSeccionesApi());

  if (!Array.isArray(respuesta)) {
    return [];
  }

  return respuesta
    .map(normalizarSeccion)
    .filter((seccion): seccion is SeccionAdministrable => Boolean(seccion));
}

export async function listarEnlaces(
  seccionId?: string,
  busqueda?: string
): Promise<EnlaceAdministrable[]> {
  const respuesta = dato(await obtenerEnlacesApi(seccionId, busqueda));

  if (!Array.isArray(respuesta)) {
    return [];
  }

  return respuesta
    .map(normalizarEnlace)
    .filter((enlace): enlace is EnlaceAdministrable => Boolean(enlace));
}

export function crearEdicion(enlace: EnlaceAdministrable): EdicionEnlace {
  return { url: enlace.url, activo: enlace.activo };
}

export function validarEdicion(edicion: EdicionEnlace): ErroresEnlace {
  const errores: ErroresEnlace = {};
  const url = edicion.url.trim();

  if (!url) {
    errores.url = "La URL es obligatoria.";
  } else if (url.length > 2000) {
    errores.url = "La URL debe tener máximo 2000 caracteres.";
  } else {
    try {
      const resultado = new URL(url);
      if (!["http:", "https:"].includes(resultado.protocol)) {
        errores.url = "La URL debe comenzar con http:// o https://.";
      }
    } catch {
      errores.url = "Ingresa una URL válida.";
    }
  }

  return errores;
}

export async function guardarEnlace(
  id: string,
  edicion: EdicionEnlace
): Promise<ResultadoGuardadoEnlace> {
  const respuesta = await actualizarEnlaceApi(id, {
    url: edicion.url.trim(),
    activo: edicion.activo,
  });
  const enlace = normalizarEnlace(dato(respuesta));

  if (!enlace) {
    throw new Error("No se recibió el enlace actualizado.");
  }

  return {
    enlace,
    mensaje: esRegistro(respuesta)
      ? texto(respuesta, "message") || "Enlace actualizado correctamente."
      : "Enlace actualizado correctamente.",
  };
}

export async function cambiarActivo(
  enlace: EnlaceAdministrable
): Promise<EnlaceAdministrable> {
  const respuesta = await actualizarEnlaceApi(enlace.id, {
    url: enlace.url,
    activo: !enlace.activo,
  });
  const enlaceActualizado = normalizarEnlace(dato(respuesta));

  if (!enlaceActualizado) {
    throw new Error("No se recibió el enlace actualizado.");
  }

  return enlaceActualizado;
}

export function mensajeError(error: unknown): string {
  if (esRegistro(error) && esRegistro(error.response) && esRegistro(error.response.data)) {
    return texto(error.response.data, "message") || texto(error.response.data, "mensaje");
  }

  return error instanceof Error ? error.message : "No se pudo procesar la solicitud.";
}
