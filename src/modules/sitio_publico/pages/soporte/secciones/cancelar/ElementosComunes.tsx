import { BloqueContenidoSoporte } from "../../components/BloqueContenidoSoporte";
import { ContactoDudasSoporte } from "../../components/ContactoDudasSoporte";
import { imagenesDudasCancelar, urlCancelacion } from "./constantes";

export function EnlacesCancelacion() {
  return (
    <BloqueContenidoSoporte titulo="Enlaces al servicio">
      <p>
        Pruebas: <a href={urlCancelacion.pruebas}>{urlCancelacion.pruebas}</a>
      </p>
      <p>
        Producción: <a href={urlCancelacion.produccion}>{urlCancelacion.produccion}</a>
      </p>
    </BloqueContenidoSoporte>
  );
}

export function DudasCancelar({ numero }: { numero: keyof typeof imagenesDudasCancelar }) {
  return <ContactoDudasSoporte imagen={imagenesDudasCancelar[numero]} />;
}
