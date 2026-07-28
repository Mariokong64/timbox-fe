import { LayoutDocumentacionPublica } from "../../../../components/LayoutDocumentacionPublica";
import type { ItemMenuDocumentacion } from "../../../../components/LayoutDocumentacionPublica";
import { VistaContenidoAvisoPrivacidadIntegral } from "./VistaContenidoAvisoPrivacidadIntegral";
import { tituloAvisoPrivacidadIntegral } from "./contenidoAvisoPrivacidadIntegral";

const menuAvisoPrivacidadIntegral: ItemMenuDocumentacion[] = [
  {
    texto: tituloAvisoPrivacidadIntegral,
    to: "/aviso-privacidad-integral",
  },
];

export function AvisoPrivacidadIntegral() {
  return (
    <LayoutDocumentacionPublica
      categoria={tituloAvisoPrivacidadIntegral}
      titulo={tituloAvisoPrivacidadIntegral}
      menu={menuAvisoPrivacidadIntegral}
      activo="/aviso-privacidad-integral"
      enlaceRaiz={{ texto: "Políticas", to: "/politicas" }}
      mostrarTitulo={false}
    >
      <VistaContenidoAvisoPrivacidadIntegral />
    </LayoutDocumentacionPublica>
  );
}
