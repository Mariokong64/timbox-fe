import { LayoutDocumentacionPublica } from "../../../../components/LayoutDocumentacionPublica";
import type { ItemMenuDocumentacion } from "../../../../components/LayoutDocumentacionPublica";
import { VistaContenidoAcuerdoNivelesServicio } from "./VistaContenidoAcuerdoNivelesServicio";
import { tituloAcuerdoNivelesServicio } from "./contenidoAcuerdoNivelesServicio";

const menuAcuerdoNivelesServicio: ItemMenuDocumentacion[] = [
  {
    texto: tituloAcuerdoNivelesServicio,
    to: "/niveles-servicio",
  },
];

export function AcuerdoNivelesServicio() {
  return (
    <LayoutDocumentacionPublica
      categoria={tituloAcuerdoNivelesServicio}
      titulo={tituloAcuerdoNivelesServicio}
      menu={menuAcuerdoNivelesServicio}
      activo="/niveles-servicio"
      enlaceRaiz={{ texto: "Políticas", to: "/politicas" }}
      mostrarTitulo={false}
    >
      <VistaContenidoAcuerdoNivelesServicio />
    </LayoutDocumentacionPublica>
  );
}
