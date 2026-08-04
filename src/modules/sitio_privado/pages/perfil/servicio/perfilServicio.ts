import {
  cambiarContrasenaApi,
  eliminarFotoPerfilApi,
  guardarFotoPerfilApi,
  obtenerFotoPerfilApi,
  obtenerPerfilApi,
  type DatosCambioContrasena,
} from "../api/perfilApi";

export interface PerfilUsuario {
  id: string;
  usuario: string;
  nombre: string;
  correo: string;
  fotoPerfil: string | null;
}

export type FormularioContrasena = DatosCambioContrasena;

export type ErroresContrasena = Partial<
  Record<keyof FormularioContrasena, string>
>;

export const formularioContrasenaInicial: FormularioContrasena = {
  contrasenaActual: "",
  contrasenaNueva: "",
  confirmacionContrasena: "",
};

export const TAMANO_MAXIMO_FOTO_BYTES = 5 * 1024 * 1024;
export const TIPOS_FOTO_PERMITIDOS = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

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

function normalizarPerfil(valor: unknown): PerfilUsuario {
  if (!esRegistro(valor)) {
    throw new Error("El servidor no regresó el perfil del usuario.");
  }

  const perfil: PerfilUsuario = {
    id: texto(valor, "id"),
    usuario: texto(valor, "usuario"),
    nombre: texto(valor, "nombre"),
    correo: texto(valor, "correo"),
    fotoPerfil: texto(valor, "fotoPerfil") || null,
  };

  if (!perfil.id || !perfil.usuario) {
    throw new Error("El servidor regresó un perfil incompleto.");
  }

  return perfil;
}

export async function obtenerPerfilUsuario(): Promise<PerfilUsuario> {
  return normalizarPerfil(datos(await obtenerPerfilApi()));
}

export async function cambiarContrasenaPerfil(
  formulario: FormularioContrasena
): Promise<void> {
  await cambiarContrasenaApi({
    contrasenaActual: formulario.contrasenaActual,
    contrasenaNueva: formulario.contrasenaNueva,
    confirmacionContrasena: formulario.confirmacionContrasena,
  });
}

export async function guardarFotoPerfil(foto: File): Promise<PerfilUsuario> {
  return normalizarPerfil(datos(await guardarFotoPerfilApi(foto)));
}

export async function obtenerFotoPerfil(): Promise<Blob> {
  return obtenerFotoPerfilApi();
}

export async function eliminarFotoPerfil(): Promise<PerfilUsuario> {
  return normalizarPerfil(datos(await eliminarFotoPerfilApi()));
}

export function validarFotoPerfil(foto: File): string {
  if (!TIPOS_FOTO_PERMITIDOS.includes(foto.type)) {
    return "Selecciona una imagen JPG, PNG o WebP.";
  }

  if (foto.size > TAMANO_MAXIMO_FOTO_BYTES) {
    return "La fotografía no debe superar 5 MB.";
  }

  return "";
}

export function validarFormularioContrasena(
  formulario: FormularioContrasena
): ErroresContrasena {
  const errores: ErroresContrasena = {};

  if (!formulario.contrasenaActual) {
    errores.contrasenaActual = "Ingresa tu contraseña actual.";
  }

  if (!formulario.contrasenaNueva) {
    errores.contrasenaNueva = "Ingresa la nueva contraseña.";
  } else if (formulario.contrasenaNueva.length < 8) {
    errores.contrasenaNueva = "Debe tener al menos 8 caracteres.";
  } else if (formulario.contrasenaNueva.length > 150) {
    errores.contrasenaNueva = "No debe superar 150 caracteres.";
  }

  if (!formulario.confirmacionContrasena) {
    errores.confirmacionContrasena = "Confirma la nueva contraseña.";
  } else if (
    formulario.confirmacionContrasena !== formulario.contrasenaNueva
  ) {
    errores.confirmacionContrasena = "Las contraseñas no coinciden.";
  }

  if (
    formulario.contrasenaActual &&
    formulario.contrasenaActual === formulario.contrasenaNueva
  ) {
    errores.contrasenaNueva = "Debe ser diferente de la contraseña actual.";
  }

  return errores;
}

export function obtenerMensajeErrorPerfil(error: unknown): string {
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
    : "No fue posible procesar el perfil.";
}
