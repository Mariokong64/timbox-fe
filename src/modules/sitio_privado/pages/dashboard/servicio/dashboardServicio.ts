import { obtenerResumenDashboardApi } from "../api/dashboardApi";

export interface MetricaDashboard {
  etiqueta: string;
  valor: number;
}

export interface SerieDiariaDashboard {
  fecha: string;
  total: number;
}

export interface SolicitudRecienteDashboard {
  id: string;
  nombre: string;
  correo: string;
  estatus: string;
  origen: string;
  fechaRegistro: string;
}

export interface ResumenContactoDashboard {
  total: number;
  atendidas: number;
  pendientes: number;
  enAtencion: number;
  descartadas: number;
  porEstatus: MetricaDashboard[];
  porOrigen: MetricaDashboard[];
  porDia: SerieDiariaDashboard[];
  recientes: SolicitudRecienteDashboard[];
}

export interface ResumenValidadorDashboard {
  total: number;
  vigentes: number;
  cancelados: number;
  noEncontrados: number;
  errores: number;
  porResultado: MetricaDashboard[];
  porDia: SerieDiariaDashboard[];
}

export interface ResumenDashboard {
  contacto: ResumenContactoDashboard;
  validador: ResumenValidadorDashboard;
}

const resumenVacio: ResumenDashboard = {
  contacto: {
    total: 0,
    atendidas: 0,
    pendientes: 0,
    enAtencion: 0,
    descartadas: 0,
    porEstatus: [],
    porOrigen: [],
    porDia: [],
    recientes: [],
  },
  validador: {
    total: 0,
    vigentes: 0,
    cancelados: 0,
    noEncontrados: 0,
    errores: 0,
    porResultado: [],
    porDia: [],
  },
};

function esRegistro(valor: unknown): valor is Record<string, unknown> {
  return typeof valor === "object" && valor !== null;
}

function leerData(respuesta: unknown): unknown {
  return esRegistro(respuesta) && "data" in respuesta ? respuesta.data : respuesta;
}

function leerTexto(origen: Record<string, unknown>, llave: string): string {
  const valor = origen[llave];

  return typeof valor === "string" || typeof valor === "number" ? String(valor) : "";
}

function leerNumero(origen: Record<string, unknown>, llave: string): number {
  const valor = origen[llave];
  const numero = Number(valor ?? 0);

  return Number.isFinite(numero) ? numero : 0;
}

function leerLista(origen: Record<string, unknown>, llave: string): unknown[] {
  const valor = origen[llave];

  return Array.isArray(valor) ? valor : [];
}

function normalizarMetrica(valor: unknown): MetricaDashboard | null {
  if (!esRegistro(valor)) {
    return null;
  }

  return {
    etiqueta: leerTexto(valor, "etiqueta") || "Sin clasificar",
    valor: leerNumero(valor, "valor"),
  };
}

function normalizarSerieDiaria(valor: unknown): SerieDiariaDashboard | null {
  if (!esRegistro(valor)) {
    return null;
  }

  return {
    fecha: leerTexto(valor, "fecha"),
    total: leerNumero(valor, "total"),
  };
}

function normalizarSolicitudReciente(valor: unknown): SolicitudRecienteDashboard | null {
  if (!esRegistro(valor)) {
    return null;
  }

  const solicitud = {
    id: leerTexto(valor, "id"),
    nombre: leerTexto(valor, "nombre"),
    correo: leerTexto(valor, "correo"),
    estatus: leerTexto(valor, "estatus"),
    origen: leerTexto(valor, "origen"),
    fechaRegistro: leerTexto(valor, "fechaRegistro"),
  };

  return solicitud.id ? solicitud : null;
}

function normalizarMetricas(lista: unknown[]): MetricaDashboard[] {
  return lista.map(normalizarMetrica).filter((metrica): metrica is MetricaDashboard => Boolean(metrica));
}

function normalizarSerie(lista: unknown[]): SerieDiariaDashboard[] {
  return lista.map(normalizarSerieDiaria).filter((serie): serie is SerieDiariaDashboard => Boolean(serie));
}

function normalizarRecientes(lista: unknown[]): SolicitudRecienteDashboard[] {
  return lista.map(normalizarSolicitudReciente).filter((solicitud): solicitud is SolicitudRecienteDashboard => Boolean(solicitud));
}

function normalizarResumen(respuesta: unknown): ResumenDashboard {
  const datos = leerData(respuesta);

  if (!esRegistro(datos)) {
    return resumenVacio;
  }

  const contacto = esRegistro(datos.contacto) ? datos.contacto : {};
  const validador = esRegistro(datos.validador) ? datos.validador : {};

  return {
    contacto: {
      total: leerNumero(contacto, "total"),
      atendidas: leerNumero(contacto, "atendidas"),
      pendientes: leerNumero(contacto, "pendientes"),
      enAtencion: leerNumero(contacto, "enAtencion"),
      descartadas: leerNumero(contacto, "descartadas"),
      porEstatus: normalizarMetricas(leerLista(contacto, "porEstatus")),
      porOrigen: normalizarMetricas(leerLista(contacto, "porOrigen")),
      porDia: normalizarSerie(leerLista(contacto, "porDia")),
      recientes: normalizarRecientes(leerLista(contacto, "recientes")),
    },
    validador: {
      total: leerNumero(validador, "total"),
      vigentes: leerNumero(validador, "vigentes"),
      cancelados: leerNumero(validador, "cancelados"),
      noEncontrados: leerNumero(validador, "noEncontrados"),
      errores: leerNumero(validador, "errores"),
      porResultado: normalizarMetricas(leerLista(validador, "porResultado")),
      porDia: normalizarSerie(leerLista(validador, "porDia")),
    },
  };
}

export async function obtenerResumenDashboard(): Promise<ResumenDashboard> {
  const respuesta = await obtenerResumenDashboardApi();

  return normalizarResumen(respuesta);
}

export function obtenerMensajeErrorDashboard(error: unknown): string {
  if (esRegistro(error) && esRegistro(error.response) && esRegistro(error.response.data)) {
    const mensaje = leerTexto(error.response.data, "message") || leerTexto(error.response.data, "mensaje");

    if (mensaje) {
      return mensaje;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "No se pudo cargar la informacion del dashboard.";
}
