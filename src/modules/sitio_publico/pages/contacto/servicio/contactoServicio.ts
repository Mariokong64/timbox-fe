export interface ContactoFormularioValores {
  nombre: string;
  correo: string;
  telefono: string;
  rfc: string;
  mensaje: string;
}

export type ErroresContacto = Partial<Record<keyof ContactoFormularioValores, string>>;

const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const telefonoRegex = /^[0-9\s()+-]{8,20}$/;
const rfcRegex = /^([A-ZÑ&]{3,4})(\d{6})([A-Z0-9]{3})?$/i;

export const contactoInicial: ContactoFormularioValores = {
  nombre: "",
  correo: "",
  telefono: "",
  rfc: "",
  mensaje: "",
};

export function validarFormularioContacto(datos: ContactoFormularioValores): ErroresContacto {
  const errores: ErroresContacto = {};

  if (!datos.nombre.trim()) {
    errores.nombre = "Ingresa tu nombre.";
  }

  if (!datos.correo.trim()) {
    errores.correo = "Ingresa tu correo.";
  } else if (!correoRegex.test(datos.correo.trim())) {
    errores.correo = "Ingresa un correo válido.";
  }

  if (datos.telefono.trim() && !telefonoRegex.test(datos.telefono.trim())) {
    errores.telefono = "Ingresa un teléfono válido.";
  }

  if (datos.rfc.trim() && !rfcRegex.test(datos.rfc.trim())) {
    errores.rfc = "Ingresa un RFC válido.";
  }

  if (!datos.mensaje.trim()) {
    errores.mensaje = "Escribe un mensaje.";
  }

  return errores;
}

export function validarCampoContacto(
  campo: keyof ContactoFormularioValores,
  valor: string,
  datos: ContactoFormularioValores
): string | undefined {
  const datosActualizados = {
    ...datos,
    [campo]: valor,
  };

  return validarFormularioContacto(datosActualizados)[campo];
}

export function hayErroresContacto(errores: ErroresContacto): boolean {
  return Object.keys(errores).length > 0;
}

export function limpiarFormularioContacto(datos: ContactoFormularioValores): ContactoFormularioValores {
  return {
    nombre: datos.nombre.trim(),
    correo: datos.correo.trim(),
    telefono: datos.telefono.trim(),
    rfc: datos.rfc.trim().toUpperCase(),
    mensaje: datos.mensaje.trim(),
  };
}

export function obtenerMensajeErrorContacto(error: unknown): string {
  if (typeof error === "object" && error !== null && "response" in error) {
    const response = (error as { response?: { data?: { message?: string; mensaje?: string } } }).response;
    return response?.data?.message ?? response?.data?.mensaje ?? "No se pudo enviar el mensaje.";
  }

  return "No se pudo enviar el mensaje.";
}
