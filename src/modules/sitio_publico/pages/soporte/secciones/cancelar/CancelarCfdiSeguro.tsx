import { BloqueCodigoSoporte } from "../../components/BloqueCodigoSoporte";
import { BloqueContenidoSoporte } from "../../components/BloqueContenidoSoporte";
import { ContactoDudasSoporte } from "../../components/ContactoDudasSoporte";
import { LayoutDocumentacionPublica } from "../../../../components/LayoutDocumentacionPublica";
import { TablaSoporte } from "../../components/TablaSoporte";
import { imagenesDudasCancelar, menuCancelar, urlCancelacion } from "./constantes";

const ejemploPeticion = `<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:WashOut">
   <soapenv:Header/>
   <soapenv:Body>
      <urn:cancelar_cfdi_seguro soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
         <username xsi:type="xsd:string">AAA010101000</username>
         <password xsi:type="xsd:string">h6584D56fVdBbSmmnB</password>
         <firma_base64 xsi:type="xsd:string">PD94bWwgdmVyc2lvbj0iMS4wIj8+CjxDYW5jZWxhY2lvbiB4bWxucz0iaHR0cDovL2NhbmNlbGFjZmQuc2F0LmdvYi5teCIgeG1sbnM6eHNkPSJodHRwOi8vd3d3LnczLm9yZy8yMDAxL1hNTFNjaGVtYSIgeG1sbnM6eHNpPSJodHRwOi8vd3d3LnczLm9yZy8yMDAxL1hNTFNjaGVtYS1pbnN0YW5jZSIgRmVjaGE9IjIwMTktMDctMjVUMTI6MDc6MzAiIFJmY0VtaXNvcj0iTUlTQzQ5MTIxNEI4NiI+PEZvbGlvcz48VVVJRD45NzQwOERBNi05NUU5LTQ3QzctQUJFQi0zQjA1NUYyQjBFRjU8L1VVSUQ+PC9Gb2xpb3M+PC9DYW5jZWxhY2lvbj4K</firma_base64>
      </urn:cancelar_cfdi_seguro>
   </soapenv:Body>
</soapenv:Envelope>`;

const ejemploRespuesta = `<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:tns="urn:WashOut">
   <soap:Body>
      <tns:cancelar_cfdi_seguro_response>
         <cancelar_cfdi_seguro_result xsi:type="tns:cancelar_cfdi_seguro_result">
            <folios_cancelacion xsi:type="xsd:string"><folios_cancelacion type="array">
  <folio_cancelacion>
    <uuid>97408DA6-95E9-47C7-ABEB-3B055F2B0EF5</uuid>
    <codigo>201</codigo>
    <mensaje>Cancelado Exitosamente</mensaje>
  </folio_cancelacion>
</folios_cancelacion>]]></folios_cancelacion>
            <acuse_cancelacion xsi:type="xsd:string"><Acuse Fecha="2019-07-25T14:08:29.0601995" RfcEmisor="MISC491214B86">
  <Folios>
    <UUID>97408DA6-95E9-47C7-ABEB-3B055F2B0EF5</UUID>
    <EstatusUUID>201</EstatusUUID>
  </Folios>
  <Signature xmlns="http://www.w3.org/2000/09/xmldsig#" Id="SelloSAT">
    <SignedInfo>
      <CanonicalizationMethod Algorithm="http://www.w3.org/TR/2001/REC-xml-c14n-20010315"/>
      <SignatureMethod Algorithm="http://www.w3.org/2001/04/xmldsig-more#hmac-sha512"/>
      <Reference URI="">
        <Transforms>
          <Transform Algorithm="http://www.w3.org/TR/1999/REC-xpath-19991116">
            <XPath>not(ancestor-or-self::*[local-name()='Signature'])</XPath>
          </Transform>
        </Transforms>
        <DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha512"/>
        <DigestValue>6Jh0BJiRhGVoFwLRmY7ybbxOvNcGGa572vQ0faxqJg39tYTpJGYjRGmxM3fi7nSLT1upemS/lGBfWmCC8nyP+A==</DigestValue>
      </Reference>
    </SignedInfo>
    <SignatureValue>vxBC/k5d2QQwfHO8cZn9uhI1nz6ScGQfoapLZ2SwkdK87e1GbU/SRRweOz/gE6Brmczk+o8LogUHsr2FkWSctA==</SignatureValue>
    <KeyInfo>
      <KeyName>BF66E582888CC845</KeyName>
      <KeyValue>
        <RSAKeyValue>
          <Modulus>n5YsGT0w5Z70ONPbqszhExfJU+KY3Bscftc2jxUn4wxpSjEUhnCuTd88OK5QbDW3Mupoc61jr83lRhUCjchFAmCigpC10rEntTfEU+7qtX8ud/jJJDB1a9lTIB6bhBN//X8IQDjhmHrfKvfen3p7RxLrFoxzWgpwKriuGI5wUlU=</Modulus>
          <Exponent>AQAB</Exponent>
        </RSAKeyValue>
      </KeyValue>
    </KeyInfo>
  </Signature>
</Acuse>]]></acuse_cancelacion>
         </cancelar_cfdi_seguro_result>
      </tns:cancelar_cfdi_seguro_response>
   </soap:Body>
</soap:Envelope>`;

export function CancelarCfdiSeguro() {
  return (
    <LayoutDocumentacionPublica
      categoria="Cancelar"
      titulo="Método Cancelar_CFDI_Seguro"
      menu={menuCancelar}
      activo="/cancelar-cfdi-seguro/"
    >
      <BloqueContenidoSoporte titulo="Enlaces al servicio">
        <p>
          Pruebas: <a href={urlCancelacion.pruebas}>{urlCancelacion.pruebas}</a>
        </p>
        <p>
          Producción: <a href={urlCancelacion.produccion}>{urlCancelacion.produccion}</a>
        </p>
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Consumo de créditos">
        <p>
          Por cada petición de UUID a cancelar: 1 crédito (cuando se haga un uso del servicio cancelar_cdfi,
          consultar_peticiones_pendientes y procesar_respuesta y dicha petición de cancelación sea exitosa)
        </p>
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Petición al servicio">
        <p>
          El servicio de “cancelar_cfdi_seguro” te permitirá conectarte de manera síncrona (bajo las mismas condiciones
          de seguridad) para realizar cancelaciones de manera automatizada al servicio de Timbox. El usuario debe enviar
          peticiones firmadas utilizando el Certificado de Sello Digital del emisor de los CFDI, bajo el estándar XML
          Digital Signature establecido por el <a href="https://www.w3.org">W3C</a> identificando cada uno de los CFDI
          a cancelar por medio del identificador único incluido en el Timbre Fiscal Digital.
        </p>
        <p>
          Las solicitudes pueden contener de 1 hasta 500 UUID’s por cada petición al servicio y en la misma respuesta
          recibirá el acuse de cancelación o error por cada uno de los UUID’s enviados.
        </p>
      </BloqueContenidoSoporte>

      <ContactoDudasSoporte imagen={imagenesDudasCancelar.uno} />

      <BloqueContenidoSoporte titulo="Parámetros de la petición">
        <TablaSoporte
          columnas={["Nombre", "Descripción", "Requerido"]}
          filas={[
            ["username", "Usuario del web service.", "Sí"],
            ["password", "Contraseña del web service.", "Sí"],
            ["firma_base64", "Solicitud de cancelación firmada en base64 al estándar XML Digital Signature", "Sí"],
          ]}
        />
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Ejemplo de petición al servicio">
        <p>A continuación mostramos un ejemplo de cómo debe ser construida la petición al servicio</p>
        <BloqueCodigoSoporte codigo={ejemploPeticion} />
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Respuesta del servicio">
        <p>
          Si hubo un error con alguno de los parámetros o en el servicio de cancelación, se le notificará por medio de
          un mensaje de error, de lo contrario recibirá la estructura “cancelar_cfdi_seguro_result” compuesta de lo
          siguiente:
        </p>
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Parámetros de la respuesta">
        <TablaSoporte
          columnas={["Nombre", "Descripción"]}
          filas={[
            ["folios_cancelacion", "Información de los comprobantes cancelados. Contiene el UUID"],
            ["acuse_cancelacion", "Contiene el acuse de cancelación que se obtiene desde el servicio del SAT."],
          ]}
        />
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Ejemplo de respuesta del servicio">
        <p>A continuación mostramos la respuesta que regresa el servicio una vez invocado.</p>
        <BloqueCodigoSoporte codigo={ejemploRespuesta} />
      </BloqueContenidoSoporte>

      <ContactoDudasSoporte imagen={imagenesDudasCancelar.dos} />

      <BloqueContenidoSoporte titulo="Código a nivel folio">
        <TablaSoporte
          columnas={["Código", "Descripción"]}
          filas={[
            ["201", "UUID Cancelado exitosamente"],
            ["202", "UUID Previamente cancelado"],
            ["203", "UUID no corresponde al RFC del Emisor"],
            ["204", "UUID no aplicable para cancelación"],
            ["205", "UUID No existe"],
            ["CANC101", "UUID no fue timbrado por Timbox, por lo tanto no se puede cancelar"],
            ["CANC104", "UUID no corresponde al RFC del Receptor"],
            ["CANC105", "Total no corresponde al CFDI"],
          ]}
        />
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Códigos de error a nivel petición">
        <p>Los siguientes códigos de error se generarán a nivel general de la solicitud de cancelación:</p>
        <TablaSoporte
          columnas={["Código", "Descripción"]}
          filas={[
            ["CANC001", "Los datos de autentificación enviados son incorrectos"],
            ["CANC002", "Se han agotado la cantidad de timbres"],
            ["CANC003", "Parámetro inválido"],
            ["CANC301", "El XML recibido no contiene una estructura válida"],
            ["CANC302", "El certificado de producción no se puede utilizar en ambiente de pruebas"],
            ["CANC401", "Error especifico de la estructura de la petición"],
            ["CANC402", "Sello del XML mal formado o inválido"],
            ["CANC403", "Sello del XML no corresponde al Emisor"],
            ["CANC404", "Certificado del XML revocado o caduco"],
            ["CANC405", "Certificado enviado en XML no es válido"],
            ["CANC406", "Uso de certificado en XML de e.firma inválido"],
            ["CANC501", "Hay 499 o más UUIDS en una sola petición"],
            ["CANC998", "Error de comunicación con el servicio del SAT, se genero un timeout en la petición al servicio del SAT"],
            ["CANC999", "Error de comunicación con el servicio de cancelación"],
          ]}
        />
        <p>
          <strong>CANC302.-</strong> Solo aplica para el ambiente de pruebas. Es importante mencionar que para obtener la
          cancelación exitosa es necesario realizar todo el ciclo desde el timbrado y la cancelación con los certificados
          de pruebas.
        </p>
      </BloqueContenidoSoporte>
    </LayoutDocumentacionPublica>
  );
}
