import { useSyncExternalStore } from "react";
import {
  obtenerPermisosEnMemoria,
  suscribirCambiosPermisos,
} from "../login/servicio/autenticacionServicio";
import type { AccionPermiso, PermisoPantalla } from "./permisos.types";

const sinPermisos: Pick<PermisoPantalla, AccionPermiso> = {
  leer: false,
  crear: false,
  editar: false,
  eliminar: false,
};

export function usePermisosPantalla(clave: string): Pick<PermisoPantalla, AccionPermiso> {
  const permisos = useSyncExternalStore(suscribirCambiosPermisos, obtenerPermisosEnMemoria);
  return permisos?.find((pantalla) => pantalla.clave === clave) ?? sinPermisos;
}
