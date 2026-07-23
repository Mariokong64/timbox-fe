import { BloqueCodigoSoporte } from "../../components/BloqueCodigoSoporte";
import { BloqueContenidoSoporte } from "../../components/BloqueContenidoSoporte";
import { ContactoDudasSoporte } from "../../components/ContactoDudasSoporte";
import { LayoutDocumentacionSoporte } from "../../components/LayoutDocumentacionSoporte";
import { TablaSoporte } from "../../components/TablaSoporte";
import { imagenesDudasUtilerias, menuUtilerias, regexUuid, urlTimbrado } from "./constantes";

const ejemploPeticion = `<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:WashOut">
   <soapenv:Header/>
   <soapenv:Body>
<urn:buscar_acuse_recepcion soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
         <username xsi:type="xsd:string">AAA010101000</username>
         <password xsi:type="xsd:string">h6584D56fVdBbSmmnB</password>
         <parametros_acuse xsi:type="urn:parametros_acuse">
            <uuids xsi:type="urn:recuperar">
               <!--Zero or more repetitions:-->
               <Comprobante xsi:type="urn:Comprobante">
                  <uuid xsi:type="xsd:string">CD76E990-0EF2-4C06-BDFB-FA84E250B371</uuid>
               </Comprobante>
            </uuids>
            <fecha_timbrado_inicio xsi:type="xsd:string">?</fecha_timbrado_inicio>
            <fecha_timbrado_fin xsi:type="xsd:string">?</fecha_timbrado_fin>
         </parametros_acuse>
      </urn:buscar_acuse_recepcion>
   </soapenv:Body>
</soapenv:Envelope>`;

const ejemploRespuesta = `<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:tns="urn:WashOut">
   <soap:Body>
      <tns:buscar_acuse_recepcion_response>
         <buscar_acuse_recepcion_result xsi:type="tns:buscar_acuse_recepcion_result">
            <acuses xsi:type="xsd:string"><acuse><?xml version="1.0" encoding="UTF-8"?>
<AcuseRecepcion xmlns="http://recibecfdi.sat.gob.mx">
  <AcuseRecepcionCFDI UUID="02DBE20E-4DB3-43FF-9672-CEB903FBB5ED" CodEstatus="Comprobante recibido satisfactoriamente" Fecha="2019-07-25T12:02:30.4842347" NoCertificadoSAT="20001000000300022323">
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
          <DigestValue>WoNUiHM6SRER0nUuRr9wDa+66wgVO1Y9p/r8QkZfsOZMJoYY3O80gxnI8v/G/d2jfsmXIPTeKOBAApDrvFPLSw==</DigestValue>
        </Reference>
      </SignedInfo>
      <SignatureValue>S3Kd6r0FkVqqE/bfMd8ZMechIns8Sb/F9PBWq3EJi9EJYvMNlZ3FIkLTaTeRs1bmb67W6zLWnRuljSueGW9iZQ==</SignatureValue>
      <KeyInfo>
        <KeyName>00001088888800000031</KeyName>
        <KeyValue>
          <RSAKeyValue>
            <Modulus>ujwIJaMKWWmawqDpHx/OS10pXzEh2SQhY02y64v9Q0+I+0dGlIrjFJeGrsHqAT3JoYnh38Dxwta98t/7++dh2hOgiZEwRignWRIlOgM1MefBHEyY+hi4vHpZgPKq/hJVfHf9nOvlb5UgIHMTCEwrDp3qk9O5XtTEycnWwiqleG0c1J9sfbRxC0gYBHsNTH85OEtSXYMkiWNYNnFbIc7B0sgp2y18jUxUCNFBMMTV0tz2sxRF+V4hblaPjI75RWmvs9E4lD7MVmW3z7LIlSajuSL8eOqoerSkQhPBABIeQenEPQwRTt3ej3XpVaBsOmagIPZZI3RvOVh+5mcXDE5txQ==</Modulus>
            <Exponent>AQAB</Exponent>
          </RSAKeyValue>
        </KeyValue>
      </KeyInfo>
    </Signature>
  </AcuseRecepcionCFDI>
</AcuseRecepcion>
</acuse>]]></acuses>
            <uuids_erroneos xsi:type="tns:uuid"></uuids_erroneos>
            <uuids_no_encontrados xsi:type="tns:uuid"></uuids_no_encontrados>
         </buscar_acuse_recepcion_result>
      </tns:buscar_acuse_recepcion_response>
   </soap:Body>
</soap:Envelope>`;

export function BuscarAcuseRecepcion() {
  return (
    <LayoutDocumentacionSoporte categoria="Utilerías" titulo="Método Buscar_Acuse_Recepción" menu={menuUtilerias} activo="/buscar-acuse-recepcion/">
      <BloqueContenidoSoporte titulo="Proceso para Buscar Acuses de Recepción">
        <p>Para realizar una búsqueda de algún(os) acuse(s) debe tener en cuenta que solo obtendrá los acuses que tengamos registrados en nuestras bases de datos, en caso de que se requiera el acuse de algún UUID que haya sido emitido por otro PAC no se podrá obtener el acuse usando nuestro servicio.</p>
        <p>A continuación listamos las consideraciones para el uso del servicio:</p>
        <ul>
          <li>Deberá considerar solo una de las opciones de búsqueda para obtener resultados concretos. Por lo que si se mezclan los filtros de UUID con las fechas regresará un error. Es recomendable realizar una búsqueda por un listado de UUID’s y no incluir el rango de fechas o en caso contrario solo realizar la búsqueda por rango de fechas y no incluir los UUID’s.</li>
          <li>El servicio regresa como máximo hasta 500 acuses, así mismo el servicio permite realizar la búsqueda agregando hasta 500 uuids. Si omite los filtros de UUID y fechas por defecto el servicio regresa los últimos 500 acuses.</li>
          <li>Los UUID’s que desea consultar deben cumplir con la expresión regular (se especifica más adelante en esta sección) que verifica el UUID sea correcto, en caso contrario recibirá un error con el UUID que no cumplió con esta regla.</li>
          <li>Si un UUID que desea no se encuentra en nuestras bases de datos obtendrá un error que especifica que su UUID no fue encontrado.</li>
          <li>Los parámetros fecha_timbrado_inicio y fecha_timbrado_fin deben cumplir con el formato “YYYY-MM-DD” o si desea agregar horario “YYYY-MM-DDTHH:MM:SS”. Si usa el formato de fecha sin horario el servicio tomará en cuenta por defecto desde la hora 00:00:00 de fecha_timbrado_inicio hasta las 23:59:59 de fecha_timbrado_fin. Por último estos parámetros deben coexistir.</li>
        </ul>
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Enlaces al servicio">
        <p>Pruebas: <a href={urlTimbrado.pruebas40}>{urlTimbrado.pruebas40}</a></p>
        <p>Producción: <a href={urlTimbrado.produccion40}>{urlTimbrado.produccion40}</a></p>
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Consumo de créditos">
        <p>Por cada petición: <strong>No Aplica</strong></p>
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Petición al servicio">
        <p>El servicio de “buscar_acuse_recepcion” se utiliza para obtener el acuse de recepción uno o varios comprobantes que ya fueron enviados al servicio de recepción del SAT. Se requiere de usuario y contraseña para utilizar el servicio.</p>
      </BloqueContenidoSoporte>

      <ContactoDudasSoporte imagen={imagenesDudasUtilerias.uno} />

      <BloqueContenidoSoporte titulo="Parámetros de la petición">
        <TablaSoporte columnas={["Nombre", "Descripción", "Observaciones", "Requerido"]} filas={[
          ["username", "Usuario del web service", "", "Sí"],
          ["password", "Contraseña del web service", "", "Sí"],
          ["parametros_acuse", "Es un parámetro definido para contener los diferentes filtros que desea usar.", "Si omite este parámetro el servicio regresará un error de estructura.", "Sí"],
          ["uuids", "Se manda un arreglo de uno o más UUIDs que se desean cancelar. Los UUIDs deben cumplir con la expresión regular de UUIDs.", "El valor del UUID debe ser válido, si no ingresa valor en la etiqueta se validará contra la expresión regular de UUID. Si ingresa un valor en UUID no debe registrar los parámetros de fechas.", "No"],
          ["fecha_timbrado_inicio", "Fecha de timbrado inicial que desea consultar. La fecha debe cumplir con el formato YYYY-MM-DD o YYYY-MM-DDTHH:MM:SS", "Si ingresa valor en este parámetro debe agregar fecha_timbrado_fin y no registrar UUID.", "No"],
          ["fecha_timbrado_fin", "Fecha de timbrado final que desea consultar. La fecha debe cumplir con el formato YYYY-MM-DD o YYYY-MM-DDTHH:MM:SS", "Si ingresa valor en este parámetro debe agregar fecha_timbrado_inicio y no registrar UUID.", "No"],
        ]} />
        <p><strong>Regex de UUIDs:</strong></p>
        <p>{regexUuid}</p>
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Ejemplo de la petición">
        <p>A continuación mostramos un ejemplo de cómo debe ser construida la petición al servicio.</p>
        <BloqueCodigoSoporte codigo={ejemploPeticion} />
      </BloqueContenidoSoporte>

      <ContactoDudasSoporte imagen={imagenesDudasUtilerias.dos} />

      <BloqueContenidoSoporte titulo="Respuesta del servicio">
        <p>Si hubo un error con alguno de los parámetros o en el servicio de buscar acuses, se le notificará por medio de un mensaje de error, de lo contrario recibirá la estructura “buscar_acuse_recepcion_result” compuesta de lo siguiente:</p>
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Parámetros de respuesta">
        <TablaSoporte columnas={["Nombre", "Descripción"]} filas={[
          ["acuses", "El acuse de recepción que regresa el SAT."],
          ["uuids_erroneos", "Información de los uuid’s que no son válidos o no cumplen con la expresión"],
          ["uuids_no_encontrados", "Información de los uuid’s que no fueron encontrados en BD."],
        ]} />
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Ejemplo de respuesta del servicio">
        <p>A continuación mostramos la respuesta que regresa el servicio una vez realizada la petición.</p>
        <BloqueCodigoSoporte codigo={ejemploRespuesta} />
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Códigos de error nivel petición">
        <p>Se en listan los diferentes códigos de error que el servicio puede regresar.</p>
        <TablaSoporte columnas={["Código", "Descripción"]} filas={[
          ["ACR001", "Los datos de autentificación enviados son incorrectos."],
          ["ACR1000", "No se pueden recuperar más de 500 acuses en una sola petición."],
          ["ACR1001", "No se debe omitir el campo fecha_timbrado_inicio si el campo fecha_timbrado_fin existe."],
          ["ACR1002", "No se debe omitir el campo fecha_timbrado_fin si el campo fecha_timbrado_inicio existe."],
          ["ACR1003", "El campo fecha_timbrado_inicio no cumple con el formato YYYY-MM-DD y/o YYYY-MM-DDTHH:MM:SS."],
          ["ACR1004", "El campo fecha_timbrado_fin no cumple con el formato YYYY-MM-DD y/o YYYY-MM-DDTHH:MM:SS."],
          ["ACR1005", "Favor de realizar la búsqueda por UUID o por fecha de timbrado."],
          ["ACR999", "Error de comunicación con el servicio de búsqueda de acuses."],
        ]} />
      </BloqueContenidoSoporte>
    </LayoutDocumentacionSoporte>
  );
}
