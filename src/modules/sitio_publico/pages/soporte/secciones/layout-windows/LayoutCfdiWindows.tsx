import { atributosCfdiWindows, glosarioCfdiWindows } from "./datosCfdiWindows";
import { cfdiWindowsCompleto, cfdiWindowsEstructura, cfdiWindowsMinimo } from "./ejemplosWindows";
import { PaginaLayoutWindows } from "./PaginaLayoutWindows";

export function LayoutCfdiWindows() {
  return (
    <PaginaLayoutWindows
      titulo="Layout windows"
      activo="/layout-windows/"
      glosario={glosarioCfdiWindows}
      atributos={atributosCfdiWindows}
      nomenclatura="div"
      estructura={cfdiWindowsEstructura}
      tituloEjemplos="Ejemplos de Estructura de Archivos txt con Valores"
      etiquetaEjemplo="Comprobante con datos mínimos"
      ejemplo={cfdiWindowsMinimo}
      tituloCompleto="Comprobante completo"
      ejemploCompleto={cfdiWindowsCompleto}
    />
  );
}

