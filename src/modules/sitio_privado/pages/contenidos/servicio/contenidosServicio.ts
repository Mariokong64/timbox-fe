import {
  actualizarRecursoApi,
  crearRecursoApi,
  eliminarRecursoApi,
  obtenerRecursosApi,
  obtenerSeccionesApi,
} from "../api/contenidosApi";

export type TipoRecurso = "contenido" | "url";

export interface SeccionAdministrable {
  id: string;
  nombre: string;
  descripcion: string;
}

export interface RecursoAdministrable {
  id: string;
  clave: string;
  valor: string;
  activo: boolean;
  fechaActualizacion: string;
  seccion: SeccionAdministrable;
}

export interface RecursoFormulario {
  clave: string;
  seccionId: string;
  activo: boolean;
  contenido?: string;
  url?: string;
}

export interface ErroresRecurso {
  clave?: string;
  valor?: string;
  seccionId?: string;
}

const claveRegex = /^[a-z0-9][a-z0-9._-]*$/;

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

function normalizarRecurso(tipo: TipoRecurso, valor: unknown): RecursoAdministrable | null {
  if (!esRegistro(valor)) {
    return null;
  }

  const seccion = normalizarSeccion(valor.seccion);
  const recurso = {
    id: texto(valor, "id"),
    clave: texto(valor, "clave"),
    valor: texto(valor, tipo === "contenido" ? "contenido" : "url"),
    activo: valor.activo === true,
    fechaActualizacion: texto(valor, "fechaActualizacion"),
    seccion,
  };

  return recurso.id && seccion ? { ...recurso, seccion } : null;
}

export async function listarSecciones(tipo: TipoRecurso): Promise<SeccionAdministrable[]> {
  const respuesta = dato(await obtenerSeccionesApi(tipo));

  if (!Array.isArray(respuesta)) {
    return [];
  }

  return respuesta
    .map(normalizarSeccion)
    .filter((seccion): seccion is SeccionAdministrable => Boolean(seccion));
}

export async function listarRecursos(
  tipo: TipoRecurso,
  seccionId?: string,
  busqueda?: string
): Promise<RecursoAdministrable[]> {
  const respuesta = dato(await obtenerRecursosApi(tipo, seccionId, busqueda));

  if (!Array.isArray(respuesta)) {
    return [];
  }

  return respuesta
    .map((valor) => normalizarRecurso(tipo, valor))
    .filter((recurso): recurso is RecursoAdministrable => Boolean(recurso));
}

export function crearFormulario(
  tipo: TipoRecurso,
  seccionId: string,
  recurso: RecursoAdministrable | null
): RecursoFormulario {
  return {
    clave: recurso?.clave ?? "",
    seccionId: recurso?.seccion.id ?? seccionId,
    activo: recurso?.activo ?? true,
    ...(tipo === "contenido"
      ? { contenido: recurso?.valor ?? "" }
      : { url: recurso?.valor ?? "" }),
  };
}

export function validarFormulario(
  tipo: TipoRecurso,
  formulario: RecursoFormulario
): ErroresRecurso {
  const errores: ErroresRecurso = {};
  const clave = formulario.clave.trim().toLowerCase();
  const valor = (tipo === "contenido" ? formulario.contenido : formulario.url)?.trim() ?? "";

  if (!clave) {
    errores.clave = "La clave es obligatoria.";
  } else if (clave.length > 100 || !claveRegex.test(clave)) {
    errores.clave = "Usa máximo 100 letras minúsculas, números, punto, guion o guion bajo.";
  }

  if (!formulario.seccionId) {
    errores.seccionId = "Selecciona una sección.";
  }

  if (!valor) {
    errores.valor = tipo === "contenido" ? "El contenido es obligatorio." : "La URL es obligatoria.";
  } else if (tipo === "url") {
    try {
      const url = new URL(valor);
      if (!["http:", "https:"].includes(url.protocol)) {
        errores.valor = "La URL debe comenzar con http:// o https://.";
      }
    } catch {
      errores.valor = "Ingresa una URL válida.";
    }
  }

  return errores;
}

export async function guardarRecurso(
  tipo: TipoRecurso,
  formulario: RecursoFormulario,
  recurso: RecursoAdministrable | null
): Promise<string> {
  const datos: RecursoFormulario = {
    clave: formulario.clave.trim().toLowerCase(),
    seccionId: formulario.seccionId,
    activo: formulario.activo,
    ...(tipo === "contenido"
      ? { contenido: formulario.contenido?.trim() ?? "" }
      : { url: formulario.url?.trim() ?? "" }),
  };
  const respuesta = recurso
    ? await actualizarRecursoApi(tipo, recurso.id, datos)
    : await crearRecursoApi(tipo, datos);

  return esRegistro(respuesta)
    ? texto(respuesta, "message") || "Cambios guardados correctamente."
    : "Cambios guardados correctamente.";
}

export async function cambiarActivo(
  tipo: TipoRecurso,
  recurso: RecursoAdministrable
): Promise<void> {
  await actualizarRecursoApi(tipo, recurso.id, {
    clave: recurso.clave,
    seccionId: recurso.seccion.id,
    activo: !recurso.activo,
    ...(tipo === "contenido" ? { contenido: recurso.valor } : { url: recurso.valor }),
  });
}

export async function eliminarRecurso(tipo: TipoRecurso, id: string): Promise<string> {
  const respuesta = await eliminarRecursoApi(tipo, id);
  return esRegistro(respuesta)
    ? texto(respuesta, "message") || "Registro eliminado correctamente."
    : "Registro eliminado correctamente.";
}

export function mensajeError(error: unknown): string {
  if (esRegistro(error) && esRegistro(error.response) && esRegistro(error.response.data)) {
    return texto(error.response.data, "message") || texto(error.response.data, "mensaje");
  }

  return error instanceof Error ? error.message : "No se pudo procesar la solicitud.";
}
