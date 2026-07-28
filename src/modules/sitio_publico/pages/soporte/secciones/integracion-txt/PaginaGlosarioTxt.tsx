/* eslint-disable no-irregular-whitespace */
import type { ReactNode } from "react";
import { BloqueCodigoSoporte } from "../../components/BloqueCodigoSoporte";
import { BloqueContenidoSoporte } from "../../components/BloqueContenidoSoporte";
import { LayoutDocumentacionPublica } from "../../../../components/LayoutDocumentacionPublica";
import {
  categoriaIntegracionTxt,
  menuIntegracionTxtCfdi,
  menuIntegracionTxtNomina,
} from "./constantes";
import { TablaTxtSoporte, type CeldaTxt } from "./TablaTxtSoporte";

type PaginaGlosarioTxtProps = {
  titulo: string;
  activo: string;
  introduccion?: ReactNode;
  glosario: readonly (readonly CeldaTxt[])[];
  atributos: readonly (readonly CeldaTxt[])[];
  estructura: string;
  ejemploMinimo: string;
  ejemploCompleto: string;
  esNomina?: boolean;
};

export function PaginaGlosarioTxt({
  titulo,
  activo,
  introduccion,
  glosario,
  atributos,
  estructura,
  ejemploMinimo,
  ejemploCompleto,
  esNomina = false,
}: PaginaGlosarioTxtProps) {
  const menu = esNomina ? menuIntegracionTxtNomina : menuIntegracionTxtCfdi;

  return (
    <LayoutDocumentacionPublica categoria={categoriaIntegracionTxt} titulo={titulo} menu={menu} activo={activo}>
      {introduccion && <BloqueContenidoSoporte>{introduccion}</BloqueContenidoSoporte>}

      <BloqueContenidoSoporte titulo="Glosario de Nodos">
        <TablaTxtSoporte datos={glosario} />
        {esNomina
          ? <p><strong>Nomenclatura</strong></p>
          : <div><strong>Nomenclatura</strong></div>}
        <ul>
          <li><span style={{ color: "#ff0000" }}>ROJO</span> = Nodos o atributos que son requeridos u obligatorios,  hay casos en los que el nodo puede ser opcional, pero si se declara algún atributo en el nodo, este se convierte en atributo requerido.</li>
          <li>
            <span style={{ color: "#f0b900" }}>AMARILLO</span>
            {esNomina ? " = Atributos que no aplican para el tipo de documento." : "= Atributos que no aplican para el tipo de documento."}
          </li>
          <li><span style={{ color: "#000000" }}>NEGRO</span> = Nodos y atributos opcionales, en ocasiones estos se hacen obligatorios cuando dependen de otro atributo.</li>
        </ul>
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Atributos Requeridos por Nodo">
        <TablaTxtSoporte datos={atributos} />
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Ejemplo de Estructura de Archivo TXT">
        <BloqueCodigoSoporte codigo={estructura} />
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Ejemplos de Estructura de Archivos txt con Valores">
        <p>Comprobante con datos mínimos</p>
        <BloqueCodigoSoporte codigo={ejemploMinimo} />
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Comprobante completo">
        <BloqueCodigoSoporte codigo={ejemploCompleto} />
      </BloqueContenidoSoporte>
    </LayoutDocumentacionPublica>
  );
}
