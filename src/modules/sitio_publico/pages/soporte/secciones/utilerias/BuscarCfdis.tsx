import { BloqueCodigoSoporte } from "../../components/BloqueCodigoSoporte";
import { BloqueContenidoSoporte } from "../../components/BloqueContenidoSoporte";
import { ContactoDudasSoporte } from "../../components/ContactoDudasSoporte";
import { LayoutDocumentacionSoporte } from "../../components/LayoutDocumentacionSoporte";
import { TablaSoporte } from "../../components/TablaSoporte";
import { imagenesDudasUtilerias, menuUtilerias, regexRfc, regexUuid, urlTimbrado } from "./constantes";

const ejemploPeticion = `<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:WashOut">
   <soapenv:Header/>
   <soapenv:Body>
      <urn:buscar_cfdis soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
         <username xsi:type="xsd:string">AAA010101000</username>
         <password xsi:type="xsd:string">h6584D56fVdBbSmmnB</password>
         <parametros_cfdis xsi:type="urn:parametros_cfdis">
            <rfc_emisor xsi:type="xsd:string">?</rfc_emisor>
            <rfc_receptor xsi:type="xsd:string">?</rfc_receptor>
            <fecha_emision_inicio xsi:type="xsd:string">?</fecha_emision_inicio>
            <fecha_emision_fin xsi:type="xsd:string">?</fecha_emision_fin>
            <fecha_timbrado_inicio xsi:type="xsd:string">?</fecha_timbrado_inicio>
            <fecha_timbrado_fin xsi:type="xsd:string">?</fecha_timbrado_fin>
            <cancelado xsi:type="xsd:string"></cancelado>
            <external_id xsi:type="xsd:string">?</external_id>
            <uuid xsi:type="xsd:string">C8C1DAB5-B652-4E67-991B-7E085C1F7849</uuid>
            <folio xsi:type="xsd:string">?</folio>
            <serie xsi:type="xsd:string">?</serie>
            <limit xsi:type="xsd:string">?</limit>
            <offset xsi:type="xsd:string">?</offset>
         </parametros_cfdis>
      </urn:buscar_cfdis>
   </soapenv:Body>
</soapenv:Envelope>`;

const ejemploRespuesta = `<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:tns="urn:WashOut">
   <soap:Body>
      <tns:buscar_cfdis_response>
         <buscar_cfdis_result xsi:type="tns:buscar_cfdis_result">
            <estatus xsi:type="xsd:string">200</estatus>
            <cantidad xsi:type="xsd:string">1</cantidad>
            <comprobantes xsi:type="xsd:string"><![CDATA[<?xml version="1.0" encoding="UTF-8"?>
<comprobantes type="array">
  <cfdi>
    <UUID>C8C1DAB5-B652-4E67-991B-7E085C1F7849</UUID>
    <Serie nil="true"/>
    <Folio nil="true"/>
    <FechaEmision>2019-07-25T08:57:15</FechaEmision>
    <FechaTimbrado>2019-07-25T10:57:17</FechaTimbrado>
    <RFCEmisor>MISC491214B86</RFCEmisor>
    <NombreEmisor>CECILIA MIRANDA SANCHEZ</NombreEmisor>
    <RFCReceptor>IAD121214B34</RFCReceptor>
    <NombreReceptor>IT SW Development Solutions de Mexico S de RL de CV</NombreReceptor>
    <Tipo>Ingreso</Tipo>
    <Estatus>Cancelado</Estatus>
    <FechaCancelacion>2019-07-25 11:01:03</FechaCancelacion>
    <Total type="float">1751.6</Total>
  </cfdi>
</comprobantes>]]></comprobantes>
         </buscar_cfdis_result>
      </tns:buscar_cfdis_response>
   </soap:Body>
</soap:Envelope>`;

export function BuscarCfdis() {
  return (
    <LayoutDocumentacionSoporte categoria="Utilerías" titulo="Método Buscar_ CFDI’s" menu={menuUtilerias} activo="/buscar-cfdis/">
      <BloqueContenidoSoporte titulo="Enlaces al servicio">
        <p>Pruebas: <a href={urlTimbrado.pruebas40}>{urlTimbrado.pruebas40}</a></p>
        <p>Producción: <a href={urlTimbrado.produccion40}>{urlTimbrado.produccion40}</a></p>
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Consumo de créditos">
        <p>Por cada petición: <strong>No Aplica</strong></p>
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Petición al servicio">
        <p>El servicio “buscar_cfdis” puede ser utilizado para buscar comprobantes que cumplan con los parámetros que se indiquen y que le pertenezcan a la empresa, se retornará información principal de los comprobantes encontrados. Es requerido el usuario y contraseña para utilizar el servicio.</p>
      </BloqueContenidoSoporte>

      <ContactoDudasSoporte imagen={imagenesDudasUtilerias.uno} />

      <BloqueContenidoSoporte titulo="Parámetros de la petición">
        <TablaSoporte columnas={["Nombre", "Descripción", "Requerido"]} filas={[
          ["username", "Usuario del web service", "Sí"],
          ["password", "Contraseña del web service", "Sí"],
          ["parámetros", "Parámetros de búsqueda de CFDI’s", "Sí"],
        ]} />
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Parámetros de entrada">
        <TablaSoporte columnas={["Parámetro", "Descripción", "Formato Aceptado", "Requerido"]} filas={[
          ["rfc_emisor", "RFC del emisor del CFDI", "Regex de RFC", "No"],
          ["rfc_receptor", "RFC del receptor del CFDI", "Regex de RFC", "No"],
          ["fecha_emision_inicio", "Parámetro para buscar en un rango la fecha de emisión del comprobante.", <><span>YYYY-MM-DD</span><br /><br /><span>Ej. 2017-12-31</span></>, "Sólo si se incluye fecha_emision_fin"],
          ["fecha_emision_fin", "Parámetro para buscar en un rango la fecha de emisión del comprobante.", <><span>YYYY-MM-DD</span><br /><br /><span>Ej. 2017-12-31</span></>, "Sólo si se incluye fecha_emision_inicio"],
          ["fecha_timbrado_inicio", "Parámetro para buscar en un rango la fecha de timbrado del comprobante.", <><span>YYYY-MM-DD</span><br /><br /><span>Ej. 2017-12-31</span></>, "Sólo si se incluye fecha_timbrado_fin"],
          ["fecha_timbrado_fin", "Parámetro para buscar en un rango la fecha de timbrado del comprobante.", <><span>YYYY-MM-DD</span><br /><br /><span>Ej. 2017-12-31</span></>, "Sólo si se incluye fecha_timbrado_inicio"],
          ["cancelado", "Señalar si se buscarán comprobantes cancelados, no cancelados o todos. Si el valor es “true”, buscará cancelados, si es “false” buscará comprobantes vigentes, si no tiene valor buscará tanto cancelados como no cancelados.", "“true”, “false” o nulo. El valor es un string, no un booleano.", "No"],
          ["external_id", "Parámetro para buscar un comprobante por id en la base de datos del usuario.", "Int", "No"],
          ["uuid", "Parámetro para buscar por UUID.", "Regex de UUID", "No"],
          ["folio", "Parámetro para buscar por folio.", "Libre", "No"],
          ["serie", "Parámetro para buscar por serie.", "Libre", "No"],
        ]} />
        <p><strong>Regex de RFC:</strong></p>
        <p>{regexRfc}</p>
        <p><strong>Regex de UUIDs:</strong></p>
        <p>{regexUuid}</p>
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Ejemplo de petición al servicio">
        <p>A continuación se muestra unos ejemplos de cómo debe ser construida la petición al servicio buscar_cfdi</p>
        <BloqueCodigoSoporte codigo={ejemploPeticion} />
      </BloqueContenidoSoporte>

      <ContactoDudasSoporte imagen={imagenesDudasUtilerias.dos} />

      <BloqueContenidoSoporte titulo="Respuesta del servicio">
        <p>Si hubo un error en la validación de los parámetros o en el servicio de búsqueda se le indicará por medio de un error, de lo contrario se regresará la estructura “buscar_cfdis_result”, con la información de un máximo de hasta 500 comprobantes, la cual tiene la siguiente estructura:</p>
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Parámetros de respuesta">
        <p>La información que se regresa de los comprobantes es la siguiente:</p>
        <TablaSoporte columnas={["Nombre", "Descripción"]} filas={[
          ["estatus", "Estatus de la petición, es 200 si fue exitosa."],
          ["cantidad", "Cantidad de comprobantes que se encontraron con los parámetros especificados en la búsqueda."],
          ["comprobantes", "Información de los comprobantes encontrados en formato XML."],
          ["folio", "Folio del comprobante"],
          ["serie", "Serie del comprobante."],
          ["external_id", "Id de la base datos del usuario."],
          ["uuid", "UUID del comprobante"],
          ["rfc_emisor", "RFC del emisor del comprobante."],
          ["nombre_emisor", "Nombre del emisor del comprobante."],
          ["rfc_receptor", "RFC del receptor del comprobante."],
          ["nombre_receptor", "Nombre del receptor del comprobante."],
          ["total", "Cantidad del total del comprobante."],
          ["fecha_emision", "Fecha en la que se emitió el comprobante."],
          ["fecha_timbrado", "Fecha en la que se timbró el comprobante."],
          ["estatus", "Estatus del comprobante encontrado, puede ser Vigente o Cancelado."],
          ["fecha_cancelacion", "Fecha en la que se canceló el comprobante. En caso que el comprobante se encuentra vigente, no aparecerá este campo."],
        ]} />
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Ejemplo de respuesta del servicio">
        <BloqueCodigoSoporte codigo={ejemploRespuesta} />
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Códigos de error nivel petición">
        <p>En el siguiente listado se muestra los códigos de error correspondiente del método buscar_cfdi.</p>
        <TablaSoporte columnas={["Código", "Descripción"]} filas={[
          ["BCS101", "Los datos de autentificación enviados son incorrectos"],
          ["BCS201", "No se debe omitir el campo fecha_timbrado_inicio si el campo fecha_timbrado_fin existe."],
          ["BCS202", "No se debe omitir el campo fecha_timbrado_fin si el campo fecha_timbrado_inicio existe."],
          ["BCS203", "El campo fecha_timbrado_inicio no cumple con el formato YYYY-MM-DD"],
          ["BCS204", "El campo fecha_timbrado_fin no cumple con el formato YYYY-MM-DD"],
          ["BCS205", "Id de la base datos del usuario."],
          ["BCS205", "No se debe omitir el campo fecha_emision_inicio si el campo fecha_emision_fin existe."],
          ["BCS206", "No se debe omitir el campo fecha_emision_fin si el campo fecha_emision_inicio existe"],
          ["BCS207", "El campo fecha_emision_inicio no cumple con el formato YYYY-MM-DD"],
          ["BCS208", "El campo fecha_emision_fin no cumple con el formato YYYY-MM-DD."],
          ["BCS209", "El UUID no cumple con el formato de UUID’s"],
          ["BCS210", "El valor de external_id no es un valor válido, debe ser un entero"],
          ["BCS211", "La estructura del RFC_Emisor es incorrecta"],
          ["BCS212", "La estructura del RFC_Receptor es incorrecta"],
          ["BCS213", "El parámetro cancelado solo puede tener valor de ‘true’, ‘false’ y ‘nulo’"],
          ["BCS215", "El valor de limit debe ser un valor entre 1 y 500."],
          ["BCS216", "El valor de offset debe ser un valor mayor a 0."],
          ["BCS217", "El valor de offset no es un valor válido, debe ser un entero."],
          ["BCS999", "Error de comunicación con el servicio de búsqueda de cfdis."],
        ]} />
      </BloqueContenidoSoporte>
    </LayoutDocumentacionSoporte>
  );
}
