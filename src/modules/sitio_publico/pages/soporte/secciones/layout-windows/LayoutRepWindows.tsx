import { atributosRepWindows, glosarioRepWindows } from "./datosRepWindows";
import { repWindowsEjemplo, repWindowsEstructura } from "./ejemplosWindows";
import { PaginaLayoutWindows } from "./PaginaLayoutWindows";

export function LayoutRepWindows() {
  return (
    <PaginaLayoutWindows
      titulo="Layout REP 2.0"
      activo="/layout-rep-windows/"
      glosario={glosarioRepWindows}
      atributos={atributosRepWindows}
      nomenclatura="titulo"
      espacioRojoExtra
      espacioAmarillo
      estructura={repWindowsEstructura}
      tituloEjemplos="Ejemplos de Estructura de Archivos txt con Valore"
      ejemplo={repWindowsEjemplo}
    />
  );
}

