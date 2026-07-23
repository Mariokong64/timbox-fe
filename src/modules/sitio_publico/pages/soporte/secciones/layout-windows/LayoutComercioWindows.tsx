import { atributosComercioWindows, glosarioComercioWindows } from "./datosComercioWindows";
import {
  comercioWindowsCompleto,
  comercioWindowsEstructura,
  comercioWindowsMinimo,
  comercioWindowsVacio,
} from "./ejemplosWindows";
import { PaginaLayoutWindows } from "./PaginaLayoutWindows";

export function LayoutComercioWindows() {
  return (
    <PaginaLayoutWindows
      titulo="Layout Comercio Exterior"
      activo="/layout-comercio-windows/"
      glosario={glosarioComercioWindows}
      atributos={atributosComercioWindows}
      nomenclatura="parrafo"
      espacioAmarillo
      estructura={comercioWindowsEstructura}
      tituloEjemplos="Ejemplos de Estructura de Archivos txt con Valores"
      etiquetaEjemplo="Comprobante con datos mínimos"
      ejemplo={comercioWindowsMinimo}
      tituloCompleto="Comprobante completo"
      ejemploCompleto={comercioWindowsCompleto}
      bloqueVacio={comercioWindowsVacio}
    />
  );
}

