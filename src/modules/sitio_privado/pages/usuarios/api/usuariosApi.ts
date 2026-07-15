import { apiPrivada } from "../../../api/apiPrivada";
import type { UsuarioFormulario } from "../servicio/usuariosServicio";

const BASE_URL = "/usuarios";

export async function obtenerUsuariosApi(): Promise<unknown> {
  const { data } = await apiPrivada.get(BASE_URL);

  return data;
}

export async function verificarDisponibilidadUsuarioApi(usuario: string, excluirId?: string): Promise<unknown> {
  const { data } = await apiPrivada.get(`${BASE_URL}/disponibilidad`, {
    params: {
      usuario,
      excluirId,
    },
  });

  return data;
}

export async function crearUsuarioApi(datos: UsuarioFormulario): Promise<unknown> {
  const { data } = await apiPrivada.post(BASE_URL, datos);

  return data;
}

export async function actualizarUsuarioApi(id: string, datos: UsuarioFormulario): Promise<unknown> {
  const { data } = await apiPrivada.put(`${BASE_URL}/${id}`, datos);

  return data;
}

export async function eliminarUsuarioApi(id: string): Promise<unknown> {
  const { data } = await apiPrivada.delete(`${BASE_URL}/${id}`);

  return data;
}
