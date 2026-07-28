import { BloqueCodigoSoporte } from "../../components/BloqueCodigoSoporte";
import { BloqueContenidoSoporte } from "../../components/BloqueContenidoSoporte";
import { ContactoDudasSoporte } from "../../components/ContactoDudasSoporte";
import { LayoutDocumentacionPublica } from "../../../../components/LayoutDocumentacionPublica";
import { TablaSoporte } from "../../components/TablaSoporte";
import { codigosFolioRetenciones, imagenesDudasRetenciones, menuRetenciones, urlRetenciones } from "./constantes";

const ejemploPeticion = `<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:WashOut">
   <soapenv:Header/>
   <soapenv:Body>
      <urn:consulta_acuse_cancelacion soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
         <username xsi:type="xsd:string">AAA010101000</username>
         <password xsi:type="xsd:string">h6584D56fVdBbSmmnB</password>
         <folioSeguimiento xsi:type="xsd:string">51411BEB-E6A2-4DC7-B2AD-0EAA6B32B3DF</folioSeguimiento>
      </urn:consulta_acuse_cancelacion>
   </soapenv:Body>
</soapenv:Envelope>`;

const ejemploRespuesta = `<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:tns="urn:WashOut">
   <soap:Body>
      <tns:consulta_acuse_cancelacion_response>
         <consulta_acuse_cancelacion_result xsi:type="tns:consulta_acuse_cancelacion_result">
            <acuse_cancelacion xsi:type="xsd:string"><![CDATA[<?xml version="1.0"?><Acuse xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" Fecha="2019-06-30T15:41:49.9035554" RfcEmisor="MISC491214B86" WorkProcessId="12e8ec96-0b20-4c6f-986e-010374d9710c" xmlns="http://www.sat.gob.mx/esquemas/retencionpago/1"><Folios><UUID>A59375FF-D8FD-442C-93B4-55FE9BED5DBF</UUID><EstatusUUID>1201</EstatusUUID></Folios><Folios><UUID>1FA5878A-1264-4CF2-82A0-C403736385E8</UUID><EstatusUUID>1201</EstatusUUID></Folios><Folios><UUID>3C4CF0C5-92AC-42B7-990C-04F94D8AAF8E</UUID><EstatusUUID>1201</EstatusUUID></Folios><Folios><UUID>791C6A03-7AAD-48AE-A57E-D3766C3BDB95</UUID><EstatusUUID>1201</EstatusUUID></Folios><Signature Id="SelloSAT" xmlns="http://www.w3.org/2000/09/xmldsig#"><SignedInfo><CanonicalizationMethod Algorithm="http://www.w3.org/TR/2001/REC-xml-c14n-20010315" /><SignatureMethod Algorithm="http://www.w3.org/2001/04/xmldsig-more#hmac-sha512" /><Reference URI=""><Transforms><Transform Algorithm="http://www.w3.org/TR/1999/REC-xpath-19991116"><XPath>not(ancestor-or-self::*[local-name()='Signature'])</XPath></Transform></Transforms><DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha512" /><DigestValue>4sKyWGdEi963uAkf+cyjte+eVTxf+n7z2Pko2haVkGHpJbRo/Birhv7xQlJmcPNf8n8F8LOz4WygVoGWQzFXnA==</DigestValue></Reference></SignedInfo><SignatureValue>jFmYm6dBBXzMqngEgcY2tzWPyDqqQuaNhO7/Nm7xJXN9KK4nwRczgbUEq5zkAMnuMewGVMzYQml2DpEQx0d1WQ==</SignatureValue><KeyInfo><KeyName>BF66E582888CC845</KeyName><KeyValue><RSAKeyValue><Modulus>n5YsGT0w5Z70ONPbqszhExfJU+KY3Bscftc2jxUn4wxpSjEUhnCuTd88OK5QbDW3Mupoc61jr83lRhUCjchFAmCigpC10rEntTfEU+7qtX8ud/jJJDB1a9lTIB6bhBN//X8IQDjhmHrfKvfen3p7RxLrFoxzWgpwKriuGI5wUlU=</Modulus><Exponent>AQAB</Exponent></RSAKeyValue></KeyValue></KeyInfo></Signature></Acuse>]]></acuse_cancelacion>
            <comprobantes_cancelados xsi:type="xsd:string"><![CDATA[<comprobante_cancelado>
      <uuid>A59375FF-D8FD-442C-93B4-55FE9BED5DBF</uuid>
      <EstatusUUID>Cancelado Exitosamente</EstatusUUID>
    </comprobante_cancelado><comprobante_cancelado>
      <uuid>1FA5878A-1264-4CF2-82A0-C403736385E8</uuid>
      <EstatusUUID>Cancelado Exitosamente</EstatusUUID>
    </comprobante_cancelado><comprobante_cancelado>
      <uuid>3C4CF0C5-92AC-42B7-990C-04F94D8AAF8E</uuid>
      <EstatusUUID>Cancelado Exitosamente</EstatusUUID>
    </comprobante_cancelado><comprobante_cancelado>
      <uuid>791C6A03-7AAD-48AE-A57E-D3766C3BDB95</uuid>
      <EstatusUUID>Cancelado Exitosamente</EstatusUUID>
    </comprobante_cancelado><comprobante_cancelado>
    </comprobante_cancelado>]]></comprobantes_cancelados>
         </consulta_acuse_cancelacion_result>
      </tns:consulta_acuse_cancelacion_response>
   </soap:Body>
</soap:Envelope>`;

export function ConsultarAcuseCancelacion() {
  return (
    <LayoutDocumentacionPublica categoria="Retenciones" titulo="Método Consulta_Acuse_Cancelación" menu={menuRetenciones} activo="/consultar-acuse-cancelacion/">
      <BloqueContenidoSoporte titulo="Enlaces al servicio">
        <p>Pruebas: <a href={urlRetenciones.pruebas}>{urlRetenciones.pruebas}</a></p>
        <p>Producción: <a href={urlRetenciones.produccion}>{urlRetenciones.produccion}</a></p>
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Consumo de créditos">
        <p>Por cada petición: <strong>No Aplica</strong></p>
      </BloqueContenidoSoporte>

      <ContactoDudasSoporte imagen={imagenesDudasRetenciones.uno} />

      <BloqueContenidoSoporte titulo="Petición al servicio">
        <p>El servicio de “consulta_acuse_cancelacion” se utiliza para consultar los uuid que fueron enviados a cancelar desde el servicio “cancelar_masivo”. Se requiere usuario y contraseña para utilizar el servicio.</p>
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Parámetros de la petición">
        <TablaSoporte columnas={["Nombre", "Descripción", "Requerido"]} filas={[
          ["username", "Usuario del web service.", "Sí"],
          ["password", "Contraseña del web service.", "Sí"],
          ["folioSeguimiento", "Es el código con el que podrán dar seguimiento a los uuid que fueron enviados a cancelar.", "Sí"],
        ]} />
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Ejemplo de petición al servicio">
        <p>A continuación mostramos un ejemplo de cómo debe ser construida la petición al servicio.</p>
        <BloqueCodigoSoporte codigo={ejemploPeticion} />
      </BloqueContenidoSoporte>

      <ContactoDudasSoporte imagen={imagenesDudasRetenciones.dos} />

      <BloqueContenidoSoporte titulo="Respuesta del servicio">
        <p>Si hubo un error con alguno de los parámetros o en el servicio de cancelación, se le notificará por medio de un mensaje de error, de lo contrario recibirá la estructura “consulta_acuse_response” compuesta de lo siguiente: Parámetros de la respuesta:</p>
        <TablaSoporte columnas={["Nombre", "Descripción"]} filas={[
          ["comprobantes_cancelados", "Contiene la información del estatus de cada uno de los UUID’s que fueron enviados a cancelar"],
        ]} />
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Ejemplo de respuesta del servicio">
        <BloqueCodigoSoporte codigo={ejemploRespuesta} />
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Códigos a nivel folio">
        <p>Los siguientes códigos de error se repetirán tantas veces como se repita el nodo folios en la solicitud:</p>
        <TablaSoporte columnas={["Código", "Descripción"]} filas={codigosFolioRetenciones} />
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Códigos de error a nivel petición">
        <TablaSoporte columnas={["Código", "Descripción"]} filas={[
          ["CCR001", "Los datos de autentificación enviados son incorrectos"],
          ["CCR002", "Se han agotado la cantidad de timbres"],
          ["CCR003", "El folio de seguimiento no tiene una estructura válida"],
          ["CCR101", "Solicitud en proceso, Intenta más tarde"],
          ["CCR102", "Folio de seguimiento no existe"],
          ["CCR103", "Acuse de cancelación con los códigos descritos anteriormente"],
          ["CCR999", "Error de comunicación con el servicio de consulta de acuse de cancelación"],
        ]} />
      </BloqueContenidoSoporte>
    </LayoutDocumentacionPublica>
  );
}
