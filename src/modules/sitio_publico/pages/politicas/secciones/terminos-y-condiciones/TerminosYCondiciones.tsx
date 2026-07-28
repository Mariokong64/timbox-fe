import { LayoutDocumentacionPublica } from "../../../../components/LayoutDocumentacionPublica";
import { menuDocumentacionPoliticas } from "../../componentes/menuDocumentacionPoliticas";
import { ContenidoTerminosYCondiciones } from "./VistaContenidoTerminosYCondiciones";
import { tituloTerminosYCondiciones } from "./contenidoTerminosYCondiciones";

export function TerminosYCondiciones() {
  return (
    <LayoutDocumentacionPublica
      categoria="Términos y condiciones"
      titulo={tituloTerminosYCondiciones}
      menu={menuDocumentacionPoliticas}
      activo="/terminos-condiciones"
      enlaceRaiz={{ texto: "Políticas", to: "/politicas" }}
    >
      <ContenidoTerminosYCondiciones />
    </LayoutDocumentacionPublica>
  );
}
