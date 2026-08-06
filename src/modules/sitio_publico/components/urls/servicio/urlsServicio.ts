import { solicitarURLApi } from "../api/urlsApi";

export const clavesURL = {
  aplicacionGratuita: "aplicacion_gratuita",
  dashboardRegistro: "timbox_dashboard_registro",
  dashboardAcceso: "timbox_dashboard_acceso",
  linkedin: "timbox_linkedin",
  facebook: "timbox_facebook",
  integradores: {
    net: "integradores.net",
    java: "integradores.java",
    php: "integradores.php",
    python: "integradores.python",
    ruby: "integradores.ruby",
    webDev: "integradores.web_dev",
    vfoxpro: "integradores.vfoxpro",
    vb: "integradores.vb",
    nodejs: "integradores.nodejs",
    laravel: "integradores.laravel",
    visualCsharpDll: "integradores.visual_csharp_dll",
    visualBasicDll: "integradores.visual_basic_dll",
    foxproDll: "integradores.foxpro_dll",
    delphiDll: "integradores.delphi_dll",
  },
} as const;

const RUTA_NO_ENCONTRADA = "/404";

function urlNoEncontrada(): string {
  return new URL(RUTA_NO_ENCONTRADA, window.location.origin).toString();
}

function urlNavegable(valor: string | null): string | null {
  if (!valor) {
    return null;
  }

  try {
    const url = new URL(valor);
    return ["http:", "https:"].includes(url.protocol) ? url.toString() : null;
  } catch {
    return null;
  }
}

function navegar(pestana: Window, destino: string): void {
  if (!pestana.closed) {
    pestana.location.replace(destino);
  }
}

export function abrirURLPorClave(clave: string): void {
  const pestana = window.open("about:blank", "_blank");

  if (!pestana) {
    return;
  }

  pestana.opener = null;

  void solicitarURLApi(clave)
    .then((url) => navegar(pestana, urlNavegable(url) ?? urlNoEncontrada()))
    .catch(() => navegar(pestana, urlNoEncontrada()));
}
