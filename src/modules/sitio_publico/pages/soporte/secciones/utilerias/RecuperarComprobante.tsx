import { BloqueCodigoSoporte } from "../../components/BloqueCodigoSoporte";
import { BloqueContenidoSoporte } from "../../components/BloqueContenidoSoporte";
import { ContactoDudasSoporte } from "../../components/ContactoDudasSoporte";
import { LayoutDocumentacionSoporte } from "../../components/LayoutDocumentacionSoporte";
import { TablaSoporte } from "../../components/TablaSoporte";
import { imagenesDudasUtilerias, menuUtilerias, regexUuid, urlTimbrado } from "./constantes";
import { crearCfdiRecuperado } from "./ejemplosComprobantes";

const ejemploPeticion = `<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:WashOut">
   <soapenv:Header/>
   <soapenv:Body>
      <urn:recuperar_comprobante soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
         <username xsi:type="xsd:string">AAA010101000</username>
         <password xsi:type="xsd:string">h6584D56fVdBbSmmnB</password>
         <uuid xsi:type="urn:recuperar">
            <!--Zero or more repetitions:-->
            <Comprobante xsi:type="urn:Comprobante">
               <uuid xsi:type="xsd:string">C8C1DAB5-B652-4E67-991B-7E085C1F7849</uuid>
            </Comprobante>
         </uuid>
      </urn:recuperar_comprobante>
   </soapenv:Body>
</soapenv:Envelope>`;

const cfdiRecuperado = crearCfdiRecuperado({
  fecha: "2019-07-25T08:57:15",
  sello: "Wo6bLjPSIstphKqBRl2eYhE8KcmtZowNTNGhRWs0GHgyTEv/4AqjL5vQSu2qKoeUzhok2KreN/Iyq2JyT2vxFXNDKnV6a8YkJj8JGDg9azODbUaToWsOVNfrztvSTEHBAvaTBaIyAAxEBcSMXt243HmXmPauZ0TxZ2P/QslHqwucbJGqIYlHeeb+UOLDipbuHfwLQH1f6rJSmcFXtJreqO/9gZo8mEYXYYTCeFKYVcJOsncGY3DQuyc8cFvK3ckVhiOhdvwYaWLcAM9hqdL1I3gto+5eAcDA/stztG+QDiMU/WRbz3kLCPYpt+gN5PaW8JvKc2LWSlZi266jtxMBvw==",
  uuid: "C8C1DAB5-B652-4E67-991B-7E085C1F7849",
  fechaTimbrado: "2019-07-25T10:57:17",
  selloSat: "HBaxVIwKOeANrKSo9/hV994clbx23eQuNFcn0vpCZC+B98UzAUdiY5xleVS7IQpZjMJBiwPdr+g7NS0/A6r+h1eC83Nh2yawC1NckKKkongGTvVzPpj8frpB52kpw8kVGdzCH6L1Dot5V3sCVPex3wjSIlZdD3qyddpvFaL2SXRpH53LPZaVQ3BFnUaS9gC+dgImpQ0fpRKJeWbTrrIJR93eCeVUhHRPHI1aLuExnsFo3Kanv9AHX25fdIZSM27Tm1Pu51STrKulA/VuwGR9tTY9qmg+JqhDKKhQA79wlsQ79Hqzr8INHYhnURErpiFf97ob1DaHfegT3+0zm1gYkw==",
});

const sangrarXml = (xml: string) => xml.split("\n").map((linea) => `    ${linea}`).join("\n");

const ejemploRespuesta = `<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:tns="urn:WashOut">
   <soap:Body>
      <tns:recuperar_comprobante_response>
         <recuperar_comprobante_result xsi:type="tns:recuperar_comprobante_result">
            <estatus xsi:type="xsd:string">200</estatus>
            <cantidad xsi:type="xsd:string">1</cantidad>
            <comprobantes xsi:type="xsd:string"><?xml version="1.0" encoding="UTF-8"?>
<Comprobantes type="array">
  <CFDI>
    <uuid>C8C1DAB5-B652-4E67-991B-7E085C1F7849</uuid>
    <xml><?xml version="1.0" encoding="utf-8"?>
${sangrarXml(cfdiRecuperado)}
    </xml>
  </CFDI>
</Comprobantes>]]></comprobantes>
         </recuperar_comprobante_result>
      </tns:recuperar_comprobante_response>
   </soap:Body>
</soap:Envelope>`;

export function RecuperarComprobante() {
  return (
    <LayoutDocumentacionSoporte categoria="Utilerías" titulo="Método Recuperar_Comprobante" menu={menuUtilerias} activo="/recuperar-comprobante/">
      <BloqueContenidoSoporte titulo="Enlaces al servicio">
        <p>Pruebas: <a href={urlTimbrado.pruebas40}>{urlTimbrado.pruebas40}</a></p>
        <p>Producción: <a href={urlTimbrado.produccion40}>{urlTimbrado.produccion40}</a></p>
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Consumo de créditos">
        <p>Por cada Petición: <strong>No Aplica</strong></p>
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Petición al servicio">
        <p>El servicio “recuperar_comprobante” se utiliza para recuperar uno o varios comprobantes completos (xml) usando los UUIDs. El servicio sólo puede recuperar hasta 200 comprobantes por petición. Es requerido usuario y contraseña para utilizar el servicio.</p>
      </BloqueContenidoSoporte>

      <ContactoDudasSoporte imagen={imagenesDudasUtilerias.uno} />

      <BloqueContenidoSoporte titulo="Parámetros de la petición">
        <TablaSoporte columnas={["Nombre", "Descripción", "Requerido"]} filas={[
          ["username", "Usuario del web service", "Sí"],
          ["password", "Contraseña del web service", "Sí"],
          ["uuids", "Arreglo de objetos que contiene un arreglo de UUID’s a recuperar. Los UUID’s deben cumplir con la expresión regular para poder realizar la búsqueda y se puede enviar un máximo de 200 UUID’s por petición, en caso de que no cumpla con las extensión regular se regresará un mensaje de error.", "Sí"],
        ]} />
        <p><strong>Regex de UUIDs:</strong></p>
        <p>{regexUuid}</p>
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Ejemplo de la petición al servicio">
        <BloqueCodigoSoporte codigo={ejemploPeticion} />
      </BloqueContenidoSoporte>

      <ContactoDudasSoporte imagen={imagenesDudasUtilerias.dos} />

      <BloqueContenidoSoporte titulo="Respuesta del servicio">
        <p>Si hubo un error con alguno de los parámetros o en el servicio de recuperación, se le notificará por medio de un error, de lo contrario recibirá la estructura “recuperar_comprobante_result”.</p>
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Parámetros de repuesta">
        <TablaSoporte columnas={["Nombre", "Descripción"]} filas={[
          ["estatus", "Estatus de la petición, es 200 si fue exitosa."],
          ["cantidad", "Cantidad de comprobantes que se recuperaron con los UUID’s especificados en la petición."],
          ["comprobantes", "Arreglo de objeto CFDI en formato xml."],
          ["uuid", "UUID del comprobante que se buscó"],
          ["xml", "El xml correspondiente al UUID. Si no se encontró un xml con ese UUID se regresa el mensaje “No se encontró XML del uuid: UUID”."],
        ]} />
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Ejemplo de repuesta del servicio">
        <BloqueCodigoSoporte codigo={ejemploRespuesta} />
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Códigos de error nivel petición">
        <TablaSoporte columnas={["Código", "Descripción"]} filas={[
          ["RCS101", "Los datos de autentificación enviados son incorrectos"],
          ["RCS102", "El campo UUID’s está vacío"],
          ["RCS103", "No se pueden recuperar mas de 200 comprobantes por UUID"],
          ["RCS104", "El UUID no tiene una estructura válida"],
          ["RCS999", "Error de comunicación con el servicio de recuperación de comprobantes"],
        ]} />
      </BloqueContenidoSoporte>
    </LayoutDocumentacionSoporte>
  );
}
