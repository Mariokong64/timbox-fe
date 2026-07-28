import { LayoutDocumentacionPublica } from "../../../../../components/LayoutDocumentacionPublica";
import { VistaPreguntasFrecuentes } from "../componentes/VistaPreguntasFrecuentes";
import { menuPreguntasFrecuentes } from "../menuPreguntasFrecuentes";
import { contenidoFaqAplicativoGratuito } from "./contenidoFaqAplicativoGratuito";

export function FaqAplicativoGratuito() {
  return (
    <LayoutDocumentacionPublica
      categoria="Preguntas Frecuentes"
      titulo="FAQ Aplicativo Gratuito"
      menu={menuPreguntasFrecuentes}
      activo="/preguntas-frecuentes"
      enlaceRaiz={{ texto: "Políticas", to: "/politicas" }}
      mostrarTitulo={false}
    >
      <VistaPreguntasFrecuentes contenido={contenidoFaqAplicativoGratuito} />
    </LayoutDocumentacionPublica>
  );
}
