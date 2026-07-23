import { atributosCartaPorteWindows, glosarioCartaPorteWindows } from "./datosCartaPorteWindows";
import { cartaPorteWindowsEjemplo, cartaPorteWindowsEstructura } from "./ejemplosWindows";
import { PaginaLayoutWindows } from "./PaginaLayoutWindows";

export function LayoutCartaPorteWindows() {
  return (
    <PaginaLayoutWindows
      titulo="Layout Carta Porte"
      activo="/layout-windows-cartaporte/"
      glosario={glosarioCartaPorteWindows}
      atributos={atributosCartaPorteWindows}
      nomenclatura="div"
      estructura={cartaPorteWindowsEstructura}
      tituloEjemplos="Ejemplos de Estructura de Archivos txt con Valores"
      ejemplo={cartaPorteWindowsEjemplo}
    />
  );
}

