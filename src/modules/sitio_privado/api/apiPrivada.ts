import axios, { type InternalAxiosRequestConfig } from "axios";
import { cerrarSesion, obtenerTokenSesion } from "../login/servicio/autenticacionServicio";

function quitarDiagonalFinal(valor: string): string {
  return valor.replace(/\/+$/, "");
}

function obtenerBasePrivada(): string {
  const urlPrivada = import.meta.env.VITE_PRIVATE_API_URL;

  if (urlPrivada) {
    return quitarDiagonalFinal(urlPrivada);
  }

  const urlPublica = import.meta.env.VITE_API_URL;

  if (urlPublica) {
    return quitarDiagonalFinal(urlPublica).replace(/\/public$/, "/private");
  }

  return "http://localhost:3000/api/private";
}

const apiPrivada = axios.create({
  baseURL: obtenerBasePrivada(),
  timeout: 10000,
});

apiPrivada.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = obtenerTokenSesion();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiPrivada.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      cerrarSesion();
    }

    return Promise.reject(error);
  }
);

export async function validarSesionPrivada(): Promise<void> {
  await apiPrivada.get("/prueba");
}
