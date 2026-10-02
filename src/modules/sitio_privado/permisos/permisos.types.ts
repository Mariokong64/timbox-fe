export interface PermisoPantalla {
  pantallaId: string;
  clave: string;
  nombre: string;
  leer: boolean;
  crear: boolean;
  editar: boolean;
  eliminar: boolean;
}

export type AccionPermiso = "leer" | "crear" | "editar" | "eliminar";
