import { BloqueCodigoSoporte } from "../../components/BloqueCodigoSoporte";
import { BloqueContenidoSoporte } from "../../components/BloqueContenidoSoporte";
import { ContactoDudasSoporte } from "../../components/ContactoDudasSoporte";
import { LayoutDocumentacionSoporte } from "../../components/LayoutDocumentacionSoporte";
import { TablaSoporte } from "../../components/TablaSoporte";
import {
  certificadoPemRetenciones,
  codigosFolioRetenciones,
  erroresCancelacionRetenciones,
  imagenesDudasRetenciones,
  llavePemRetenciones,
  menuRetenciones,
  sangrarPem,
  urlRetenciones,
} from "./constantes";

const ejemploPeticion = `<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:WashOut">
   <soapenv:Header/>
   <soapenv:Body>
      <urn:cancelar_retencion soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
         <username xsi:type="xsd:string">AAA010101000</username>
         <password xsi:type="xsd:string">h6584D56fVdBbSmmnB</password>
         <rfcemisor xsi:type="xsd:string">MISC491214B86</rfcemisor>
         <uuids xsi:type="urn:uuid">
            <!--Zero or more repetitions:-->
            <uuid xsi:type="xsd:string">6DB9BD60-38A0-4D94-81A7-102613A584D9</uuid>
         </uuids>
         <cert_pem xsi:type="xsd:string">-----BEGIN CERTIFICATE-----
${sangrarPem(certificadoPemRetenciones)}
    -----END CERTIFICATE-----</cert_pem>
         <llave_pem xsi:type="xsd:string">-----BEGIN PRIVATE KEY-----
${sangrarPem(llavePemRetenciones)}
    -----END PRIVATE KEY-----</llave_pem>
      </urn:cancelar_retencion>
   </soapenv:Body>
</soapenv:Envelope>`;

const ejemploRespuesta = `<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:tns="urn:WashOut">
   <soap:Body>
      <tns:cancelar_retencion_response>
         <cancelar_retencion_result xsi:type="tns:cancelar_retencion_result">
            <acuse_cancelacion xsi:type="xsd:string"><![CDATA[<Acuse Fecha="2018-12-27T12:08:50" RfcEmisor="MISC491214B86"><Folios><UUID>6DB9BD60-38A0-4D94-81A7-102613A584D9</UUID><EstatusUUID>1201</EstatusUUID></Folios><Signature xmlns="http://www.w3.org/2000/09/xmldsig#" Id="SelloSAT"><SignedInfo><CanonicalizationMethod Algorithm="http://www.w3.org/TR/2001/REC-xml-c14n-20010315"/><SignatureMethod Algorithm="http://www.w3.org/2001/04/xmldsig-more#hmac-sha512"/><Reference URI=""><Transforms><Transform Algorithm="http://www.w3.org/TR/1999/REC-xpath-19991116"><XPath>not(ancestor-or-self::*[local-name()='Signature'])</XPath></Transform></Transforms><DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha512"/><DigestValue>ML2rVJ79GS6cQNjRI7wmoRu5aFykTgian5alYvohYhR5Dh3QB43LX1RadDFutgMIM3q60LozLGdtmLVDdnhZsg==</DigestValue></Reference></SignedInfo><SignatureValue>lO73l44krAoObyw+HGI/ychDJa3PpxiqDWZ0tLqUrhDj0E4Dv5mWE1t4wzOST26zJENixF4ZBGAk8Jj+fM8Kuw==</SignatureValue><KeyInfo><KeyName>00001088888800000016</KeyName><KeyValue><RSAKeyValue><Modulus>xnL2zDPtH5jDsAZDTIfMqbKGrve+At8Kyx2EZvbfXbpK9uVExWS874oMelFzNq69/YqSReT3I7I8wr+joy5O7ouZH+4KWdIGp4Si6lHe0kntxzNmuuKyOPkJ9tMcntnFmQ4bfxFxlg/Ud2hCtuoy3j2xYkIXu5O4pGM98Nz8pAM=</Modulus><Exponent>AQAB</Exponent></RSAKeyValue></KeyValue></KeyInfo></Signature></Acuse>]]></acuse_cancelacion>
            <comprobantes_cancelados xsi:type="xsd:string"><![CDATA[<comprobante_cancelado>
      <uuid>6DB9BD60-38A0-4D94-81A7-102613A584D9</uuid>
      <EstatusUUID>Cancelado Exitosamente</EstatusUUID>
    </comprobante_cancelado>]]></comprobantes_cancelados>
         </cancelar_retencion_result>
      </tns:cancelar_retencion_response>
   </soap:Body>
</soap:Envelope>`;

export function CancelarRetenciones() {
  return (
    <LayoutDocumentacionSoporte categoria="Retenciones" titulo="Método Cancelar_Retencion" menu={menuRetenciones} activo="/cancelar-retenciones/">
      <BloqueContenidoSoporte titulo="Enlaces al servicio">
        <p>Pruebas: <a href={urlRetenciones.pruebas}>{urlRetenciones.pruebas}</a></p>
        <p>Producción: <a href={urlRetenciones.produccion}>{urlRetenciones.produccion}</a></p>
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Consumo de créditos">
        <p>Por cada petición de UUID a cancelar: <strong>1 crédito</strong></p>
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Petición al servicio">
        <p>El servicio de “cancelar_retencion” se utiliza para cancelación de un comprobante de retención que ya fue timbrado. Se requiere usuario y contraseña para utilizar el servicio.</p>
      </BloqueContenidoSoporte>

      <ContactoDudasSoporte imagen={imagenesDudasRetenciones.uno} />

      <BloqueContenidoSoporte titulo="Parámetros de la petición">
        <TablaSoporte columnas={["Nombre", "Descripción", "Requerido"]} filas={[
          ["username", "Usuario del web service.", "Sí"],
          ["password", "Contraseña del web service.", "Sí"],
          ["rfcemisor", "El rfc que emitió el comprobante que desea cancelar.", "Sí"],
          ["uuid", "Se manda el UUID del comprobante que desea cancelar. El UUID debe de cumplir con la expresión regular de UUID’s.", "Sí"],
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
        <p>Si hubo un error con alguno de los parámetros o en el servicio de cancelación, se le notificará por medio de un mensaje de error, de lo contrario recibirá la estructura “cancelar_masivo_response” compuesta de lo siguiente:</p>
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Parámetros de la respuesta">
        <TablaSoporte columnas={["Nombre", "Descripción"]} filas={[
          ["uuid", "Información de los comprobantes cancelados. Contiene el UUID"],
          ["acuse_cancelacion", "Contiene el acuse de cancelación que se obtiene desde el servicio del SAT."],
        ]} />
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Ejemplo de respuesta del servicio">
        <p>A continuación mostramos la respuesta que regresa el servicio una vez invocado.</p>
        <BloqueCodigoSoporte codigo={ejemploRespuesta} />
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Códigos a nivel folio">
        <p>Los siguientes códigos de error se repetirán tantas veces como se repita el nodo folios en la solicitud:</p>
        <TablaSoporte columnas={["Código", "Descripción"]} filas={codigosFolioRetenciones} />
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Códigos de error a nivel folio petición">
        <TablaSoporte columnas={["Código", "Descripción"]} filas={erroresCancelacionRetenciones} />
      </BloqueContenidoSoporte>
    </LayoutDocumentacionSoporte>
  );
}
