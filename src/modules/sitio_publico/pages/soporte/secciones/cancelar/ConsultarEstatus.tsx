import { BloqueCodigoSoporte } from "../../components/BloqueCodigoSoporte";
import { BloqueContenidoSoporte } from "../../components/BloqueContenidoSoporte";
import { ContactoDudasSoporte } from "../../components/ContactoDudasSoporte";
import { LayoutDocumentacionSoporte } from "../../components/LayoutDocumentacionSoporte";
import { TablaSoporte } from "../../components/TablaSoporte";
import { imagenesDudasCancelar, menuCancelar, regexUuid, urlCancelacion } from "./constantes";

const ejemploPeticion = `<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:WashOut">
   <soapenv:Header/>
   <soapenv:Body>
      <urn:consultar_estatus soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
         <username xsi:type="xsd:string">AAA010101000</username>
         <password xsi:type="xsd:string">h6584D56fVdBbSmmnB</password>
         <uuid xsi:type="xsd:string">97408DA6-95E9-47C7-ABEB-3B055F2B0EF5</uuid>
         <rfc_emisor xsi:type="xsd:string">MISC491214B86</rfc_emisor>
         <rfc_receptor xsi:type="xsd:string">IAD121214B34</rfc_receptor>
         <total xsi:type="xsd:string">1751.60</total>
      </urn:consultar_estatus>
   </soapenv:Body>
</soapenv:Envelope>`;

const ejemploRespuesta = `<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:tns="urn:WashOut">
   <soap:Body>
      <tns:consultar_estatus_response>
         <consultar_estatus_result xsi:type="tns:consultar_estatus_result">
            <codigo_estatus xsi:type="xsd:string">S - Comprobante obtenido satisfactoriamente.</codigo_estatus>
            <es_cancelable xsi:type="xsd:string">Cancelable sin aceptación</es_cancelable>
            <estado xsi:type="xsd:string">Cancelado</estado>
            <estatus_cancelacion xsi:type="xsd:string">Cancelado sin aceptación</estatus_cancelacion>
         </consultar_estatus_result>
      </tns:consultar_estatus_response>
   </soap:Body>
</soap:Envelope>`;

export function ConsultarEstatus() {
  return (
    <LayoutDocumentacionSoporte
      categoria="Cancelar"
      titulo="Método Consultar_Estatus"
      menu={menuCancelar}
      activo="/consultar-estatus/"
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
          Por cada petición de UUID a consultar : <strong>1 crédito</strong> ( solo se descuenta cuando se hace la
          consulta de UUID por primera vez, las peticiones siguientes de un mismo UUID no se descontarán, no importa la
          cantidad de veces que se haga la consulta).
        </p>
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Petición al servicio">
        <p>
          El servicio de “consultar_estatus” se utiliza para la consulta del estatus del CFDI, este servicio pretende
          proveer una forma alternativa de consulta que requiera verificar el estado de un comprobante en bases de datos
          del SAT. Los parámetros que se requieren en la consulta se describen en la siguiente tabla.
        </p>
      </BloqueContenidoSoporte>

      <ContactoDudasSoporte imagen={imagenesDudasCancelar.uno} />

      <BloqueContenidoSoporte titulo="Parámetros de la petición">
        <TablaSoporte
          columnas={["Nombre", "Descripción", "Requerido"]}
          filas={[
            ["username", "Usuario del web service.", "Sí"],
            ["password", "Contraseña del web service.", "Sí"],
            ["rfc_emisor", "El RFC que emitió el comprobante que desea consultar.", "Sí"],
            ["rfc_receptor", "El RFC del receptor del comprobante que desea consultar.", "Sí"],
            [
              "uuid",
              "Se manda el UUID del comprobante que se desea consultar. El UUID debe cumplir con la expresión regular de UUIDs.",
              "Sí",
            ],
            ["total", "Total del comprobante", "Sí"],
          ]}
        />
        <p>
          <strong>Regex de UUIDs:</strong>
        </p>
        <p>{regexUuid}</p>
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Ejemplo de petición al servicio">
        <p>A continuación mostramos un ejemplo de cómo debe ser construida la petición al servicio.</p>
        <BloqueCodigoSoporte codigo={ejemploPeticion} />
      </BloqueContenidoSoporte>

      <ContactoDudasSoporte imagen={imagenesDudasCancelar.dos} />

      <BloqueContenidoSoporte titulo="Respuesta del servicio">
        <p>
          Si hubo un error con alguno de los parámetros o en el servicio de consultar_estatus, se le notificará por
          medio de un mensaje de error, de lo contrario recibirá la estructura “consultar_estatus_result” compuesta de lo
          siguiente:
        </p>
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Parámetros de la respuesta">
        <TablaSoporte
          columnas={["Nombre", "Descripción"]}
          filas={[
            [
              "consultar_estatus",
              "Información del estatus del UUID que se consultó. De esta forma se sabe si fue recibido o no en la Base de Datos del SAT.",
            ],
          ]}
        />
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Ejemplo de respuesta del servicio">
        <p>A continuación mostramos la respuesta que regresa el servicio una vez consumido.</p>
        <BloqueCodigoSoporte codigo={ejemploRespuesta} />
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Mensajes recibidos de la petición al servicio">
        <p>
          Esta tabla muestra los códigos de estatus que obtendremos una vez realizada la petición al servicio de
          consultar_estatus.
        </p>
        <TablaSoporte
          columnas={["Código Estatus", "Descripción", "Observaciones"]}
          filas={[
            [
              "N 601",
              "La expresión impresa proporcionada no es válida",
              "Este código de respuesta se presentará cuando la petición de validación no se haya respetado en el formato definido.",
            ],
            [
              "N 602",
              "Comprobante no encontrado",
              "Este código de respuesta se presentará cuando el UUID del comprobante no se encuentre en la Base de Datos del SAT.",
            ],
            [
              "S",
              "Comprobante obtenido satisfactoriamente",
              "Este código se presentará cuando el UUID del comprobante se encuentre en la Base de Datos del SAT",
            ],
          ]}
        />
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte>
        <p>Esta tabla muestra los estados posibles que puede regresar la consulta de un comprobante</p>
        <TablaSoporte
          columnas={["Estado", "Descripción"]}
          filas={[
            ["No Encontrado", "El comprobante no fue encontrado"],
            ["Vigente", "El comprobante fue encontrado y no ha sido cancelado"],
            ["Cancelado", "El comprobante fue encontrado y ha sido cancelado con anterioridad"],
          ]}
        />

        <p>Esta tabla muestra los tipos de cancelación que el comprobante puede tener</p>
        <TablaSoporte
          columnas={["Es Cancelable", "Descripción"]}
          filas={[
            [
              "Cancelable con Aceptación",
              "El comprobante puede ser cancelado enviando una solicitud la cual puede ser aceptada o rechazada",
            ],
            ["Cancelable sin Aceptación", "El comprobante puede ser cancelado automáticamente"],
            ["No Cancelable", "El comprobante no puede ser cancelado"],
          ]}
        />

        <p>Esta tabla muestra los estatus de cancelación que se pueden obtener al hacer la consulta</p>
        <TablaSoporte
          columnas={["Estatus Cancelación", "Descripción"]}
          filas={[
            ["Cancelado sin aceptación", "El comprobante fue cancelado exitosamente sin requerir aceptación"],
            ["Cancelado con aceptación", "El comprobante fue cancelado aceptando la solicitud de cancelación"],
            [
              "En proceso",
              "El comprobante recibió una solicitud de cancelación y se encuentra en espera de una respuesta o aun no es reflejada",
            ],
            ["Solicitud Rechazada", "El comprobante no se cancelo porque se rechazo la solicitud de cancelación"],
            [
              "Plazo Vencido",
              "El comprobante fue cancelado ya que no se recibió respuesta del receptor en el tiempo límite.",
            ],
          ]}
        />
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Códigos de error a nivel petición">
        <p>Los siguientes códigos de error se generarán a nivel general de la solicitud de consultar estatus:</p>
        <TablaSoporte
          columnas={["Código", "Descripción"]}
          filas={[
            ["CANC001", "Los datos de autentificación enviados son incorrectos"],
            ["CANC002", "Se han agotado la cantidad de timbres"],
            ["CANC003", "Parámetro inválido"],
            [
              "CANC998",
              "Error de comunicación con el servicio del SAT, se genero un timeout en la petición al servicio del SAT",
            ],
            ["CANC999", "Error de comunicación con el servicio de cancelación"],
          ]}
        />
      </BloqueContenidoSoporte>
    </LayoutDocumentacionSoporte>
  );
}
