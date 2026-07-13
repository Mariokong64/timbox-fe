import { enviarCredencialesLogin } from "../api/autenticacionApi";
import type { CredencialesLogin } from "../api/autenticacionApi";

const TOKEN_STORAGE_KEY = "token";
const USUARIO_STORAGE_KEY = "usuarioTimbox";

export interface UsuarioSesion {
  id: string;
  usuario: string;
  nombre: string;
  correo: string;
}

export interface SesionUsuario {
  token: string;
  usuario: UsuarioSesion;
}

export interface FormularioLogin {
  usuario: string;
  contrasena: string;
}

export type ErroresLogin = Partial<Record<keyof FormularioLogin, string>>;

function esRegistro(valor: unknown): valor is Record<string, unknown> {
  return typeof valor === "object" && valor !== null;
}

function leerTexto(origen: Record<string, unknown>, llave: string): string {
  const valor = origen[llave];

  return typeof valor === "string" || typeof valor === "number" ? String(valor) : "";
}

function decodificarBase64Url(valor: string): string {
  const base64 = valor.replace(/-/g, "+").replace(/_/g, "/");
  const relleno = "=".repeat((4 - (base64.length % 4)) % 4);

  return window.atob(`${base64}${relleno}`);
}

function leerPayloadToken(token: string): Record<string, unknown> | null {
  try {
    const [, payload] = token.split(".");

    if (!payload) {
      return null;
    }

    const datos = JSON.parse(decodificarBase64Url(payload));

    return esRegistro(datos) ? datos : null;
  } catch {
    return null;
  }
}

function tokenExpirado(token: string): boolean {
  const payload = leerPayloadToken(token);
  const exp = payload?.exp;

  if (typeof exp !== "number") {
    return false;
  }

  return Date.now() >= exp * 1000;
}

function normalizarUsuario(valor: unknown): UsuarioSesion {
  if (!esRegistro(valor)) {
    throw new Error("El servidor no regresó la información del usuario.");
  }

  const usuario = {
    id: leerTexto(valor, "id"),
    usuario: leerTexto(valor, "usuario"),
    nombre: leerTexto(valor, "nombre"),
    correo: leerTexto(valor, "correo"),
  };

  if (!usuario.id || !usuario.usuario) {
    throw new Error("El servidor regresó una sesión incompleta.");
  }

  return usuario;
}

function normalizarSesion(respuesta: unknown): SesionUsuario {
  const origen = esRegistro(respuesta) && esRegistro(respuesta.data) ? respuesta.data : respuesta;

  if (!esRegistro(origen)) {
    throw new Error("El servidor no regresó una sesión válida.");
  }

  const token = leerTexto(origen, "token");

  if (!token) {
    throw new Error("El servidor no regresó el token de acceso.");
  }

  return {
    token,
    usuario: normalizarUsuario(origen.usuario),
  };
}

export function validarCampoLogin(campo: keyof FormularioLogin, valor: string): string {
  const texto = valor.trim();

  if (!texto) {
    return campo === "usuario" ? "Ingresa tu usuario." : "Ingresa tu contraseña.";
  }

  if (campo === "usuario" && texto.length > 100) {
    return "El usuario no debe superar 100 caracteres.";
  }

  if (campo === "contrasena" && texto.length > 150) {
    return "La contraseña no debe superar 150 caracteres.";
  }

  return "";
}

export function validarFormularioLogin(formulario: FormularioLogin): ErroresLogin {
  return {
    usuario: validarCampoLogin("usuario", formulario.usuario),
    contrasena: validarCampoLogin("contrasena", formulario.contrasena),
  };
}

export function formularioLoginValido(errores: ErroresLogin): boolean {
  return !errores.usuario && !errores.contrasena;
}

export function guardarSesion(sesion: SesionUsuario): void {
  localStorage.setItem(TOKEN_STORAGE_KEY, sesion.token);
  localStorage.setItem(USUARIO_STORAGE_KEY, JSON.stringify(sesion.usuario));
}

export function cerrarSesion(): void {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
  localStorage.removeItem(USUARIO_STORAGE_KEY);
}

export function obtenerTokenSesion(): string | null {
  const token = localStorage.getItem(TOKEN_STORAGE_KEY);

  if (!token || tokenExpirado(token)) {
    cerrarSesion();
    return null;
  }

  return token;
}

export function obtenerSesionGuardada(): SesionUsuario | null {
  const token = obtenerTokenSesion();

  if (!token) {
    return null;
  }

  try {
    const usuarioGuardado = localStorage.getItem(USUARIO_STORAGE_KEY);
    const usuario = usuarioGuardado ? normalizarUsuario(JSON.parse(usuarioGuardado)) : null;

    if (!usuario) {
      cerrarSesion();
      return null;
    }

    return {
      token,
      usuario,
    };
  } catch {
    cerrarSesion();
    return null;
  }
}

export async function iniciarSesion(credenciales: CredencialesLogin): Promise<SesionUsuario> {
  const respuesta = await enviarCredencialesLogin({
    usuario: credenciales.usuario.trim(),
    contrasena: credenciales.contrasena,
  });
  const sesion = normalizarSesion(respuesta);

  guardarSesion(sesion);

  return sesion;
}

export function obtenerMensajeErrorLogin(error: unknown): string {
  if (esRegistro(error) && esRegistro(error.response) && esRegistro(error.response.data)) {
    const mensaje = leerTexto(error.response.data, "message") || leerTexto(error.response.data, "mensaje");

    if (mensaje) {
      return mensaje;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "No se pudo iniciar sesión.";
}
