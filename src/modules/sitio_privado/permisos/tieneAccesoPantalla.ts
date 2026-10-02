import { obtenerPermisosEnMemoria } from "../login/servicio/autenticacionServicio";

export function tieneAccesoPantalla(clave: string): boolean {
  const pantalla = obtenerPermisosEnMemoria()?.find((permiso) => permiso.clave === clave);

  return Boolean(pantalla && (
    pantalla.leer || pantalla.crear || pantalla.editar || pantalla.eliminar
  ));
}
