import { LayoutDocumentacionPublica } from "../../../components/LayoutDocumentacionPublica";
import { BloqueContenidoSoporte } from "../../soporte/components/BloqueContenidoSoporte";
import { ContactoDudasSoporte } from "../../soporte/components/ContactoDudasSoporte";
import {
  imagenPreguntasFrecuentesPlanes,
  menuPreguntasFrecuentesPlanes,
  rutaTimbresBajoDemanda,
} from "./constantes";
import { SeparadorPreguntaPlan } from "./SeparadorPreguntaPlan";

export function TimbresBajoDemanda() {
  return (
    <LayoutDocumentacionPublica
      categoria="Preguntas Frecuentes"
      titulo="Timbres Bajo demanda"
      menu={menuPreguntasFrecuentesPlanes}
      activo={rutaTimbresBajoDemanda}
      enlaceRaiz={{ texto: "Planes", to: "/planes" }}
      mostrarTitulo={false}
    >
      <BloqueContenidoSoporte titulo="¿En qué consiste la modalidad bajo demanda?">
        <p>
          Usted sólo paga lo consumido al término de un periodo de un mes, los timbres son ilimitados y el costo del
          timbre será fijo.
        </p>
      </BloqueContenidoSoporte>

      <SeparadorPreguntaPlan />

      <BloqueContenidoSoporte titulo="¿Cómo puedo obtener el costo del timbrado?">
        <p>
          Es necesario solicitar una cotización con el aproximado del monto de timbres que consume mensualmente y
          proporcionar los siguientes datos: RFC, razón social, nombre, correo para poder entregar la propuesta
        </p>
      </BloqueContenidoSoporte>

      <ContactoDudasSoporte imagen={imagenPreguntasFrecuentesPlanes} />

      <BloqueContenidoSoporte titulo="¿Cuánto tiempo tengo para pagar después de mi fecha de corte?">
        <p>
          Una vez realizado el corte de su plan contará con 7 días de prórroga para realizar el pago. Después de esos
          días si aún no se ha realizado el pago la cuenta será suspendida.
        </p>
      </BloqueContenidoSoporte>

      <SeparadorPreguntaPlan />

      <BloqueContenidoSoporte titulo="¿Cómo puedo contratar el timbrado bajo demanda?">
        <p>
          Es necesario hacer el registro en nuestra página web con sus datos fiscales y registrar una tarjeta de débito
          o crédito para domiciliar el pago.
        </p>
        <p>*Es importante tomar en cuenta que para este plan hay un requerimiento mínimo de 200 timbres mensuales (No acumulables).</p>
        <p>**El timbrado bajo demanda puede ser contratado por empresas que busquen un proveedor de timbrado de respaldo.</p>
      </BloqueContenidoSoporte>
    </LayoutDocumentacionPublica>
  );
}
