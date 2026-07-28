import { LayoutDocumentacionPublica } from "../../../../../components/LayoutDocumentacionPublica";
import { VistaPreguntasFrecuentes } from "../componentes/VistaPreguntasFrecuentes";
import { menuPreguntasFrecuentes } from "../menuPreguntasFrecuentes";
import { contenidoWebService } from "./contenidoWebService";

export function WebService() {
  return (
    <LayoutDocumentacionPublica
      categoria="Preguntas Frecuentes"
      titulo="Web Service"
      menu={menuPreguntasFrecuentes}
      activo="/web-service"
      enlaceRaiz={{ texto: "Políticas", to: "/politicas" }}
      mostrarTitulo={false}
    >
      <VistaPreguntasFrecuentes contenido={contenidoWebService} />
    </LayoutDocumentacionPublica>
  );
}
