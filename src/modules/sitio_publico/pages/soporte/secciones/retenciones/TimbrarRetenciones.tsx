import { BloqueCodigoSoporte } from "../../components/BloqueCodigoSoporte";
import { BloqueContenidoSoporte } from "../../components/BloqueContenidoSoporte";
import { ContactoDudasSoporte } from "../../components/ContactoDudasSoporte";
import { LayoutDocumentacionSoporte } from "../../components/LayoutDocumentacionSoporte";
import { TablaSoporte } from "../../components/TablaSoporte";
import { certificadoPemRetenciones, imagenesDudasRetenciones, menuRetenciones, urlRetenciones } from "./constantes";

const selloCfdi = "IwATv080qK6JGLFSdje6mB7J3xSY0bRJMnITScA0M+8guxi6Bo762nqAK6VXi2fKnT7/11WiBvYb7e+dv5s9+/9XMskpd+Rfdg5Gj82f0aIn0Nyi8aKPSeWzccO405Z5kqGsHC4+7MNL5nc0/An2nLykcT9NVKvCB9k5UZeziwIqwqKWJJ6ATupELX6aXrdMqCfZh0PH5g7BGubm5XYow77mJ9vfc1TtdUt5uaZ9qwGW6BaJn8xYPFZKb+3Y1pD7uRKfJvwwiu2M8Ctu7T4UXWrTCPs1F+0CpISj39k/bdphMpD7pDueRV2dc9VR5G50Lh6cNWsxOU66+LBN204KyQ==";
const selloSat = "Y9GMssNt9Vjesd3KNSCDuQob+k3tluPDgO4xZq3QBb2TxYQ7d1a7DXBhyfUrVtDjrf0fQl22vsjInZCHAi85i4u5lVeY8/maVTyUuPntYD4tXLwnSGhnwA1D05AVKvBJU3UGHRZDli+LJUW3vYKflWVHcWQnbsFDeg1dXpc0x/JGAosj426GGIGazubpW+mwItNVuPak3iErX7273VHcDgIvwNBYc+uv5NeEYN85ncOZLDOzE+OdYZV0yZpvWUusRrZe/yAQ/qYhsuXvUN6r1KBTtyjXJLSY7dmXt+vOuDWFmiGalXfbT/I3SXQsGxbBeeEuxU3gbNcaG0fM7lQ5Mg==";
const certificado = certificadoPemRetenciones.replace(/\n/g, "");

const comprobanteBase64 = "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHJldGVuY2lvbmVzOlJldGVuY2lvbmVzIHhtbG5zOnJldGVuY2lvbmVzPSJodHRwOi8vd3d3LnNhdC5nb2IubXgvZXNxdWVtYXMvcmV0ZW5jaW9ucGFnby8xIiB4bWxuczp4c2k9Imh0dHA6Ly93d3cudzMub3JnLzIwMDEvWE1MU2NoZW1hLWluc3RhbmNlIiB4bWxuczpkaXZpZGVuZG9zPSJodHRwOi8vd3d3LnNhdC5nb2IubXgvZXNxdWVtYXMvcmV0ZW5jaW9ucGFnby8xL2RpdmlkZW5kb3MiIFZlcnNpb249IjEuMCIgRm9saW9JbnQ9IjEyMyIgU2VsbG89Ikl3QVR2MDgwcUs2SkdMRlNkamU2bUI3SjN4U1kwYlJKTW5JVFNjQTBNKzhndXhpNkJvNzYybnFBSzZWWGkyZktuVDcvMTFXaUJ2WWI3ZStkdjVzOSsvOVhNc2twZCtSZmRnNUdqODJmMGFJbjBOeWk4YUtQU2VXemNjTzQwNVo1a3FHc0hDNCs3TU5MNW5jMC9BbjJuTHlrY1Q5TlZLdkNCOWs1VVpleml3SXF3cUtXSko2QVR1cEVMWDZhWHJkTXFDZlpoMFBINWc3Qkd1Ym01WFlvdzc3bUo5dmZjMVR0ZFV0NXVhWjlxd0dXNkJhSm44eFlQRlpLYiszWTFwRDd1UktmSnZ3d2l1Mk04Q3R1N1Q0VVhXclRDUHMxRiswQ3BJU2ozOWsvYmRwaE1wRDdwRHVlUlYyZGM5VlI1RzUwTGg2Y05Xc3hPVTY2K0xCTjIwNEt5UT09IiBOdW1DZXJ0PSIzMDAwMTAwMDAwMDQwMDAwMjMzMiIgQ2VydD0iTUlJRmxqQ0NBMzZnQXdJQkFnSVVNekF3TURFd01EQXdNREEwTURBd01ESXpNekl3RFFZSktvWklodmNOQVFFTEJRQXdnZ0VyTVE4d0RRWURWUVFEREFaQlF5QlZRVlF4TGpBc0JnTlZCQW9NSlZORlVsWkpRMGxQSUVSRklFRkVUVWxPU1ZOVVVrRkRTVTlPSUZSU1NVSlZWRUZTU1VFeEdqQVlCZ05WQkFzTUVWTkJWQzFKUlZNZ1FYVjBhRzl5YVhSNU1TZ3dKZ1lKS29aSWh2Y05BUWtCRmhsdmMyTmhjaTV0WVhKMGFXNWxla0J6WVhRdVoyOWlMbTE0TVIwd0d3WURWUVFKREJRemNtRWdZMlZ5Y21Ga1lTQmtaU0JqWVdScGVqRU9NQXdHQTFVRUVRd0ZNRFl6TnpBeEN6QUpCZ05WQkFZVEFrMVlNUmt3RndZRFZRUUlEQkJEU1ZWRVFVUWdSRVVnVFVWWVNVTlBNUkV3RHdZRFZRUUhEQWhEVDFsUFFVTkJUakVSTUE4R0ExVUVMUk1JTWk0MUxqUXVORFV4SlRBakJna3Foa2lHOXcwQkNRSVRGbkpsYzNCdmJuTmhZbXhsT2lCQlEwUk5RUzFUUVZRd0hoY05NVGt3TlRJNU1UZzBORFUzV2hjTk1qTXdOVEk1TVRnME5EVTNXakNCdlRFZ01CNEdBMVVFQXhNWFEwVkRTVXhKUVNCTlNWSkJUa1JCSUZOQlRrTklSVm94SURBZUJnTlZCQ2tURjBORlEwbE1TVUVnVFVsU1FVNUVRU0JUUVU1RFNFVmFNU0F3SGdZRFZRUUtFeGREUlVOSlRFbEJJRTFKVWtGT1JFRWdVMEZPUTBoRldqRVdNQlFHQTFVRUxSTU5UVWxUUXpRNU1USXhORUk0TmpFYk1Ca0dBMVVFQlJNU1RVbFRRelE1TVRJeE5FMURRMUpPUXpBeE1TQXdIZ1lEVlFRTEV4ZERSVU5KVEVsQklFMUpVa0ZPUkVFZ1UwRk9RMGhGV2pDQ0FTSXdEUVlKS29aSWh2Y05BUUVCQlFBRGdnRVBBRENDQVFvQ2dnRUJBSnpBelNuNU9lV29WZktDenBUdWR2ZUhTQXhhL2NVTmFvb09VanJQSmhXUnNLS3RZQXJaNjdDRFlaU2JxYmpJQndiM0R2NkFncjFOSEhiWVQraDY1N3JKT0MzWmhtbTRkNGEwNVVvaXpaVERBdFk1YzNYQUtwZEt1SjJvZ2dadVNSOUg3bVNRMVAzV2ZUNXYzVFJnNnhnRVF3bU1kYjd2M0MwQUsxUFRPS3RqaGptbmU5TnFoenJFSGUzbmZpV3FYNkpuOFh0K2xyUEF6OWs0MEJPV0ppUHk5Z010aEFIUFhnWFlVTXNtZkZWWXViY05YVklYK2lFbGVoTDZqNUFpbjQvUytGQnFxcDBSdnVFRjZWZlppSTVTdVhsSDY5Unc3QndVY0ZqZ3Y5aE9tUmMrdlllYWFzb3FMbWZGNVN1ays2b0VUaHZoMkFPMjR5aXErMW0zc2NVQ0F3RUFBYU1kTUJzd0RBWURWUjBUQVFIL0JBSXdBREFMQmdOVkhROEVCQU1DQnNBd0RRWUpLb1pJaHZjTkFRRUxCUUFEZ2dJQkFKVTBPRzJFZUxRV1ZWaWpwYU9CRlR5RzMrS1lDeStoSll5bzYvaGNVVUNSRkJBaU5UYjg5dHlsVWtSS3BKOXA4ZGlnWUxrZWVtbWhPa1A1VU5ud3BpeTBuZmdLRGxOSFgzQldXQkMyWDZ2Y0hYRjlmT01mMUN4WWFETWhwcXpISStyTmUrN0U5R1grWTU1QnV0azFSWEdOYnJwckRrRjRIS3BjOHJqMUN0bHl2bVVqSko5aVdDT3lhcDgvazVOV24xTFpBOVdkQjZKb0E1RElYMk00R0NraDY3YkhlTnRlb2c4VzhERXRZQWVra0k3VWZlNzRFSTVlM05CM3hMTzJFWnJtdWxhNVdFT3BFR3V2TGRpOXBxaVl6U1NhYkZCL3hmMXBhcHlaWXZLa1dXaXc2T09FbzVWMloyRVhkL3NEQU1XUWh5SnlnSGpVaDJhalhRRmZLSTU3N29tVVFmMzQ2ZGxoSlhpN1BNazJOLzI2bHZ0SlQ1aFlMeXJiazVLOVhpWUJmSktrSWVkbjllb0NaSXhNSDU5SjhrYTJRMjNyTG5pbDFydzRsOGtWWjl3QWhHYXplSzROZnptMzhCODFqNnEzOEdpN3g1R2FwYXJyT3IrYkE1QnJyMi9lNW1IOFlHUVhVUFJOSzRhZy9OK0tnZ25PSC9mSFpCSDBtS1NKWm9MaHNpekdYYWhjYXp6dUVqcUVOWEYvQyswUUc4dnVpbUV0eXlDRnp4NEp6ekI1RzFpK1pFaEdNSDdua1JTVWYvOFJxOGZOMnUwU05ZRTVKRUI0aXBGYWVyMkpHbFJyelNNUDVpTmtDSDJ3eFdwaHJNSFJXcVZxeDk3UHBNNDVuRTBKY3Vrdk9idzcyVGFLRmhvaFEyVTZ5TWIvZnFxUDVwN0MxWjVhZjM4SCIgRmVjaGFFeHA9IjIwMTktMDctMjZUMTY6MDU6NDAtMDc6MDAiIEN2ZVJldGVuYz0iMjUiIERlc2NSZXRlbmM9Ik90cm8gdGlwbyBkZSByZXRlbmNpb25lcyIgeHNpOnNjaGVtYUxvY2F0aW9uPSJodHRwOi8vd3d3LnNhdC5nb2IubXgvZXNxdWVtYXMvcmV0ZW5jaW9ucGFnby8xIGh0dHA6Ly93d3cuc2F0LmdvYi5teC9lc3F1ZW1hcy9yZXRlbmNpb25wYWdvLzEvcmV0ZW5jaW9ucGFnb3YxLnhzZCBodHRwOi8vd3d3LnNhdC5nb2IubXgvZXNxdWVtYXMvcmV0ZW5jaW9ucGFnby8xL2RpdmlkZW5kb3MgaHR0cDovL3d3dy5zYXQuZ29iLm14L2VzcXVlbWFzL3JldGVuY2lvbnBhZ28vMS9kaXZpZGVuZG9zL2RpdmlkZW5kb3MueHNkIj4KCTxyZXRlbmNpb25lczpFbWlzb3IgUkZDRW1pc29yPSJNSVNDNDkxMjE0Qjg2IiBOb21EZW5SYXpTb2NFPSJDRUNJTElBIE1JUkFOREEgU0FOQ0hFWiIvPgoJPHJldGVuY2lvbmVzOlJlY2VwdG9yIE5hY2lvbmFsaWRhZD0iTmFjaW9uYWwiPgoJCTxyZXRlbmNpb25lczpOYWNpb25hbCBSRkNSZWNlcD0iSkVTOTAwMTA5UTkwIiBOb21EZW5SYXpTb2NSPSJUZXN0IiBDVVJQUj0iQ1hHTzgzMDIwN0hCQ1NaUzA4Ii8+Cgk8L3JldGVuY2lvbmVzOlJlY2VwdG9yPgoJPHJldGVuY2lvbmVzOlBlcmlvZG8gTWVzSW5pPSIxIiBNZXNGaW49IjEyIiBFamVyYz0iMjAxNSIvPgoJPHJldGVuY2lvbmVzOlRvdGFsZXMgbW9udG9Ub3RPcGVyYWNpb249IjE2MDAuMDAiIG1vbnRvVG90R3Jhdj0iMTUwLjAwIiBtb250b1RvdEV4ZW50PSIxNDUwLjAwIiBtb250b1RvdFJldD0iMTUwLjAwIj4KCQk8cmV0ZW5jaW9uZXM6SW1wUmV0ZW5pZG9zIEJhc2VSZXQ9IjEwMC4wMCIgSW1wdWVzdG89IjAxIiBtb250b1JldD0iMTAwLjAwIiBUaXBvUGFnb1JldD0iUGFnbyBkZWZpbml0aXZvIi8+Cgk8L3JldGVuY2lvbmVzOlRvdGFsZXM+Cgk8cmV0ZW5jaW9uZXM6Q29tcGxlbWVudG8+CgkJPGRpdmlkZW5kb3M6RGl2aWRlbmRvcyBWZXJzaW9uPSIxLjAiPgoJCQk8ZGl2aWRlbmRvczpEaXZpZE9VdGlsIEN2ZVRpcERpdk9VdGlsPSIwMSIgTW9udERpdkFjdW1FeHQ9IjEwLjEiIE1vbnREaXZBY3VtTmFsPSIxMC4xIiBNb250SVNSQWNyZWROYWw9IjAuMSIgTW9udElTUkFjcmVkUmV0RXh0cmFuamVybz0iMC4wMCIgTW9udElTUkFjcmVkUmV0TWV4aWNvPSIwLjAwIiBNb250UmV0RXh0RGl2RXh0PSIwLjAwIiBUaXBvU29jRGlzdHJEaXY9IlNvY2llZGFkIE5hY2lvbmFsIi8+CgkJCTxkaXZpZGVuZG9zOlJlbWFuZW50ZSBQcm9wb3JjaW9uUmVtPSIxMC4wIi8+CgkJPC9kaXZpZGVuZG9zOkRpdmlkZW5kb3M+Cgk8L3JldGVuY2lvbmVzOkNvbXBsZW1lbnRvPgo8L3JldGVuY2lvbmVzOlJldGVuY2lvbmVzPgo=";

const ejemploPeticion = `<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:WashOut">
   <soapenv:Header/>
   <soapenv:Body>
      <urn:timbrar_retencion soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
         <username xsi:type="xsd:string">AAA010101000</username>
         <password xsi:type="xsd:string">h6584D56fVdBbSmmnB</password>
         <sxml xsi:type="xsd:string">${comprobanteBase64}</sxml>
      </urn:timbrar_retencion>
   </soapenv:Body>
</soapenv:Envelope>`;

const ejemploRespuesta = `<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:tns="urn:WashOut">
   <soap:Body>
      <tns:timbrar_retencion_response>
         <timbrar_retencion_result xsi:type="tns:timbrar_retencion_result">
            <xml xsi:type="xsd:string"><?xml version="1.0" encoding="UTF-8"?>
<retenciones:Retenciones xmlns:retenciones="http://www.sat.gob.mx/esquemas/retencionpago/1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:dividendos="http://www.sat.gob.mx/esquemas/retencionpago/1/dividendos" Version="1.0" FolioInt="123" Sello="${selloCfdi}" NumCert="30001000000400002332" Cert="${certificado}" FechaExp="2019-07-26T16:05:40-07:00" CveRetenc="25" DescRetenc="Otro tipo de retenciones" xsi:schemaLocation="http://www.sat.gob.mx/esquemas/retencionpago/1 http://www.sat.gob.mx/esquemas/retencionpago/1/retencionpagov1.xsd http://www.sat.gob.mx/esquemas/retencionpago/1/dividendos http://www.sat.gob.mx/esquemas/retencionpago/1/dividendos/dividendos.xsd">
  <retenciones:Emisor RFCEmisor="MISC491214B86" NomDenRazSocE="CECILIA MIRANDA SANCHEZ"/>
  <retenciones:Receptor Nacionalidad="Nacional">
    <retenciones:Nacional RFCRecep="JES900109Q90" NomDenRazSocR="Test" CURPR="CXGO830207HBCSZS08"/>
  </retenciones:Receptor>
  <retenciones:Periodo MesIni="1" MesFin="12" Ejerc="2015"/>
  <retenciones:Totales montoTotOperacion="1600.00" montoTotGrav="150.00" montoTotExent="1450.00" montoTotRet="150.00">
    <retenciones:ImpRetenidos BaseRet="100.00" Impuesto="01" montoRet="100.00" TipoPagoRet="Pago definitivo"/>
  </retenciones:Totales>
  <retenciones:Complemento>
    <tfd:TimbreFiscalDigital xmlns:tfd="http://www.sat.gob.mx/TimbreFiscalDigital" xsi:schemaLocation="http://www.sat.gob.mx/TimbreFiscalDigital http://www.sat.gob.mx/sitio_internet/cfd/TimbreFiscalDigital/TimbreFiscalDigital.xsd" version="1.0" UUID="6DB9BD60-38A0-4D94-81A7-102613A584D9" FechaTimbrado="2019-07-26T18:05:45" selloCFD="${selloCfdi}" noCertificadoSAT="30001000000300036825" selloSAT="${selloSat}"/>
    <dividendos:Dividendos Version="1.0">
      <dividendos:DividOUtil CveTipDivOUtil="01" MontDivAcumExt="10.1" MontDivAcumNal="10.1" MontISRAcredNal="0.1" MontISRAcredRetExtranjero="0.00" MontISRAcredRetMexico="0.00" MontRetExtDivExt="0.00" TipoSocDistrDiv="Sociedad Nacional"/>
      <dividendos:Remanente ProporcionRem="10.0"/>
    </dividendos:Dividendos>
  </retenciones:Complemento>
</retenciones:Retenciones>]]></xml>
         </timbrar_retencion_result>
      </tns:timbrar_retencion_response>
   </soap:Body>
</soap:Envelope>`;

const erroresTimbrado = [
  ["RET001", "Los datos de autentificación enviados son incorrectos"],
  ["RET002", "Se han agotado la cantidad de timbres"],
  ["RET003", "Parámetro inválido"],
  ["RET004", "Error en el certificado, el certificado es inválido."],
  ["RET301", "El XML recibido no contiene una estructura válida."],
  ["RET302", "El sello del emisor es inválida"],
  ["RET303", "Certificado del comprobante no corresponde al RFC emisor."],
  ["RET304", "El certificado está revocado o caduco."],
  ["RET305", "La fecha de emisión no esta dentro de la vigencia del CSD del Emisor."],
  ["RET306", "El certificado utilizado es de tipo FIEL, no es un CSD."],
  ["RET307", "El comprobante ya tiene un timbre previo, revisar el nodo complemento."],
  ["RET308", "El certificado no fue expedido por el SAT."],
  ["RET309", "El rango de la fecha de generación es mayor a las 72 horas."],
];

export function TimbrarRetenciones() {
  return (
    <LayoutDocumentacionSoporte categoria="Retenciones" titulo="Método Timbrar_Retencion" menu={menuRetenciones} activo="/timbrar-retenciones/">
      <BloqueContenidoSoporte titulo="Esquema de Factura de Retenciones e Información de Pagos">
        <p>La factura de retenciones e información de pagos es un documento distinto a una factura ya que no es un comprobante de ingreso, egreso o traslado.</p>
        <p>Se integra por conjunto de datos generales, a los cuales se les puede incorporar un complemento.</p>
        <p>Cuando en la realización de una actividad económica estés obligado a expedir una constancia por las retenciones de impuestos que efectúas, o bien por los pagos realizados, genera una factura de retenciones o información de pagos. Por ejemplo, en el caso de enajenación de acciones, dividendos o utilidades distribuidas, regalías por derechos de autor, pagos realizados a favor de residentes en el extranjero, intereses reales deducibles por créditos hipotecarios.</p>
        <p><em>*Se debe usar SHA-1 en la digestión para la generación del Sello de CFDI que amparan retenciones e información de pagos.</em></p>
        <hr />
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Enlaces al servicio">
        <p>Pruebas: <a href={urlRetenciones.pruebas}>{urlRetenciones.pruebas}</a></p>
        <p>Producción: <a href={urlRetenciones.produccion}>{urlRetenciones.produccion}</a></p>
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Consumo de créditos">
        <p>Por cada petición de timbrado exitosa: <strong>1 crédito.</strong></p>
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Peticion al servicio">
        <p>El servicio de “timbrar_retencion” se utiliza para realizar el timbrado de un comprobante, si dicho comprobante es válido se timbrará con éxito. Es requerido el usuario y contraseña para utilizar el servicio.</p>
      </BloqueContenidoSoporte>

      <ContactoDudasSoporte imagen={imagenesDudasRetenciones.uno} />

      <BloqueContenidoSoporte titulo="Parámetros de la petición">
        <TablaSoporte columnas={["Nombre", "Descripción", "Requerido"]} filas={[
          ["username", "Usuario del web service", "Sí"],
          ["password", "Contraseña del web service", "Sí"],
          ["sxml", "El xml del comprobante convertido a una cadena en base64.", "Sí"],
        ]} />
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Ejemplo de petición al servicio">
        <BloqueCodigoSoporte codigo={ejemploPeticion} />
      </BloqueContenidoSoporte>

      <ContactoDudasSoporte imagen={imagenesDudasRetenciones.dos} />

      <BloqueContenidoSoporte titulo="Respuesta del servicio">
        <p>La respuesta del servicio de timbrado se encontrará en el nodo “timbrar_retencion_response”, en donde encontraremos el XML, una vez que dicho comprobante haya pasado todas las validaciones correspondientes. En caso contrario regresará un código y un mensaje de error en el cual se describe el motivo por el cual no cumple con la validación.</p>
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Parámetros de respuesta">
        <TablaSoporte columnas={["Nombre", "Descripción"]} filas={[
          ["xml", "Campo que contiene el comprobante con el nodo TFD (Timbre Fiscal Digital)."],
        ]} />
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Ejemplo de respuesta del servicio">
        <BloqueCodigoSoporte codigo={ejemploRespuesta} />
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Códigos de error a nivel petición">
        <p>El siguiente lista se muestra los códigos de error proporcionados por el SAT.</p>
        <TablaSoporte columnas={["Código", "Descripción"]} filas={erroresTimbrado} />
      </BloqueContenidoSoporte>
    </LayoutDocumentacionSoporte>
  );
}
