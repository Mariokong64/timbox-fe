import { LayoutDocumentacionSoporte } from "../../components/LayoutDocumentacionSoporte";
import { menuTimbrar } from "./constantes";

export function TimbrarZip() {
  return (
    <LayoutDocumentacionSoporte
      categoria="Timbrar"
      titulo="Método Timbrar ZIP"
      menu={menuTimbrar}
      activo="/timbrar-zip"
    />
  );
}
