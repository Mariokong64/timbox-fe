import { Box } from "@mui/material";
import { BloqueCodigoSoporte } from "../../components/BloqueCodigoSoporte";
import { BloqueContenidoSoporte } from "../../components/BloqueContenidoSoporte";
import { ContactoDudasSoporte } from "../../components/ContactoDudasSoporte";
import { LayoutDocumentacionPublica } from "../../../../components/LayoutDocumentacionPublica";
import { TablaSoporte } from "../../components/TablaSoporte";
import { imagenesDudasCancelar, menuCancelar, regexUuid, urlCancelacion } from "./constantes";

const ejemploPeticion = `<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:WashOut">
   <soapenv:Header/>
   <soapenv:Body>
      <urn:cancelar_cfdi soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
         <username xsi:type="xsd:string">user</username>
         <password xsi:type="xsd:string">password</password>
         <rfc_emisor xsi:type="xsd:string">XEXX010101000</rfc_emisor>
         <folios xsi:type="urn:folios">
            <!--Zero or more repetitions:-->
            <folio xsi:type="urn:folio">
               <uuid xsi:type="xsd:string">1d02fb537-3036-4303-a6d7-9013a74d81a5</uuid>
               <rfc_receptor xsi:type="xsd:string">XEXX010101000</rfc_receptor>
               <total xsi:type="xsd:string"></total>
               <motivo xsi:type="xsd:string"></motivo>
               <folio_sustituto xsi:type="xsd:string"></folio_sustituto>
            </folio>
         </folios>
         <cert_pem xsi:type="xsd:string"></cert_pem>
         <llave_pem xsi:type="xsd:string"></llave_pem>
      </urn:cancelar_cfdi>
   </soapenv:Body>
</soapenv:Envelope>`;

const ejemploRespuesta = `<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:tns="urn:WashOut">
   <soap:Body>
      <tns:cancelar_cfdi_response>
         <cancelar_cfdi_result xsi:type="tns:cancelar_cfdi_result">
            <folios_cancelacion xsi:type="xsd:string"><folios_cancelacion type="array">
  <folio_cancelacion>
    <uuid>02DBE20E-4DB3-43FF-9672-CEB903FBB5ED</uuid>
    <codigo>201</codigo>
    <mensaje>Cancelado Exitosamente</mensaje>
  </folio_cancelacion>
</folios_cancelacion>]]></folios_cancelacion>
            <acuse_cancelacion xsi:type="xsd:string"><Acuse Fecha="2019-07-25T13:24:06.056488" RfcEmisor="MISC491214B86">
  <Folios>
    <UUID>02DBE20E-4DB3-43FF-9672-CEB903FBB5ED</UUID>
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
        <DigestValue>CRNc/qZ9taQ9CIhsg+D4YUCxM8IQeshBuwECQT3FstPd+KHayzg7E7Ha/qPXpa14IjR3MZvWB8vQMgd1XwsiIw==</DigestValue>
      </Reference>
    </SignedInfo>
    <SignatureValue>O7je9SM13WHL9DYyQ74WouDmZe5+nqqv1TF4eXa0nyYndnjBknn1vDJLZ7VjSBzMJy8vNqm+uiR91EolYoCGJA==</SignatureValue>
    <KeyInfo><KeyName>BF66E582888CC845</KeyName><KeyValue><RSAKeyValue><Modulus>n5YsGT0w5Z70ONPbqszhExfJU+KY3Bscftc2jxUn4wxpSjEUhnCuTd88OK5QbDW3Mupoc61jr83lRhUCjchFAmCigpC10rEntTfEU+7qtX8ud/jJJDB1a9lTIB6bhBN//X8IQDjhmHrfKvfen3p7RxLrFoxzWgpwKriuGI5wUlU=</Modulus><Exponent>AQAB</Exponent></RSAKeyValue></KeyValue></KeyInfo>
  </Signature>
</Acuse>]]></acuse_cancelacion>
         </cancelar_cfdi_result>
      </tns:cancelar_cfdi_response>
   </soap:Body>
</soap:Envelope>`;

export function CancelarCfdi() {
  return (
    <LayoutDocumentacionPublica categoria="Cancelar" titulo="Método Cancelar CFDI" menu={menuCancelar} activo="/cancelar-cfdi/">
      <BloqueContenidoSoporte titulo="Proceso de Cancelación">
        <p>A partir del 01 de enero de 2022 el SAT modificó el esquema para la cancelación de CFDI’s. A continuación se muestra toda la información relevante y relacionada al proceso de cancelación.</p>
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Modificaciones en el nuevo esquema">
        <p>En el esquema anterior, los campos que debían añadirse a la petición eran los siguientes:</p>
        <Box component="ul" sx={{ mt: 0, pl: 3 }}>
          <li>UUID</li><li>Total</li><li>RFCReceptor</li><li>Certificado en formato PEM</li><li>Llave en formato PEM</li>
        </Box>
        <p>En el nuevo esquema, se añadieron los siguientes campos:</p>
        <Box component="ul" sx={{ mt: 0, pl: 3 }}><li>Motivo</li><li>Folio Sustituto</li></Box>
        <p>Los motivos de cancelación se representan con valores numéricos y son los siguientes:</p>
        <Box sx={{ pl: 3 }}>
          <p>“01” Comprobantes emitidos con errores con relación.</p>
          <p>“02” Comprobantes emitidos con errores sin relación.</p>
          <p>“03” No se llevó a cabo la operación.</p>
          <p>“04” Operación nominativa relacionada en una factura global.</p>
        </Box>
        <p>Esto puede consultarse en la siguiente liga proporcionada por el SAT:</p>
        <p><a href="https://www.sat.gob.mx/consultas/91447/nuevo-esquema-de-cancelacion">https://www.sat.gob.mx/consultas/91447/nuevo-esquema-de-cancelacion</a></p>
        <p>El campo de folio sustituto solo debe añadirse si se declara el motivo de cancelación “01”, en caso contrario este valor debe permanecer vacío.</p>
        <p>Los campos de usuario y contraseña se obtienen en el dashboard de Timbox al crear una cuenta en la siguiente liga: <a href="https://dashboard.timbox.com.mx">https://dashboard.timbox.com.mx</a></p>
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Cancelación del CFDI sin aceptación del receptor:">
        <p>De acuerdo a la regla 2.7.1.39 de la Resolución Miscelánea Fiscal para el 2019, los contribuyentes podrán cancelar un CFDI sin que se requiera la aceptación por parte del receptor en los siguientes supuestos:</p>
        <p>-Que amparen ingresos por un monto de hasta $5,000.00 MXN.</p><p>-Por concepto de nómina.</p><p>-Por concepto de egresos.</p><p>-Por concepto de traslado.</p><p>-Por concepto de ingresos expedidos a contribuyentes del RIF.</p><p>-Emitidos a través de la herramienta electrónica de “Mis cuentas” en el aplicativo “Factura Fácil”.</p><p>-Que amparen retenciones e información de pagos.</p><p>-Expedidos en operaciones realizadas con el público en general de conformidad con la regla 2.7.1.24.</p><p>-Emitidos a residentes en el extranjero para efectos fiscales conforme a la regla 2.7.1.26.</p><p>-A través del adquirente y sector primario (reglas 2.4.3 y 2.7.4.1 de la RMF).</p><p>-Cuando la cancelación se realice dentro de los tres días siguientes a su expedición. *</p>
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Cancelación del CFDI con aceptación del receptor:">
        <p>Los anteriores supuestos no son aplicables para la cancelación con aceptación.</p><p>Para realizar la cancelación con aceptación deberemos esperar un lapso de 24 horas para que cambien el estado a “Cancelación con aceptación” y así el receptor puede aceptar la cancelación.</p><p>Si lo que deseamos es replicar la cancelación por “Plazo vencido” se tendrá que esperar otras 24 horas después de que el estatus es: Cancelación por aceptación.</p>
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Cancelación del CFDI con documentos relacionados:">
        <p>Si el CFDI contiene documentos relacionados, el emisor solo podrá cancelarlo siempre y cuando cancelen los CFDI relacionados y en el mismo momento el CFDI origen y tenga estatus de proceso de cancelación igual a: “Cancelable con o sin aceptación”.</p>
      </BloqueContenidoSoporte>

      <ContactoDudasSoporte imagen={imagenesDudasCancelar.uno} />

      <BloqueContenidoSoporte titulo="Enlaces al servicio">
        <p>Para hacer uso del servicio de cancelación de Timbox se encuentran las siguientes ligas disponibles, dependiendo del ambiente.</p>
        <p>URL de producción: <a href={urlCancelacion.produccion}>{urlCancelacion.produccion}</a></p>
        <p>URL de pruebas: <a href={urlCancelacion.pruebas}>{urlCancelacion.pruebas}</a></p>
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Petición al servicio"><p>El servicio de “cancelar_cfdi” se utiliza para cancelar uno o varios comprobantes que ya fueron timbrados. Se requiere de usuario y contraseña para utilizar el servicio.</p></BloqueContenidoSoporte>
      <BloqueContenidoSoporte titulo="Parámetros de la petición"><TablaSoporte columnas={["Nombre", "Descripción", "Requerido"]} filas={[["username", "Usuario del web service.", "Sí"], ["password", "Contraseña del web service.", "Sí"], ["rfc_emisor", "El rfc que emitió el comprobante que desea cancelar.", "Sí"], ["folios", "Se manda un arreglo con uno o más objetos tipo folio, el cual debe contener los elementos UUID, rfc_receptor y total.", "Sí"], ["cert_pem", "El certificado, en formato pem, que corresponde al emisor del comprobante.", "Sí"], ["llave_pem", "La llave, en formato pem, que corresponde al emisor del comprobante.", "Sí"]]} /></BloqueContenidoSoporte>
      <BloqueContenidoSoporte titulo="Consumo de créditos"><p>Por cada petición de UUID a cancelar: 1 crédito (cuando se haga el uso del servicio cancelar_cfdi, consultar_peticiones_pendientes y procesar_respuesta y dicha petición de cancelación sea exitosa).</p></BloqueContenidoSoporte>

      <ContactoDudasSoporte imagen={imagenesDudasCancelar.dos} />

      <BloqueContenidoSoporte titulo="Parámetros del nodo folios"><TablaSoporte columnas={["Nombre", "Descripción", "Requerido"]} filas={[["uuid", "Se manda el UUID del comprobante que se desea cancelar. El UUID debe cumplir con la expresión regular de UUIDs.", "Sí"], ["rfc_receptor", "El rfc que recibió el comprobante que desea cancelar.", "Sí"], ["total", "Total del comprobante.", "Sí"], ["motivo", "Razón de la cancelación", "Sí"], ["folio_sustituto", "Folio por el cual se va a sustituir", "Opcional"]]} /><p>Regex de UUIDs: {regexUuid}</p></BloqueContenidoSoporte>
      <BloqueContenidoSoporte titulo="Ejemplo de petición al servicio"><p>A continuación mostramos un ejemplo de cómo debe ser construida la petición al servicio.</p><BloqueCodigoSoporte codigo={ejemploPeticion} /></BloqueContenidoSoporte>
      <BloqueContenidoSoporte titulo="Respuesta del servicio"><p>Si hubo un error con alguno de los parámetros o en el servicio de cancelación, se le notificará por medio de un mensaje de error, de lo contrario recibirá la estructura “cancelar_cfdi_result” compuesta de lo siguiente:</p></BloqueContenidoSoporte>
      <BloqueContenidoSoporte titulo="Parámetros de la respuesta"><TablaSoporte columnas={["Nombre", "Descripción"]} filas={[["folios", "Información de los comprobantes cancelados, consiste en UUID, código y mensaje."], ["acuse_cancelacion", "El acuse de cancelación que regresa el SAT."]]} /></BloqueContenidoSoporte>
      <BloqueContenidoSoporte titulo="Ejemplo de respuesta del servicio"><p>A continuación mostramos la respuesta que regresa el servicio una vez invocado.</p><BloqueCodigoSoporte codigo={ejemploRespuesta} /></BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Códigos a nivel folio"><p>Los siguientes códigos de error se repetirán tantas veces como se repita el nodo folios en la solicitud:</p><TablaSoporte columnas={["Código", "Descripción"]} filas={[["201", "Solicitud de cancelación recibida"], ["202", "UUID Previamente cancelado"], ["203", "UUID no corresponde al RFC del Emisor"], ["204", "UUID no aplicable para cancelación"], ["205", "UUID No existe"], ["206", "UUID no corresponde a un CFDI del Sector Primario"], ["207", "No se especificó el motivo de cancelación o el motivo no es válido"], ["208", "Folio Sustitución invalido"], ["209", "Folio Sustitución no requerido"], ["210", "La fecha de solicitud de cancelación es mayor a la fecha de declaración"], ["211", "La fecha de solicitud de cancelación límite para factura global"], ["212", "Relación no válida o inexistente"], ["300", "Usuario No Válido"], ["301", "XML Mal Formado"], ["302", "Sello Mal Formado"], ["304", "Certificado Revocado o Caduco"], ["305", "Certificado Inválido"], ["309", "Certificado Inválido"], ["310", "CSD Inválido"], ["CANC104", "UUID no corresponde al RFC del Receptor"], ["CANC105", "Total no corresponde al CFDI"]]} /></BloqueContenidoSoporte>
      <BloqueContenidoSoporte titulo="Códigos de error a nivel petición"><p>Los siguientes códigos de error se generarán a nivel general de la solicitud de cancelación:</p><TablaSoporte columnas={["Código", "Descripción"]} filas={[["CANC001", "Los datos de autentificación enviados son incorrectos"], ["CANC002", "Se han agotado la cantidad de timbres"], ["CANC003", "Parámetro inválido"], ["CANC301", "El XML recibido no contiene una estructura válida"], ["CANC302", "La llave_pem es una llave inválida"], ["CANC303", "El certificado de sellos no corresponde al emisor"], ["CANC304", "El certificado no se encuentra en la lista de LCO del SAT"], ["CANC305", "La fecha de cancelación no esta dentro de la vigencia de CSD del Emisor"], ["CANC306", "El certificado utilizado es de tipo FIEL No es un CSD"], ["CANC307", "El Certificado no fue expedido por el SAT"], ["CANC308", "Llave privada no corresponde a certificado"], ["CANC309", "El certificado de producción no se puede utilizar en ambiente de pruebas"], ["CANC501", "Hay 499 o más UUIDS en una sola petición"], ["CANC998", "Error de comunicación con el servicio del SAT, se genero un timeout en la petición al servicio del SAT"], ["CANC999", "Error de comunicación con el servicio de cancelación"]]} /><p><strong>CANC309:</strong> Solo aplica para el ambiente de pruebas. Es importante mencionar que para obtener la cancelación exitosa es necesario realizar todo el ciclo desde el timbrado y la cancelación con los certificados de pruebas.</p></BloqueContenidoSoporte>
    </LayoutDocumentacionPublica>
  );
}
