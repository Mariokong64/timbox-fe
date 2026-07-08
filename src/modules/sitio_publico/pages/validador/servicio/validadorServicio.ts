const TAMANO_MAXIMO_XML = 5 * 1024 * 1024;

export interface FilaTablaResultado {
  atributo: string;
  valor: string;
  estatus?: boolean;
}

export interface ErrorResultado {
  error: string;
  mensaje: string;
}

export interface ResultadoValidador {
  valido: boolean;
  titulo: string;
  consultaSat?: string;
  uuid?: string;
  numeroCertificadoSat?: string;
  fechaTimbrado?: string;
  rfcPac?: string;
  errores: ErrorResultado[];
  informacionCfdi: FilaTablaResultado[];
}

export function validarArchivoXml(archivo: File | null): string | null {
  if (!archivo) {
    return "Selecciona un archivo XML.";
  }

  const nombreEsXml = archivo.name.toLowerCase().endsWith(".xml");
  const tipoEsXml = archivo.type === "text/xml" || archivo.type === "application/xml" || archivo.type === "";

  if (!nombreEsXml || !tipoEsXml) {
    return "El archivo debe tener formato XML.";
  }

  if (archivo.size > TAMANO_MAXIMO_XML) {
    return "El XML no debe pesar mas de 5 MB.";
  }

  return null;
}

export function validarCaptcha(captchaToken: string): string | null {
  if (!captchaToken) {
    return "Confirma el captcha antes de validar el comprobante.";
  }

  return null;
}

export function obtenerMensajeError(error: unknown): string {
  if (typeof error === "object" && error !== null && "response" in error) {
    const response = (error as { response?: { data?: { message?: string; mensaje?: string } } }).response;
    return response?.data?.message ?? response?.data?.mensaje ?? "No se pudo validar el comprobante.";
  }

  return "No se pudo validar el comprobante.";
}

function esRegistro(valor: unknown): valor is Record<string, unknown> {
  return typeof valor === "object" && valor !== null;
}

function leerTexto(origen: Record<string, unknown>, llaves: string[]): string | undefined {
  for (const llave of llaves) {
    const valor = origen[llave];

    if (typeof valor === "string" || typeof valor === "number" || typeof valor === "boolean") {
      return String(valor);
    }
  }

  return undefined;
}

function leerBooleano(origen: Record<string, unknown>, llaves: string[]): boolean | undefined {
  for (const llave of llaves) {
    const valor = origen[llave];

    if (typeof valor === "boolean") {
      return valor;
    }

    if (typeof valor === "string") {
      const normalizado = valor.toLowerCase();

      if (["true", "valido", "valid", "ok", "correcto"].includes(normalizado)) {
        return true;
      }

      if (["false", "invalido", "invalid", "error"].includes(normalizado)) {
        return false;
      }
    }
  }

  return undefined;
}

function normalizarErrores(valor: unknown): ErrorResultado[] {
  if (!Array.isArray(valor)) {
    return [];
  }

  return valor
    .filter(esRegistro)
    .map((error) => ({
      error: leerTexto(error, ["error", "codigo", "code"]) ?? "-",
      mensaje: leerTexto(error, ["mensaje", "message", "descripcion", "description"]) ?? "-",
    }));
}

function normalizarInformacion(valor: unknown): FilaTablaResultado[] {
  if (Array.isArray(valor)) {
    return valor.filter(esRegistro).map((fila) => ({
      atributo: leerTexto(fila, ["atributo", "campo", "nombre", "key"]) ?? "-",
      valor: leerTexto(fila, ["valor", "value"]) ?? "-",
      estatus: leerBooleano(fila, ["estatus", "status", "valido", "valid"]),
    }));
  }

  if (esRegistro(valor)) {
    return Object.entries(valor).map(([atributo, contenido]) => {
      if (esRegistro(contenido)) {
        return {
          atributo,
          valor: leerTexto(contenido, ["valor", "value", "mensaje", "message"]) ?? "-",
          estatus: leerBooleano(contenido, ["estatus", "status", "valido", "valid"]),
        };
      }

      return {
        atributo,
        valor: String(contenido ?? "-"),
        estatus: true,
      };
    });
  }

  return [];
}

export function normalizarResultadoValidador(respuesta: unknown): ResultadoValidador {
  const datos = esRegistro(respuesta) ? respuesta : {};
  const valido = leerBooleano(datos, ["valido", "valid", "esValido", "success"]) ?? false;
  const consultaSat =
    leerTexto(datos, ["consultaSat", "consulta_sat", "estatusSat", "mensajeSat"]) ??
    leerTexto(datos, ["mensaje", "message"]);

  return {
    valido,
    titulo:
      leerTexto(datos, ["titulo", "title", "resultado"]) ??
      (valido ? "Comprobante Válido" : "Comprobante Inválido"),
    consultaSat,
    uuid: leerTexto(datos, ["uuid", "UUID"]),
    numeroCertificadoSat: leerTexto(datos, ["numeroCertificadoSat", "numCertificadoSat", "noCertificadoSat"]),
    fechaTimbrado: leerTexto(datos, ["fechaTimbrado", "fecha_timbre", "fechaTimbradoSat"]),
    rfcPac: leerTexto(datos, ["rfcPac", "RFC PAC", "rfc_pac"]),
    errores: normalizarErrores(datos.errores ?? datos.errors),
    informacionCfdi: normalizarInformacion(datos.informacionCfdi ?? datos.cfdi ?? datos.informacion ?? datos.detalle),
  };
}
