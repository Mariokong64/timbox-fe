import { BloqueCodigoSoporte } from "../../components/BloqueCodigoSoporte";
import { BloqueContenidoSoporte } from "../../components/BloqueContenidoSoporte";
import { ContactoDudasSoporte } from "../../components/ContactoDudasSoporte";
import { LayoutDocumentacionPublica } from "../../../../components/LayoutDocumentacionPublica";
import { TablaSoporte } from "../../components/TablaSoporte";
import { imagenesDudasUtilerias, menuUtilerias, urlTimbrado } from "./constantes";
import { crearCfdiRecuperado } from "./ejemplosComprobantes";

const ejemploPeticion = `<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:WashOut">
   <soapenv:Header/>
   <soapenv:Body>
      <urn:recuperar_comprobante_referencia soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
         <username xsi:type="xsd:string">AAA010101000</username>
         <password xsi:type="xsd:string">h6584D56fVdBbSmmnB</password>
         <external_ids xsi:type="urn:external_id">
            <!--Zero or more repetitions:-->
            <external_id xsi:type="xsd:string">252510</external_id>
         </external_ids>
      </urn:recuperar_comprobante_referencia>
   </soapenv:Body>
</soapenv:Envelope>`;

const cfdiRecuperado = crearCfdiRecuperado({
  fecha: "2019-07-26T09:56:05",
  sello: "E71BIKNDU9LREdlWwHY5Eho9pu5tBHWuPH54iDGEC5viJwh9b19uT7KpdG8A9BZ6dN8jjOo03y0GRVfMwgF+3cbyTpEbQDO7zN6sg/vj0iG6e4wI9X/zEZjbMrU0kRPpYrCD+yhHDv3jJ00R/DIpA26jwZ14ZCNZETUdtiy54AZbGRpUq/V69Ylwkl87xr+R/NGokL4C6Mzi2LqXuozUH8Dol+TArIkxh4Wgt9PM6/eUHWh0rIIoPsoTpcZtnQvcY/il5RsaGMA8Qc1UDKw8Mhl3woZ6qj6mnU/ETDcAHTEs9vktMCb4+vTPzgdVSt1Y3wJOZB4mM/bOvHSWPBKDrA==",
  uuid: "A4DE98DA-8443-4621-B522-D091A403F6AB",
  fechaTimbrado: "2019-07-26T11:56:07",
  selloSat: "ceGBfUFcTF9y8na50oVwMO7YvxkleE94FUTTlu5EpPyOzK+lhMwhopb0yl1PKliph9aNI+5ONtrUz76b2hv9BuoDjTDutWVYvLOiyfF0A46mpEqduXcP5hdSgZSgmXtvzkZ5lYC3tBVgu3Cyh+oDbTGZQwiqarGRnzUqjcfaarKwGXphcAcuh6YJizVwo73MscrrHYsh6Ekx1bQEAQqK8B700xRghTqH4r4iVqgcJnxQlYAaPqpASbPd5ldNUeIM4e1oqplo78yJHrmYSqCmjhftGDE+vQ5t7N46cimYqgOWYPNMGaAmSDQgofopWrgtWvFomdpb1a1kLWG5MD8eLw==",
});

const sangrarXml = (xml: string) => xml.split("\n").map((linea) => `    ${linea}`).join("\n");

const ejemploRespuesta = `<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:tns="urn:WashOut">
   <soap:Body>
      <tns:recuperar_comprobante_referencia_response>
         <recuperar_comprobante_referencia xsi:type="tns:recuperar_comprobante_referencia">
            <estatus xsi:type="xsd:string">200</estatus>
            <cantidad xsi:type="xsd:string">1</cantidad>
            <comprobantes xsi:type="xsd:string"><?xml version="1.0" encoding="UTF-8"?>
<Comprobantes type="array">
  <CFDI>
    <external-id>252510</external-id>
    <xml><?xml version="1.0" encoding="utf-8"?>
${sangrarXml(cfdiRecuperado)}
    </xml>
  </CFDI>
</Comprobantes>]]></comprobantes>
         </recuperar_comprobante_referencia>
      </tns:recuperar_comprobante_referencia_response>
   </soap:Body>
</soap:Envelope>`;

export function RecuperarComprobanteReferencia() {
  return (
    <LayoutDocumentacionPublica categoria="Utilerías" titulo="Método Recuperar_Comprobante_Referencia" menu={menuUtilerias} activo="/recuperar-comprobante-referencia/">
      <BloqueContenidoSoporte titulo="Enlaces al servicio">
        <p>Pruebas: <a href={urlTimbrado.pruebas40}>{urlTimbrado.pruebas40}</a></p>
        <p>Producción: <a href={urlTimbrado.produccion40}>{urlTimbrado.produccion40}</a></p>
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Consumo de créditos">
        <p>Por cada Petición: <strong>No Aplica</strong></p>
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Petición al servicio">
        <p>Al igual que el servicio de “recuperar_comprobante”, el servicio de “recuperar_comprobante_referencia” puede ser utilizado para recuperar uno o varios comprobantes completos (XML) usando los ID’s de su aplicación, es importante mencionar que este parámetro external_id solo permite hasta 30 carácteres. El servicio sólo puede recuperar hasta 200 comprobantes por petición. Es requerido el usuario y contraseña para utilizar el servicio.</p>
      </BloqueContenidoSoporte>

      <ContactoDudasSoporte imagen={imagenesDudasUtilerias.uno} />

      <BloqueContenidoSoporte titulo="Parámetros de la petición">
        <TablaSoporte columnas={["Nombre", "Descripción", "Requerido"]} filas={[
          ["username", "Usuario del web service", "Sí"],
          ["password", "Contraseña del web service", "Sí"],
          ["external_ids", "Se manda un arreglo de external_ids que a su vez es un arreglo de referencias para recuperar.", "Sí"],
        ]} />
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Ejemplo de petición al servicio">
        <BloqueCodigoSoporte codigo={ejemploPeticion} />
      </BloqueContenidoSoporte>

      <ContactoDudasSoporte imagen={imagenesDudasUtilerias.dos} />

      <BloqueContenidoSoporte titulo="Respuesta del servicio">
        <p>Si hubo un error con alguno de los parámetros o en el servicio de recuperar comprobante external_id, notificará por medio de un mensaje de error, de lo contrario recibirá la estructura “recuperar_comprobante_referencia_response”.</p>
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Parámetros de respuesta">
        <TablaSoporte columnas={["Nombre", "Descripción"]} filas={[
          ["estatus", "Estatus de la petición, es 200 si fue exitosa."],
          ["cantidad", "Cantidad de comprobantes que se recuperaron con los UUID’s especificados en la petición."],
          ["comprobantes", "Arreglo de objeto CFDI en formato xml."],
          ["external_id", "external_id del comprobante que se buscó."],
          ["xml", "El xml correspondiente al UUID. En caso de que no se encuentre un comprobante con ese UUID se regresará el siguiente mensaje “No se encontró XML del uuid: UUID”."],
        ]} />
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Ejemplo de respuesta del servicio">
        <BloqueCodigoSoporte codigo={ejemploRespuesta} />
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Códigos de error nivel petición">
        <TablaSoporte columnas={["Código", "Descripción"]} filas={[
          ["RCR101", "Los datos de autentificación enviados son incorrectos"],
          ["404", "Parametro external_id vacio"],
          ["RCR103", "No se pueden recuperar más de 200 comprobantes por ID"],
          ["RCR104", "El valor de external_id no es un valor válido"],
          ["RCR999", "Error de comunicación con el servicio de recuperación de comprobantes con External_id"],
        ]} />
      </BloqueContenidoSoporte>
    </LayoutDocumentacionPublica>
  );
}
