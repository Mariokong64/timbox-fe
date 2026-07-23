import { Box } from "@mui/material";
import { BloqueCodigoSoporte } from "../../components/BloqueCodigoSoporte";
import { BloqueContenidoSoporte } from "../../components/BloqueContenidoSoporte";
import { ContactoDudasSoporte } from "../../components/ContactoDudasSoporte";
import { LayoutDocumentacionSoporte } from "../../components/LayoutDocumentacionSoporte";
import { TablaSoporte } from "../../components/TablaSoporte";
import { erroresManifiesto, imagenesDudasManifiesto, menuManifiesto, urlManifiesto } from "./constantes";
import { ejemploPeticionManifiesto, ejemploRespuestaManifiesto } from "./ejemplos";

const encabezado = (
  <Box sx={{ "& p": { my: 1 } }}>
    El encabezado contendrá:
    <p>•RFC del Emisor que firmó el Manifiesto.</p>
    <p>•Fecha en que fue firmado el Manifiesto.</p>
    <p>•Asunto describe el contenido del documento que se firmó</p>
  </Box>
);

const certificado = (
  <Box sx={{ "& p": { my: 1 } }}>
    Contiene los datos del Certificado como:
    <p>•emitido_a: Nombre o Razón social del certificado</p>
    <p>•emitido_por: Indica por quien fue emitido o autorizado el certificado.</p>
    <p>•no_serie: corresponde al número de serie del certificado.</p>
    <p>•validez: Nos indica el periodo de validez del certificado.</p>
  </Box>
);

export function FirmarManifiesto() {
  return (
    <LayoutDocumentacionSoporte categoria="Manifiesto" titulo="Método Firmar_Manifiesto" menu={menuManifiesto} activo="/firmar-manifiesto/">
      <BloqueContenidoSoporte titulo="Enlaces al servicio">
        <p>Pruebas: <a href={urlManifiesto.pruebas}>{urlManifiesto.pruebas}</a></p>
        <p>Producción: <a href={urlManifiesto.produccion}>{urlManifiesto.produccion}</a></p>
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Consumo de créditos">
        <p>Por cada petición: <strong>No Aplica</strong></p>
      </BloqueContenidoSoporte>

      <ContactoDudasSoporte imagen={imagenesDudasManifiesto.uno} />

      <BloqueContenidoSoporte titulo="Petición al servicio">
        <p>El servicio de “firmar_manifiesto”, provee la funcionalidad para generar la firma digital del manifiesto de conocimiento y autorización de la entrega de comprobantes al SAT. Se requieren las credenciales de la cuenta que integra y los datos del contribuyente para generar la firma del documento.</p>
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Parámetros de la petición">
        <TablaSoporte columnas={["Nombre", "Descripción", "Requerido"]} filas={[
          ["username", "Usuario del web service", "Sí"],
          ["password", "Contraseña del web service", "Sí"],
          ["rfc", "Rfc del contribuyente Emisor", "Sí"],
          ["razon_social", "Nombre del emisor", "Sí"],
          ["email", "Correo electrónico del Emisor", "Sí"],
          ["cer_pem", "Contenido del certificado de la FIEL en formato pem.", "Sí"],
          ["llave_pem", "Contenido de la llave de la FIEL en formato pem.", "Sí"],
        ]} />
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Ejemplo de petición al servicio">
        <BloqueCodigoSoporte codigo={ejemploPeticionManifiesto} />
      </BloqueContenidoSoporte>

      <ContactoDudasSoporte imagen={imagenesDudasManifiesto.dos} />

      <BloqueContenidoSoporte titulo="Respuesta del servicio">
        <p>La respuesta del servicio firmar manifiesto la contiene el nodo “firma_manifiesto_result” y este está formado por 3 nodos principales, code, message y manifiesto, los primeros 2 regresaran siempre que la respuesta sea exitosa un “200” y un mensaje de “Manifiesto firmado y enviado exitosamente” respectivamente. El nodo de manifiesto contiene la información del emisor que ha firmado el manifiesto, además de la información que contiene el documento de manifiesto y del certificado.</p>
        <p>Es importante colocar correctamente el correo electrónico en la petición, ya que se enviara el manifiesto firmado en formato PDF.</p>
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Parámetros de respuesta">
        <TablaSoporte columnas={["Nombre", "Descripción"]} filas={[
          ["encabezado", encabezado],
          ["contenido", "Información general que contiene el Manifiesto."],
          ["firma", "Resultado de la firma digital de la información contenida en la cadena original que representa los datos principales del documento del Manifiesto."],
          ["cadena_original", "Información clave del documento Manifiesto."],
          ["certificado", certificado],
        ]} />
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Ejemplo de respuesta exitosa del servicio">
        <BloqueCodigoSoporte codigo={ejemploRespuestaManifiesto} />
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Códigos de error a nivel petición">
        <p>En la siguiente sección se listan los códigos de error que puede regresar el servicio de firmar manifiesto a nivel petición:</p>
        <TablaSoporte columnas={["Código", "Descripción"]} filas={erroresManifiesto} />
      </BloqueContenidoSoporte>
    </LayoutDocumentacionSoporte>
  );
}
