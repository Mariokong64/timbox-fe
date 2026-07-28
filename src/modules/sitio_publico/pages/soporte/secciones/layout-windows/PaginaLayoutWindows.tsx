/* eslint-disable no-irregular-whitespace */
import { BloqueCodigoSoporte } from "../../components/BloqueCodigoSoporte";
import { BloqueContenidoSoporte } from "../../components/BloqueContenidoSoporte";
import { LayoutDocumentacionPublica } from "../../../../components/LayoutDocumentacionPublica";
import { categoriaLayoutWindows, obtenerMenuLayoutWindows } from "./constantes";
import { TablaLayoutWindows, type CeldaLayoutWindows } from "./TablaLayoutWindows";

type RutaLayoutWindows =
  | "/layout-windows/"
  | "/layout-rep-windows/"
  | "/layout-comercio-windows/"
  | "/layout-windows-cartaporte/";

type PaginaLayoutWindowsProps = {
  titulo: string;
  activo: RutaLayoutWindows;
  glosario: readonly (readonly CeldaLayoutWindows[])[];
  atributos: readonly (readonly CeldaLayoutWindows[])[];
  estructura: string;
  tituloEjemplos: string;
  ejemplo: string;
  etiquetaEjemplo?: string;
  tituloCompleto?: string;
  ejemploCompleto?: string;
  bloqueVacio?: string;
  nomenclatura: "div" | "parrafo" | "titulo";
  espacioRojoExtra?: boolean;
  espacioAmarillo?: boolean;
};

export function PaginaLayoutWindows({
  titulo,
  activo,
  glosario,
  atributos,
  estructura,
  tituloEjemplos,
  ejemplo,
  etiquetaEjemplo,
  tituloCompleto,
  ejemploCompleto,
  bloqueVacio,
  nomenclatura,
  espacioRojoExtra = false,
  espacioAmarillo = false,
}: PaginaLayoutWindowsProps) {
  const rotuloNomenclatura = nomenclatura === "titulo"
    ? <h3>Nomenclatura</h3>
    : nomenclatura === "parrafo"
      ? <p><strong>Nomenclatura</strong></p>
      : <div><strong>Nomenclatura</strong></div>;

  return (
    <LayoutDocumentacionPublica
      categoria={categoriaLayoutWindows}
      titulo={titulo}
      menu={obtenerMenuLayoutWindows(activo)}
      activo={activo}
    >
      <BloqueContenidoSoporte titulo="Glosario de Nodos">
        <TablaLayoutWindows datos={glosario} />
        {rotuloNomenclatura}
        <ul>
          <li>
            <span style={{ color: "#ff0000" }}>ROJO</span> = {espacioRojoExtra ? " " : ""}
            Nodos o atributos que son requeridos u obligatorios,  hay casos en los que el nodo puede ser opcional, pero si se declara algún atributo en el nodo, este se convierte en atributo requerido.
          </li>
          <li>
            <span style={{ color: "#f0b900" }}>AMARILLO</span>
            {espacioAmarillo ? " = " : "= "}
            Atributos que no aplican para el tipo de documento.
          </li>
          <li>
            <span style={{ color: "#000000" }}>NEGRO</span> = Nodos y atributos opcionales, en ocasiones estos se hacen obligatorios cuando dependen de otro atributo.
          </li>
        </ul>
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Atributos Requeridos por Nodo">
        <TablaLayoutWindows datos={atributos} />
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Ejemplo de Estructura de Archivo TXT">
        <BloqueCodigoSoporte codigo={estructura} />
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo={tituloEjemplos}>
        {etiquetaEjemplo && <p>{etiquetaEjemplo}</p>}
        <BloqueCodigoSoporte codigo={ejemplo} />
      </BloqueContenidoSoporte>

      {tituloCompleto !== undefined && ejemploCompleto !== undefined && (
        <BloqueContenidoSoporte titulo={tituloCompleto}>
          <BloqueCodigoSoporte codigo={ejemploCompleto} />
          {bloqueVacio !== undefined && <BloqueCodigoSoporte codigo={bloqueVacio} />}
        </BloqueContenidoSoporte>
      )}
    </LayoutDocumentacionPublica>
  );
}

