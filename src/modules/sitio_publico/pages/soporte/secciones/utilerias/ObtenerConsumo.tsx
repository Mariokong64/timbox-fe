import { BloqueCodigoSoporte } from "../../components/BloqueCodigoSoporte";
import { BloqueContenidoSoporte } from "../../components/BloqueContenidoSoporte";
import { ContactoDudasSoporte } from "../../components/ContactoDudasSoporte";
import { LayoutDocumentacionPublica } from "../../../../components/LayoutDocumentacionPublica";
import { TablaSoporte } from "../../components/TablaSoporte";
import { imagenesDudasUtilerias, menuUtilerias, urlTimbrado } from "./constantes";

const ejemploPeticion = `<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:WashOut">
   <soapenv:Header/>
   <soapenv:Body>
      <urn:obtener_consumo soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
         <username xsi:type="xsd:string">AAA010101000</username>
         <password xsi:type="xsd:string">h6584D56fVdBbSmmnB</password>
      </urn:obtener_consumo>
   </soapenv:Body>
</soapenv:Envelope>`;

const ejemploRespuesta = `<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:tns="urn:WashOut">
   <soap:Body>
      <tns:obtener_consumo_response>
         <obtener_consumo_result xsi:type="tns:obtener_consumo_result">
            <plan_actual xsi:type="xsd:string">Prepago</plan_actual>
            <creditos_asignados xsi:type="xsd:int">5000</creditos_asignados>
            <creditos_usados xsi:type="xsd:int">703</creditos_usados>
            <inicio_plan xsi:type="xsd:string">2018-09-10</inicio_plan>
            <fin_plan xsi:type="xsd:string">2020-09-09</fin_plan>
         </obtener_consumo_result>
      </tns:obtener_consumo_response>
   </soap:Body>
</soap:Envelope>`;

export function ObtenerConsumo() {
  return (
    <LayoutDocumentacionPublica categoria="Utilerías" titulo="Método Obtener_Consumo" menu={menuUtilerias} activo="/obtener-consumo/">
      <BloqueContenidoSoporte titulo="Enlaces al servicio">
        <p>Pruebas 3.3: <a href={urlTimbrado.pruebas33}>{urlTimbrado.pruebas33}</a></p>
        <p>Pruebas 4.0: <a href={urlTimbrado.pruebas40}>{urlTimbrado.pruebas40}</a></p>
        <p>Producción 3.3: <a href={urlTimbrado.produccion33}>{urlTimbrado.produccion33}</a></p>
        <p>Producción 4.0: <a href={urlTimbrado.produccion40}>{urlTimbrado.produccion40}</a></p>
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Consumo de créditos">
        <p>Por cada petición: <strong>No Aplica</strong></p>
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Petición al servicio">
        <p>El servicio de “obtener_consumo” se utiliza para obtener el consumo de su plan actual, así como la cantidad de créditos usados y la vigencia del plan. Es requerido usuario y contraseña para utilizar el servicio.</p>
      </BloqueContenidoSoporte>

      <ContactoDudasSoporte imagen={imagenesDudasUtilerias.uno} />

      <BloqueContenidoSoporte titulo="Parámetros de la petición">
        <TablaSoporte columnas={["Nombre", "Descripción", "Requerido"]} filas={[
          ["username", "Usuario del web service", "Sí"],
          ["password", "Contraseña del web service", "Sí"],
        ]} />
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Ejemplo de la petición al servicio">
        <BloqueCodigoSoporte codigo={ejemploPeticion} />
      </BloqueContenidoSoporte>

      <ContactoDudasSoporte imagen={imagenesDudasUtilerias.dos} />

      <BloqueContenidoSoporte titulo="Respuesta del servicio">
        <p>Si hubo un error con alguno de los parámetros o en el servicio de obtener consumo, notificará por medio de un mensaje de error, de lo contrario recibirá la estructura “obtener_consumo_result”.</p>
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Parámetros de respuesta del servicio">
        <TablaSoporte columnas={["Nombre", "Descripción"]} filas={[
          ["plan_actual", "Nombre del plan que se tiene contratado."],
          ["creditos_asignados", "Total de créditos que se le asignaron con el plan."],
          ["creditos_usados", "Total de créditos utilizados."],
          ["inicio_plan", "Fecha de inicio del plan con formato YYYY-MM-DD."],
          ["fin_plan", "Fecha de fin del plan con formato YYYY-MM-DD."],
        ]} />
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Ejemplo de respuesta del servicio">
        <BloqueCodigoSoporte codigo={ejemploRespuesta} />
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Código de error nivel petición">
        <TablaSoporte columnas={["Código", "Descripción"]} filas={[
          ["CON101", "Los datos de autentificación enviados son incorrectos"],
          ["CON102", "No se encontró actividad para este usuario"],
          ["CON999", "Error de comunicación con el servicio de obtener_consumo"],
        ]} />
      </BloqueContenidoSoporte>
    </LayoutDocumentacionPublica>
  );
}
