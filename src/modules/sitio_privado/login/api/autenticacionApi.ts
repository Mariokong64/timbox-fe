import axios from "axios";

export interface CredencialesLogin {
  usuario: string;
  contrasena: string;
  captchaToken: string;
}

function quitarDiagonalFinal(valor: string): string {
  return valor.replace(/\/+$/, "");
}

function obtenerBaseAutenticacion(): string {
  const urlAutenticacion = import.meta.env.VITE_AUTH_API_URL;

  if (urlAutenticacion) {
    return quitarDiagonalFinal(urlAutenticacion);
  }

  const urlPublica = import.meta.env.VITE_API_URL;

  if (urlPublica) {
    return quitarDiagonalFinal(urlPublica).replace(/\/public$/, "/auth");
  }

  return "http://localhost:3000/api/auth";
}

const autenticacionApi = axios.create({
  baseURL: obtenerBaseAutenticacion(),
  timeout: 10000,
});

export async function enviarCredencialesLogin(credenciales: CredencialesLogin): Promise<unknown> {
  const { data } = await autenticacionApi.post("/login", credenciales);

  return data;
}
