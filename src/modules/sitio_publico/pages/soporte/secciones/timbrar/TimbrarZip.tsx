import { LayoutDocumentacionPublica } from "../../../../components/LayoutDocumentacionPublica";
import { menuTimbrar } from "./constantes";

export function TimbrarZip() {
  return (
    <LayoutDocumentacionPublica
      categoria="Timbrar"
      titulo="Método Timbrar ZIP"
      menu={menuTimbrar}
      activo="/timbrar-zip"
    />
  );
}
