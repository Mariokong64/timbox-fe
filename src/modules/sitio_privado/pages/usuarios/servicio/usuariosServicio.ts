import {
  actualizarUsuarioApi,
  crearUsuarioApi,
  eliminarUsuarioApi,
  obtenerUsuariosApi,
  verificarDisponibilidadUsuarioApi,
} from "../api/usuariosApi";
import { validarSeguridadContrasena } from "../../../../../shared/validaciones/contrasena";

export interface UsuarioListado {
  id: string;
  usuario: string;
  nombre: string;
  correo: string;
  fechaRegistro?: string;
  creado?: string;
  modificado?: string | null;
}

export interface UsuarioFormulario {
  usuario: string;
  nombre: string;
  correo: string;
  contrasena: string;
}

export type ErroresUsuarioFormulario = Partial<Record<keyof UsuarioFormulario, string>>;

export const usuarioFormularioInicial: UsuarioFormulario = {
  usuario: "",
  nombre: "",
  correo: "",
  contrasena: "",
};

const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function esRegistro(valor: unknown): valor is Record<string, unknown> {
  return typeof valor === "object" && valor !== null;
}

function leerTexto(origen: Record<string, unknown>, llave: string): string {
  const valor = origen[llave];

  return typeof valor === "string" || typeof valor === "number" ? String(valor) : "";
}

function normalizarUsuario(valor: unknown): UsuarioListado | null {
  if (!esRegistro(valor)) {
    return null;
  }

  const usuario = {
    id: leerTexto(valor, "id"),
    usuario: leerTexto(valor, "usuario"),
    nombre: leerTexto(valor, "nombre"),
    correo: leerTexto(valor, "correo"),
    fechaRegistro: leerTexto(valor, "fechaRegistro"),
    creado: leerTexto(valor, "creado"),
    modificado: leerTexto(valor, "modificado") || null,
  };

  return usuario.id ? usuario : null;
}

function normalizarListaUsuarios(respuesta: unknown): UsuarioListado[] {
  const origen = esRegistro(respuesta) && Array.isArray(respuesta.data) ? respuesta.data : respuesta;

  if (!Array.isArray(origen)) {
    return [];
  }

  return origen.map(normalizarUsuario).filter((usuario): usuario is UsuarioListado => Boolean(usuario));
}

function obtenerMensajeRespuesta(respuesta: unknown, respaldo: string): string {
  if (esRegistro(respuesta)) {
    return leerTexto(respuesta, "message") || leerTexto(respuesta, "mensaje") || respaldo;
  }

  return respaldo;
}

function leerData(respuesta: unknown): unknown {
  return esRegistro(respuesta) && "data" in respuesta ? respuesta.data : respuesta;
}

export function crearFormularioDesdeUsuario(usuario: UsuarioListado | null): UsuarioFormulario {
  if (!usuario) {
    return usuarioFormularioInicial;
  }

  return {
    usuario: usuario.usuario.toUpperCase(),
    nombre: usuario.nombre,
    correo: usuario.correo,
    contrasena: "",
  };
}

export function validarCampoUsuario(
  campo: keyof UsuarioFormulario,
  valor: string,
  editando = false
): string {
  const texto = valor.trim();

  if (!texto && campo !== "contrasena") {
    return "Campo obligatorio.";
  }

  if (campo === "usuario" && texto.length > 100) {
    return "Máximo 100 caracteres.";
  }

  if (campo === "nombre" && texto.length > 150) {
    return "Máximo 150 caracteres.";
  }

  if (campo === "correo") {
    if (!correoRegex.test(texto)) {
      return "Correo inválido.";
    }

    if (texto.length > 150) {
      return "Máximo 150 caracteres.";
    }
  }

  if (campo === "contrasena") {
    if (!texto && editando) {
      return "";
    }

    if (!texto) {
      return "Campo obligatorio.";
    }

    return validarSeguridadContrasena(texto);
  }

  return "";
}

export function validarFormularioUsuario(formulario: UsuarioFormulario, editando: boolean): ErroresUsuarioFormulario {
  return {
    usuario: validarCampoUsuario("usuario", formulario.usuario, editando),
    nombre: validarCampoUsuario("nombre", formulario.nombre, editando),
    correo: validarCampoUsuario("correo", formulario.correo, editando),
    contrasena: validarCampoUsuario("contrasena", formulario.contrasena, editando),
  };
}

export function hayErroresUsuario(errores: ErroresUsuarioFormulario): boolean {
  return Object.values(errores).some(Boolean);
}

export function prepararUsuarioParaEnvio(formulario: UsuarioFormulario, editando: boolean): UsuarioFormulario {
  return {
    usuario: formulario.usuario.trim().toUpperCase(),
    nombre: formulario.nombre.trim(),
    correo: formulario.correo.trim().toLowerCase(),
    contrasena: editando ? formulario.contrasena.trim() : formulario.contrasena,
  };
}

export async function verificarDisponibilidadUsuario(usuario: string, excluirId?: string): Promise<boolean> {
  const respuesta = await verificarDisponibilidadUsuarioApi(usuario.trim().toUpperCase(), excluirId);
  const datos = leerData(respuesta);

  if (!esRegistro(datos)) {
    return false;
  }

  return datos.disponible === true;
}

export async function listarUsuarios(): Promise<UsuarioListado[]> {
  const respuesta = await obtenerUsuariosApi();

  return normalizarListaUsuarios(respuesta);
}

export async function guardarUsuario(
  formulario: UsuarioFormulario,
  usuarioEditando: UsuarioListado | null
): Promise<string> {
  const editando = Boolean(usuarioEditando);
  const datos = prepararUsuarioParaEnvio(formulario, editando);

  if (editando && !datos.contrasena) {
    delete (datos as Partial<UsuarioFormulario>).contrasena;
  }

  const respuesta = usuarioEditando
    ? await actualizarUsuarioApi(usuarioEditando.id, datos)
    : await crearUsuarioApi(datos);

  return obtenerMensajeRespuesta(
    respuesta,
    usuarioEditando ? "Usuario actualizado correctamente." : "Usuario creado correctamente."
  );
}

export async function eliminarUsuario(id: string): Promise<string> {
  const respuesta = await eliminarUsuarioApi(id);

  return obtenerMensajeRespuesta(respuesta, "Usuario eliminado correctamente.");
}

export function obtenerMensajeErrorUsuarios(error: unknown): string {
  if (esRegistro(error) && esRegistro(error.response) && esRegistro(error.response.data)) {
    const mensaje = leerTexto(error.response.data, "message") || leerTexto(error.response.data, "mensaje");

    if (mensaje) {
      return mensaje;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "No se pudo procesar la solicitud.";
}
