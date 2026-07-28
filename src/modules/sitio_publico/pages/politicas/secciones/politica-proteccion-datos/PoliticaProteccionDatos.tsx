import { LayoutDocumentacionPublica } from "../../../../components/LayoutDocumentacionPublica";
import type { ItemMenuDocumentacion } from "../../../../components/LayoutDocumentacionPublica";
import { VistaContenidoPoliticaProteccionDatos } from "./VistaContenidoPoliticaProteccionDatos";
import {
  tituloIntroduccionPoliticaProteccionDatos,
  tituloPoliticaProteccionDatos,
} from "./contenidoPoliticaProteccionDatos";

const menuPoliticaProteccionDatos: ItemMenuDocumentacion[] = [
  {
    texto: tituloPoliticaProteccionDatos,
    to: "/proteccion-datos",
  },
];

export function PoliticaProteccionDatos() {
  return (
    <LayoutDocumentacionPublica
      categoria={tituloPoliticaProteccionDatos}
      titulo={tituloIntroduccionPoliticaProteccionDatos}
      menu={menuPoliticaProteccionDatos}
      activo="/proteccion-datos"
      enlaceRaiz={{ texto: "Políticas", to: "/politicas" }}
    >
      <VistaContenidoPoliticaProteccionDatos />
    </LayoutDocumentacionPublica>
  );
}
