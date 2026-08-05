import { LayoutDocumentacionPublica } from "../../../components/LayoutDocumentacionPublica";
import { BloqueContenidoSoporte } from "../../soporte/components/BloqueContenidoSoporte";
import { ContactoDudasSoporte } from "../../soporte/components/ContactoDudasSoporte";
import {
  imagenPreguntasFrecuentesPlanes,
  menuPreguntasFrecuentesPlanes,
  rutaTimbresPrepago,
} from "./constantes";
import { SeparadorPreguntaPlan } from "./SeparadorPreguntaPlan";

export function TimbresPrepago() {
  return (
    <LayoutDocumentacionPublica
      categoria="Preguntas Frecuentes"
      titulo="Timbres Prepago"
      menu={menuPreguntasFrecuentesPlanes}
      activo={rutaTimbresPrepago}
      enlaceRaiz={{ texto: "Planes", to: "/planes" }}
      mostrarTitulo={false}
    >
      <BloqueContenidoSoporte titulo="¿Cuál es la vigencia de los timbres?">
        <p>Los timbres no tienen vigencia.</p>
      </BloqueContenidoSoporte>

      <SeparadorPreguntaPlan />

      <BloqueContenidoSoporte titulo="¿Los timbres son acumulables en prepago?">
        <p>Si, los timbres son acumulables y los puede utilizar en el momento que usted lo requiera.</p>
      </BloqueContenidoSoporte>

      <ContactoDudasSoporte imagen={imagenPreguntasFrecuentesPlanes} />

      <BloqueContenidoSoporte titulo="¿Qué pasa si me termino mis timbres antes de la fecha de vencimiento en la modalidad de Prepago?">
        <p>
          Se tendría que realizar una nueva compra de timbres ya que el sistema no le permitirá realizar ningún timbre
          adicional.
        </p>
      </BloqueContenidoSoporte>

      <SeparadorPreguntaPlan />

      <BloqueContenidoSoporte titulo="¿Cómo puedo saber que estoy por terminar mis timbres? ¿El sistema me avisa de alguna forma?">
        <p>Sí, el sistema le envía un correo de aviso cuando tenga un consumo mayor del 90%.</p>
      </BloqueContenidoSoporte>
    </LayoutDocumentacionPublica>
  );
}
