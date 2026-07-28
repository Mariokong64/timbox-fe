import { LayoutDocumentacionPublica } from "../../../../components/LayoutDocumentacionPublica";
import type { ItemMenuDocumentacion } from "../../../../components/LayoutDocumentacionPublica";
import { VistaContenidoDerechosArco } from "./VistaContenidoDerechosArco";
import { tituloDerechosArco } from "./contenidoDerechosArco";

const menuDerechosArco: ItemMenuDocumentacion[] = [
  {
    texto: tituloDerechosArco,
    to: "/derechos-arco",
  },
];

export function DerechosArco() {
  return (
    <LayoutDocumentacionPublica
      categoria={tituloDerechosArco}
      titulo={tituloDerechosArco}
      menu={menuDerechosArco}
      activo="/derechos-arco"
      enlaceRaiz={{ texto: "Políticas", to: "/politicas" }}
      mostrarTitulo={false}
    >
      <VistaContenidoDerechosArco />
    </LayoutDocumentacionPublica>
  );
}
