import { BloqueCodigoSoporte } from "../../components/BloqueCodigoSoporte";
import { BloqueContenidoSoporte } from "../../components/BloqueContenidoSoporte";
import { ContactoDudasSoporte } from "../../components/ContactoDudasSoporte";
import { LayoutDocumentacionPublica } from "../../../../components/LayoutDocumentacionPublica";
import { TablaSoporte } from "../../components/TablaSoporte";
import { certificadoPemRetenciones, erroresCancelacionRetenciones, imagenesDudasRetenciones, llavePemRetenciones, menuRetenciones, sangrarPem, urlRetenciones } from "./constantes";

const ejemploPeticion = `<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:WashOut">
   <soapenv:Header/>
   <soapenv:Body>
      <urn:cancelar_masivo soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
         <username xsi:type="xsd:string">AAA010101000</username>
         <password xsi:type="xsd:string">h6584D56fVdBbSmmnB</password>
         <rfcemisor xsi:type="xsd:string">MISC491214B86</rfcemisor>
         <uuids xsi:type="urn:uuid">
            <!--Zero or more repetitions:-->
            <uuid xsi:type="xsd:string">01302547-DBC0-4E95-A478-2A61C8F718FA</uuid>
            <uuid xsi:type="xsd:string">76F58269-4456-47C5-97FA-571B12320E72</uuid>
            <uuid xsi:type="xsd:string">4A194E64-BE2F-4E94-8179-ADE8ACAAF465</uuid>
         </uuids>
         <cert_pem xsi:type="xsd:string">-----BEGIN CERTIFICATE-----
${sangrarPem(certificadoPemRetenciones)}
    -----END CERTIFICATE-----</cert_pem>
         <llave_pem xsi:type="xsd:string">-----BEGIN PRIVATE KEY-----
${sangrarPem(llavePemRetenciones)}
    -----END PRIVATE KEY-----</llave_pem>
      </urn:cancelar_masivo>
   </soapenv:Body>
</soapenv:Envelope>`;

const ejemploRespuesta = `<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:tns="urn:WashOut">
   <soap:Body>
      <tns:cancelar_masivo_response>
         <cancelar_masivo_result xsi:type="tns:cancelar_masivo_result">
            <acuse_cancelacion xsi:type="xsd:string">&lt;?xml version="1.0"?>&lt;SeguimientoCancelacion xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.sat.gob.mx/esquemas/retencionpago/1">&lt;Folio>574A2BE5-FD96-4745-A8E7-D8925FB0333A&lt;/Folio>&lt;/SeguimientoCancelacion></acuse_cancelacion>
            <folio_seguimiento xsi:type="xsd:string">574A2BE5-FD96-4745-A8E7-D8925FB0333A</folio_seguimiento>
         </cancelar_masivo_result>
      </tns:cancelar_masivo_response>
   </soap:Body>
</soap:Envelope>`;

export function CancelarMasivoRetenciones() {
  return (
    <LayoutDocumentacionPublica categoria="Retenciones" titulo="Método Cancelar_Masivo" menu={menuRetenciones} activo="/cancelar-masivo-retenciones/">
      <BloqueContenidoSoporte titulo="Enlaces al servicio">
        <p>Pruebas: <a href={urlRetenciones.pruebas}>{urlRetenciones.pruebas}</a></p>
        <p>Producción: <a href={urlRetenciones.produccion}>{urlRetenciones.produccion}</a></p>
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Consumo de créditos">
        <p>Por cada petición de UUID a cancelar: <strong>1 crédito</strong> (cuando la petición sea la petición de cancelación sea exitosa)</p>
      </BloqueContenidoSoporte>

      <ContactoDudasSoporte imagen={imagenesDudasRetenciones.uno} />

      <BloqueContenidoSoporte titulo="Petición al servicio">
        <p>El servicio de “cancelar_masivo” se utiliza para cancelación de dos hasta 10,000 comprobante de retención que ya fueron timbrados. Se requiere usuario y contraseña para utilizar el servicio.</p>
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Parámetros de la petición">
        <TablaSoporte columnas={["Nombre", "Descripción", "Requerido"]} filas={[
          ["username", "Usuario del web service.", "Sí"],
          ["password", "Contraseña del web service.", "Sí"],
          ["rfcemisor", "El rfc que emitió los comprobantes que desea cancelar.", "Sí"],
          ["uuids", "Se manda los UUID’s de los comprobantes que desea cancelar. Los UUID’s debe de cumplir con la expresión regular de UUID’s y se puede mandar hasta un máximo de 10,000 UUID’s.", "Sí"],
          ["cert_pem", "El certificado, en formato pem, que corresponde al emisor del comprobante.", "Sí"],
          ["llave_pem", "La llave, formato pem, que corresponde al emisor del comprobante.", "Sí"],
        ]} />
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Ejemplo de petición al servicio">
        <p>A continuación mostramos un ejemplo de cómo debe ser construida la petición al servicio.</p>
        <BloqueCodigoSoporte codigo={ejemploPeticion} />
      </BloqueContenidoSoporte>

      <ContactoDudasSoporte imagen={imagenesDudasRetenciones.dos} />

      <BloqueContenidoSoporte titulo="Respuesta del servicio">
        <p>Si hubo un error con alguno de los parámetros o en el servicio de cancelación masiva, se le notificará por medio de un mensaje de error, de lo contrario recibirá la estructura “cancelar_masiva_response” compuesta de lo siguiente:</p>
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Parámetros de la respuesta">
        <TablaSoporte columnas={["Nombre", "Descripción"]} filas={[
          ["folio_seguimiento", "Contiene el folio con el que podremos dar el seguimiento en el método de consulta_acuse_cancelación de los UUID’s enviados a cancelar."],
        ]} />
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Ejemplo de respuesta del servicio">
        <p>A continuación mostramos la respuesta que regresa el servicio una vez invocado.</p>
        <BloqueCodigoSoporte codigo={ejemploRespuesta} />
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Códigos de error a nivel petición">
        <TablaSoporte columnas={["Código", "Descripción"]} filas={erroresCancelacionRetenciones} />
      </BloqueContenidoSoporte>
    </LayoutDocumentacionPublica>
  );
}
