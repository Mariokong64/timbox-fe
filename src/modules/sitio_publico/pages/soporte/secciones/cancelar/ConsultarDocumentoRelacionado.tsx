import { BloqueCodigoSoporte } from "../../components/BloqueCodigoSoporte";
import { BloqueContenidoSoporte } from "../../components/BloqueContenidoSoporte";
import { LayoutDocumentacionSoporte } from "../../components/LayoutDocumentacionSoporte";
import { TablaSoporte } from "../../components/TablaSoporte";
import { DudasCancelar, EnlacesCancelacion } from "./ElementosComunes";
import { erroresPeticionReceptor, menuCancelar, regexUuid } from "./constantes";

const peticion = `<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:WashOut">
 <soapenv:Header/>
 <soapenv:Body>
 <urn:consultar_documento_relacionado soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
 <username xsi:type="xsd:string">AAA010101000</username>
 <password xsi:type="xsd:string">h6584D56fVdBbSmmnB</password>
<uuid xsi:type="xsd:string">3C1424D7-A274-472D-977F-09315749BC09</uuid>
 <rfc_receptor xsi:type="xsd:string">JES900109Q90</rfc_receptor>
 <cert_pem xsi:type="xsd:string">-----BEGIN CERTIFICATE-----
MIIFrjCCA5agAwIBAgIUMzAwMDEwMDAwMDA0MDAwMDI0MzYwDQYJKoZIhvcNAQEL
BQAwggErMQ8wDQYDVQQDDAZBQyBVQVQxLjAsBgNVBAoMJVNFUlZJQ0lPIERFIEFE
TUlOSVNUUkFDSU9OIFRSSUJVVEFSSUExGjAYBgNVBAsMEVNBVC1JRVMgQXV0aG9y
aXR5MSgwJgYJKoZIhvcNAQkBFhlvc2Nhci5tYXJ0aW5lekBzYXQuZ29iLm14MR0w
GwYDVQQJDBQzcmEgY2VycmFkYSBkZSBjYWRpejEOMAwGA1UEEQwFMDYzNzAxCzAJ
BgNVBAYTAk1YMRkwFwYDVQQIDBBDSVVEQUQgREUgTUVYSUNPMREwDwYDVQQHDAhD
T1lPQUNBTjERMA8GA1UELRMIMi41LjQuNDUxJTAjBgkqhkiG9w0BCQITFnJlc3Bv
bnNhYmxlOiBBQ0RNQS1TQVQwHhcNMTkwNjE3MTk1NDAyWhcNMjMwNjE3MTk1NDAy
WjCB1TEiMCAGA1UEAxMZSklNRU5FWiBFU1RSQURBIFNBTEFTIEEgQTEiMCAGA1UE
KRMZSklNRU5FWiBFU1RSQURBIFNBTEFTIEEgQTEiMCAGA1UEChMZSklNRU5FWiBF
U1RSQURBIFNBTEFTIEEgQTElMCMGA1UELRMcSkVTOTAwMTA5UTkwIC8gS0FITzY0
MTEwMUIzOTEeMBwGA1UEBRMVIC8gS0FITzY0MTEwMUhOVExLUzA2MSAwHgYDVQQL
ExdKaW1lbmV6IEVzdHJhZGEgU2FsYXMgMTCCASIwDQYJKoZIhvcNAQEBBQADggEP
ADCCAQoCggEBAM/sSlyARDs52sGMTgfyBGLIJRTI9p0EW9NZeAuhSukgziLqABIg
RZTPRmsULZghrEqxtjY5b33f251Ydy+Dpszjma5ezpjfM/YpIvfWdogOiuL3BYye
A/nqBlIYfbGLrt5/v1KlKGQx+lvTawMEG/7sKuJO+Yxi0XvvtWqlj5vm0dC72hA+
+GWbHTkb3MSFRPNz82UaN/m7A7Ao8+QAmCfdH0uPl7AeU0SwmbXZDh+1knW+IwBK
nGE12GAPn0XxbBUNFjdLlxrwptBPjGQwPg1WbytDMONAMjyQBbx3tGjUqmsq0AGB
D5KpFktnALBrdzxmSl4b4kmCzZ8WgC4WZWUCAwEAAaMdMBswDAYDVR0TAQH/BAIw
ADALBgNVHQ8EBAMCBsAwDQYJKoZIhvcNAQELBQADggIBALMZ1jCJxLQ87syZ2pCL
YXSCa54YIZzeE/svurvql5cM9KP/zlHJoxVzB5R792SDgmOr4q1bUZ4jDEY6/ttd
kIV+YYq46RnA6FPMGyw2ky7FyiTZEOIy5A6EQfFFnaNaShZp+XERq5YACTjo1ahi
YAe+5zrDEJUuaz43GYjeXthFUS8YlqnG3wMSUq4whAipkdmRzq4s/FpKN0mkcGKy
ELAhrkdbyyj/6+Lle2NfoDC8HWV7IxgLwGmStrweMqchjOEy+7iZGj4ORlw2gudw
ZCQjhiPhkci/JVSoWkq7z3RzK/AKqJhGJhx3v46olMawyxzyD/72tECAtciKvCXw
gaZde0bnft2a/A4JuPo7siFJ/2MY2tcbYWcgpuIRklOhHSKGyaPJcIoSzECjGTeR
E/ghOzhOMWHair3ehE+4pc8+4pqXbblWcVw+XblztxoSVX+L4zyqzLnH9t9N5p45
WZvzXruozbcmOZX1pLp9nLCSZOw86sYPYz5er73BarFKTfaqG4JQm6iCrNdSbx3K
SrnB1s3B8kCTjPoRyGcAg+syvPaBSvNzumiRoIRoOoYwoyKwogL/54nopp6LmEUv
vHvn8I+rzZx67pChIi67298tIBo0lVMCrUqZ+yhaRwDDuzMCdd7xwOdjl8rFF1zV
R1fjaus+T/JdN7IjzV3lY9ha
-----END CERTIFICATE-----</cert_pem>
 <llave_pem xsi:type="xsd:string">-----BEGIN PRIVATE KEY-----
MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDP7EpcgEQ7OdrB
jE4H8gRiyCUUyPadBFvTWXgLoUrpIM4i6gASIEWUz0ZrFC2YIaxKsbY2OW9939ud
WHcvg6bM45muXs6Y3zP2KSL31naIDori9wWMngP56gZSGH2xi67ef79SpShkMfpb
02sDBBv+7CriTvmMYtF777VqpY+b5tHQu9oQPvhlmx05G9zEhUTzc/NlGjf5uwOw
KPPkAJgn3R9Lj5ewHlNEsJm12Q4ftZJ1viMASpxhNdhgD59F8WwVDRY3S5ca8KbQ
T4xkMD4NVm8rQzDjQDI8kAW8d7Ro1KprKtABgQ+SqRZLZwCwa3c8ZkpeG+JJgs2f
FoAuFmVlAgMBAAECggEAIueuDB1UVwT9XmSpbNgKOHMVFoouLGng6HgqmPk41C43
rNDPtjtIsxSg47T9en6cp+Vxi2TU/LKp8Z46U/Wr+NV0pTsxP6So2nhJcIXGXEzk
r/l8KwET9c59xSZrY3TppFyZx8wGHdvuBaBWZKk58e+/u0I6zoCAXmf9cqvckfU+
VgxMJx07xFVezfeVPN7ZpM3agRC1hLIHqY+zTH3tYlz+wJyR//43vZA2x/7vGh1f
dYA1QsKxSw14IcIougKsKNv8V+tunjgdYhibM5Q57e+lcefMVXhLZip7YbmQf4qa
mW8wJcrA3PGCr7KB/H0726JWVzsNr1a2+zyKKqUyeQKBgQDxJFJ9766lGlskfOuu
2jcmhlhkBe1FZZJCXUNGycLwWy++8BiRw1oS+XlMrYC/FkasnodjlL/jiCdBKlnj
Zf9njW//9YiUyYgUbdatbMR/LiGio3qmiee8mWUGI369wvNhjNMo/Ji+kkE//aDP
tBkvGMZJtM67Eld4qzA5vw/w9wKBgQDcu/yZJqC7gBbmRny0ZYh22sKww5L9V7fZ
HR2AJK7iArKn2OXcKwctc5CNBB3hF5HDkbIBqo3WuwXcVdBLk7tVMHJKnPq/c9Qs
skiJDg0ZzSjmXm35T2slrRVGs4XrOH4QgubzFZfin3XadsrCY/o5yRsj2nVi6dDD
bsSwdsPhgwKBgQDB09ZS0ANrRmIYVCkFJPXLi5Uk4Pa1H02O9nQLREXi+QjJyyeU
kpemRMzRa2zfK8KnIc3lpz0OYPRclvQlqmi/DZsG/I9KOSuecCNsxs6zA5uZpRoD
HzocCJiBdKp9UWRb9twMR+1m0RyNmQpXqYXMq3dG64R4LegNYFylLgRcRQKBgQCs
PnUJ/T6HkZhM8Mv26RPnyyUJUlOtJXntDe8rQ3TEIF7Q40va1iivqvItV/0I3J9+
AH7rFe/AlAgquzvi/dC81SUaXAy+wN/cUPKRIEnQzGsR+LXQSczOhZWIqiXiOx8E
O2GEZmEzEkOgyfnGXsWvueJXw+y91r51AkaxfLu1iQKBgQDes28092V0xQoQF6JH
A48hfW+cac8wWlVcWpAtUvYL1wjmCU73ln79kbFf4gc79jWy+yqcCI8AlONf+iU5
cFuju13aY9lBpNHlfxnQXEMDxy+uEAfjZnZmOapI6On739cTWq3guvuk6qki8gbf
aLHvag9/00szkf0g37nQA8B3Ug==
-----END PRIVATE KEY-----</llave_pem>
 </urn:consultar_documento_relacionado>
 </soapenv:Body>
</soapenv:Envelope>`;

const respuesta = `<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:tns="urn:WashOut">
   <soap:Body>
      <tns:consultar_documento_relacionado_response>
         <consultar_documento_relacionado_result xsi:type="tns:consultar_documento_relacionado_result">
            <resultado xsi:type="xsd:string">WS Consulta CFDI relacionados RfcReceptor: JES900109Q90 - folio físcal: 3C1424D7-A274-472D-977F-09315749BC09 - Clave: 2000 - Se encontraron CFDI relacionados</resultado>
            <relacionados_padres xsi:type="xsd:string"/>
            <relacionados_hijos xsi:type="xsd:string"><![CDATA[<uuids_hijo type="array">
  <uuid_hijo>
    <uuid>408BD458-DD5C-4F1C-B37D-FDC89817CAB4</uuid>
    <rfc-emisor>MISC491214B86</rfc-emisor>
    <rfc-receptor>JES900109Q90</rfc-receptor>
  </uuid_hijo>
</uuids_hijo>]]></relacionados_hijos>
         </consultar_documento_relacionado_result>
      </tns:consultar_documento_relacionado_response>
   </soap:Body>
</soap:Envelope>`;

export function ConsultarDocumentoRelacionado() {
  return (
    <LayoutDocumentacionSoporte categoria="Cancelar" titulo="Método Consultar_Documento_Relacionado" menu={menuCancelar} activo="/consultar-documento-relacionado/">
      <EnlacesCancelacion />
      <BloqueContenidoSoporte titulo="Consumo de créditos"><p>Por cada petición: 1 crédito.</p></BloqueContenidoSoporte>
      <BloqueContenidoSoporte titulo="Petición al servicio"><p>El servicio de “consultar_documento_relacionado” se utiliza para realizar la consulta al servicio del SAT para revisar si el documento a consultar tiene documentos relacionados.</p></BloqueContenidoSoporte>
      <DudasCancelar numero="uno" />
      <BloqueContenidoSoporte titulo="Parámetros de la petición"><TablaSoporte columnas={["Nombre", "Descripción", "Requerido"]} filas={[["username", "Usuario del web service", "Sí"], ["password", "Contraseña del web service", "Sí"], ["rfc_receptor", "El rfc que emitió el comprobante que desea cancelar.", "Sí"], ["uuid", "Se manda el UUID del comprobante que se desea consultar. El UUID debe cumplir con la expresión regular de UUIDs.", "Sí"], ["cert_pem", "El certificado, en formato pem, que corresponde al receptor del comprobante.", "Sí"], ["llave_pem", "La llave, en formato pem, que corresponde al receptor del comprobante.", "Sí"]]} /><p>Regex de UUIDs:</p><p>{regexUuid}</p></BloqueContenidoSoporte>
      <BloqueContenidoSoporte titulo="Ejemplo de petición al servicio"><p>A continuación mostramos un ejemplo de cómo debe ser construida la petición al servicio.</p><BloqueCodigoSoporte codigo={peticion} /></BloqueContenidoSoporte>
      <DudasCancelar numero="dos" />
      <BloqueContenidoSoporte titulo="Respuesta del servicio"><p>Si hubo un error con alguno de los parámetros o en el servicio de consultar_relacionados, se le notificará por medio de un mensaje de error, de lo contrario recibirá la estructura “consultar_relacionados_result” compuesta de lo siguiente:</p></BloqueContenidoSoporte>
      <BloqueContenidoSoporte titulo="Parámetros de la repuesta"><TablaSoporte columnas={["Nombre", "Descripción"]} filas={[["consultar_relacionados", "Información de los documentos relacionados al UUID consultado, dividos por UuidsRelacionadosPadres y UuidsRelacionadosHijos según corresponda."]]} /></BloqueContenidoSoporte>
      <BloqueContenidoSoporte titulo="Ejemplo de respuesta del servicio"><p>A continuación mostramos la respuesta que regresa el servicio, en donde se mostraran los UUID’s que tenga documentos relacionados.</p><BloqueCodigoSoporte codigo={respuesta} /></BloqueContenidoSoporte>
      <BloqueContenidoSoporte titulo="Mensajes recibidos de la petición al servicio"><p>Esta tabla muestra los códigos que obtendremos una vez realizada la petición de consulta cfdi relacionados.</p><TablaSoporte columnas={["Código", "Descripción"]} filas={[["2000", "Existen cfdi relacionados al folio fiscal."], ["2001", "No existen cfdi relacionados al folio fiscal."], ["2002", "El folio fiscal no pertenece al receptor."], ["1101", "No existen peticiones para el RFC Receptor."]]} /></BloqueContenidoSoporte>
      <BloqueContenidoSoporte titulo="Códigos de error a nivel petición"><p>Los siguientes códigos de error se generarán a nivel general de la solicitud de cancelación:</p><TablaSoporte columnas={["Código", "Descripción"]} filas={erroresPeticionReceptor.map(([codigo, descripcion]) => [codigo, descripcion.replace("receptor.", "Receptor").replace("receptor", "Receptor").replace(/\.$/, "")])} /></BloqueContenidoSoporte>
    </LayoutDocumentacionSoporte>
  );
}
