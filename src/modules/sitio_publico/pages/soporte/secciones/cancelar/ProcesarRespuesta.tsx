import { BloqueCodigoSoporte } from "../../components/BloqueCodigoSoporte";
import { BloqueContenidoSoporte } from "../../components/BloqueContenidoSoporte";
import { ContactoDudasSoporte } from "../../components/ContactoDudasSoporte";
import { LayoutDocumentacionSoporte } from "../../components/LayoutDocumentacionSoporte";
import { TablaSoporte } from "../../components/TablaSoporte";
import { imagenesDudasCancelar, menuCancelar, regexUuid, urlCancelacion } from "./constantes";
import { certificadoPem, llavePem } from "./ConsultarPeticionesPendientes";

const sangrarPem = (pem: string) => pem.split("\n").map((linea) => `    ${linea}`).join("\n");

const ejemploPeticion = `<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:WashOut">
   <soapenv:Header/>
   <soapenv:Body>
      <urn:procesar_respuesta soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
       <username xsi:type="xsd:string">AAA010101000</username>
         <password xsi:type="xsd:string">h6584D56fVdBbSmmnB</password>
         <rfc_receptor xsi:type="xsd:string">JES900109Q90</rfc_receptor>
         <respuestas xsi:type="urn:respuestas">
            <!--Zero or more repetitions:-->
            <folios_respuestas xsi:type="urn:folios_respuestas">
               <uuid xsi:type="xsd:string">E4BEBFA1-E809-4232-81D4-4BE402F994EA</uuid>
               <rfc_emisor xsi:type="xsd:string">MISC491214B86</rfc_emisor>
               <total xsi:type="xsd:string">58000000</total>
               <respuesta xsi:type="xsd:string">A</respuesta>
            </folios_respuestas>
         </respuestas>
         <cert_pem xsi:type="xsd:string">-----BEGIN CERTIFICATE-----
${sangrarPem(certificadoPem)}
    -----END CERTIFICATE-----</cert_pem>
         <llave_pem xsi:type="xsd:string">-----BEGIN PRIVATE KEY-----
${sangrarPem(llavePem)}
    -----END PRIVATE KEY-----</llave_pem>
      </urn:procesar_respuesta>
   </soapenv:Body>
</soapenv:Envelope>`;

const ejemploRespuesta = `<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:tns="urn:WashOut">
   <soap:Body>
      <tns:procesar_respuesta_response>
         <procesar_respuesta_result xsi:type="tns:procesar_respuesta_result">
            <folios xsi:type="tns:folios_respuesta">
               <folio_respuesta xsi:type="tns:folio_respuesta">
                  <uuid xsi:type="xsd:string">E4BEBFA1-E809-4232-81D4-4BE402F994EA</uuid>
                  <codigo xsi:type="xsd:string">1000</codigo>
                  <mensaje xsi:type="xsd:string">Aceptacion</mensaje>
               </folio_respuesta>
            </folios>
         </procesar_respuesta_result>
      </tns:procesar_respuesta_response>
   </soap:Body>
</soap:Envelope>`;

export function ProcesarRespuesta() {
  return (
    <LayoutDocumentacionSoporte
      categoria="Cancelar"
      titulo="Método Procesar_Respuesta"
      menu={menuCancelar}
      activo="/procesar-respuesta/"
    >
      <BloqueContenidoSoporte titulo="Enlaces al Servicio">
        <p>Pruebas: <a href={urlCancelacion.pruebas}>{urlCancelacion.pruebas}</a></p>
        <p>Producción: <a href={urlCancelacion.produccion}>{urlCancelacion.produccion}</a></p>
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Consumo de créditos">
        <p><strong>1 crédito,</strong> Si el proceso es usado para aceptar o rechazar la solicitud de cancelación emitida desde Timbox (la cancelación solo se cobra una vez y cuando se realiza el ciclo completo.)</p>
        <p><strong>1 crédito</strong> para las respuestas a procesar de las cancelaciones que se haya hecho desde el SAT y otro PAC)</p>
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Petición al servicio">
        <p>El servicio de “procesar_respuesta” se utiliza para realizar la petición de aceptación/rechazo de la solicitud de cancelación que se encuentra en espera de dicha resolución por parte del receptor del documento al servicio del SAT. Los parámetros requeridos para realizar la petición se describen en la siguiente tabla.</p>
      </BloqueContenidoSoporte>

      <ContactoDudasSoporte imagen={imagenesDudasCancelar.uno} />

      <BloqueContenidoSoporte titulo="Parámetros de la petición">
        <TablaSoporte columnas={["Nombre", "Descripción", "Requerido"]} filas={[
          ["username", "Usuario del web service.", "Sí"],
          ["password", "Contraseña del web service.", "Sí"],
          ["rfc_receptor", "El rfc que recibió el comprobante que desea cancelar.", "Sí"],
          ["respuestas", "Se manda el arreglo con uno o más objetos del tipo folios_respuestas que se compone del UUID, el RFC Emisor, el Total y la Respuesta (Aceptación o Rechazo). El UUID debe cumplir con la expresión regular de UUIDs.", "Sí"],
          ["cert_pem", "El certificado, en formato pem, que corresponde al receptor del comprobante.", "Sí"],
          ["llave_pem", "La llave, en formato pem, que corresponde al receptor del comprobante.", "Sí"],
        ]} />
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Parámetros del nodo respuestas">
        <TablaSoporte columnas={["Nombre", "Descripción", "Requerido"]} filas={[
          ["uuid", "Folio del comprobante que se va aceptar o rechazar para su cancelación", "Sí"],
          ["rfc_emisor", "RFC del emisor del comprobante a cancelar", "Sí"],
          ["total", "Total del comprobante a cancelar", "Sí"],
          ["respuesta", <><span>Parámetro a enviar para aceptar la solicitud de cancelación. Deberá agregar:</span><br /><br /><span>A – Aceptar la solicitud</span><br /><br /><span>R – Rechazar la solicitud</span></>, "Sí"],
        ]} />
        <p><strong>Regex de UUIDs:</strong> {regexUuid}</p>
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Ejemplo de petición al servicio">
        <p>A continuación mostramos un ejemplo de cómo debe ser construida la petición al servicio.</p>
        <BloqueCodigoSoporte codigo={ejemploPeticion} />
      </BloqueContenidoSoporte>

      <ContactoDudasSoporte imagen={imagenesDudasCancelar.dos} />

      <BloqueContenidoSoporte titulo="Respuesta del servicio">
        <p>Si hubo un error con alguno de los parámetros o en el servicio de procesar_respuesta, se le notificará por medio de un mensaje de error, de lo contrario recibirá la estructura “procesar_respuesta_result” compuesta de lo siguiente:</p>
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Parámetros de la respuesta">
        <TablaSoporte columnas={["Nombre", "Descripción"]} filas={[
          ["procesar_respuesta", "Información de la respuesta que envió previamente el receptor para aceptar o rechazar la cancelación."],
        ]} />
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Ejemplo de respuesta exitosa del servicio">
        <p>A continuación mostramos la respuesta que regresa el servicio, donde recibimos el UUID que previamente enviamos en la petición para procesar la respuesta y un código de estatus para el UUID, más adelante describiremos el significado para cada estatus.</p>
        <BloqueCodigoSoporte codigo={ejemploRespuesta} />
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Códigos a nivel folio">
        <TablaSoporte columnas={["Código", "Descripción"]} filas={[
          ["1000", "Se recibió la respuesta de la petición de forma exitosa."],
          ["1001", "No existen peticiones de cancelación en espera de respuesta para el UUID"],
          ["1002", "Ya se recibió una respuesta para la petición de cancelación del UUID"],
          ["1004", "Existen más de una petición de cancelación para el mismo uuid."],
          ["CANC102", "El CFDI ha sido cancelado previamente, no puede ser aceptado"],
          ["CANC103", "El CFDI ha sido cancelado previamente, no puede ser rechazado"],
        ]} />
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Códigos de error a nivel petición">
        <TablaSoporte columnas={["Código", "Descripción"]} filas={[
          ["CANC001", "Los datos de autentificación enviados son incorrectos"],
          ["CANC002", "Se han agotado la cantidad de timbres"],
          ["CANC003", "Parámetro inválido"],
          ["CANC302", "La llave_pem es una llave inválida"],
          ["CANC303", "El certificado de sellos no corresponde al Receptor"],
          ["CANC304", "El certificado no se encuentra en la lista de LCO del SAT"],
          ["CANC305", "La fecha de cancelación no esta dentro de la vigencia de CSD del Receptor"],
          ["CANC306", "El certificado utilizado es de tipo FIEL No es un CSD"],
          ["CANC307", "El Certificado no fue expedido por el SAT"],
          ["CANC308", "Llave privada no corresponde a certificado"],
          ["CANC501", "Hay 499 o más UUIDS en una sola petición"],
          ["CANC998", "Error de comunicación con el servicio del SAT,  se genero un timeout en la petición al servicio del SAT"],
          ["CANC999", "Error de comunicación con el servicio de cancelación"],
        ]} />
      </BloqueContenidoSoporte>
    </LayoutDocumentacionSoporte>
  );
}
