import { LayoutDocumentacionPublica } from "../../../../components/LayoutDocumentacionPublica";
import { menuDocumentacionPoliticas } from "../../componentes/menuDocumentacionPoliticas";
import {
  tituloAvisoPrivacidad,
} from "./contenidoAvisoPrivacidad";
import { VistaContenidoAvisoPrivacidad } from "./VistaContenidoAvisoPrivacidad";

export function AvisoPrivacidad() {
  return (
    <LayoutDocumentacionPublica
      categoria="Aviso de Privacidad"
      titulo={tituloAvisoPrivacidad}
      menu={menuDocumentacionPoliticas}
      activo="/aviso-privacidad"
      enlaceRaiz={{ texto: "Políticas", to: "/politicas" }}
    >
      <VistaContenidoAvisoPrivacidad />
    </LayoutDocumentacionPublica>
  );
}
