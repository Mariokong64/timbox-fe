import { apiPrivada } from "../../../api/apiPrivada";

const RUTA = "/perfil";

export interface DatosCambioContrasena {
  contrasenaActual: string;
  contrasenaNueva: string;
  confirmacionContrasena: string;
}

export async function obtenerPerfilApi(): Promise<unknown> {
  return (await apiPrivada.get(RUTA)).data;
}

export async function cambiarContrasenaApi(
  datos: DatosCambioContrasena
): Promise<unknown> {
  return (await apiPrivada.put(`${RUTA}/contrasena`, datos)).data;
}

export async function guardarFotoPerfilApi(foto: File): Promise<unknown> {
  const formulario = new FormData();
  formulario.append("foto", foto);

  return (
    await apiPrivada.post(`${RUTA}/foto`, formulario, {
      timeout: 20000,
    })
  ).data;
}

export async function obtenerFotoPerfilApi(): Promise<Blob> {
  return (
    await apiPrivada.get(`${RUTA}/foto`, {
      responseType: "blob",
      timeout: 20000,
    })
  ).data;
}

export async function eliminarFotoPerfilApi(): Promise<unknown> {
  return (await apiPrivada.delete(`${RUTA}/foto`)).data;
}
