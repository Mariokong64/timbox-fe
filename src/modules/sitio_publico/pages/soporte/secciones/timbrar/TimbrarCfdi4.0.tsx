import { Box, Link, Typography } from "@mui/material";
import { BloqueCodigoSoporte } from "../../components/BloqueCodigoSoporte";
import { BloqueContenidoSoporte } from "../../components/BloqueContenidoSoporte";
import { ContactoDudasSoporte } from "../../components/ContactoDudasSoporte";
import { LayoutDocumentacionSoporte } from "../../components/LayoutDocumentacionSoporte";
import { TablaSoporte } from "../../components/TablaSoporte";
import {
  erroresPeticionCfdi,
  imagenesDudasTimbrar,
  matricesSatCfdi40,
  menuTimbrar,
  parametrosPeticionCfdi,
  parametrosRespuestaXml,
} from "./constantes";

const ejemploPeticionCfdi40 = `<soapenv:Envelope
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xmlns:xsd="http://www.w3.org/2001/XMLSchema"
  xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
  xmlns:urn="urn:WashOut">
  <soapenv:Header/>
  <soapenv:Body>
    <urn:timbrar_cfdi soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
      <username xsi:type="xsd:string">user</username>
      <password xsi:type="xsd:string">password</password>
      <sxml xsi:type="xsd:string">COMPROBANTE_CFDI_40_EN_BASE64</sxml>
    </urn:timbrar_cfdi>
  </soapenv:Body>
</soapenv:Envelope>`;

const ejemploXmlCfdi40 = `<?xml version="1.0" encoding="utf-8"?>
<cfdi:Comprobante
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xmlns:cfdi="http://www.sat.gob.mx/cfd/4"
  Version="4.0"
  Serie="RogueOne"
  Folio="HNFK231"
  Fecha="2022-01-07T11:21:26"
  SubTotal="2000.12"
  Moneda="MXN"
  Total="5420.34"
  TipoDeComprobante="I"
  Exportacion="01"
  MetodoPago="PUE"
  LugarExpedicion="06300"
  xsi:schemaLocation="http://www.sat.gob.mx/cfd/4 http://www.sat.gob.mx/sitio_internet/cfd/4/cfdv40.xsd">
  <cfdi:Emisor Rfc="EKU9003173C9" Nombre="ESCUELA KEMPER URGATE SA DE CV" RegimenFiscal="601"/>
  <cfdi:Receptor Rfc="SUL010720JN8" Nombre="Rodolfo Carranza Ramos" UsoCFDI="G03" DomicilioFiscalReceptor="76827" RegimenFiscalReceptor="601"/>
  <cfdi:Conceptos>
    <cfdi:Concepto ClaveProdServ="50211503" Cantidad="1" ClaveUnidad="H87" Descripcion="Cigarros" ValorUnitario="2000.12" Importe="2000.12" ObjetoImp="02"/>
  </cfdi:Conceptos>
</cfdi:Comprobante>`;

const declaracionEsquemasCfdi40 = `xmlns:cfdi="http://www.sat.gob.mx/cfd/4"
xsi:schemaLocation="http://www.sat.gob.mx/cfd/4 http://www.sat.gob.mx/sitio_internet/cfd/4/cfdv40.xsd"`;

const ejemploRespuestaCfdi40 = `<soap:Envelope
  xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
  xmlns:xsd="http://www.w3.org/2001/XMLSchema"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xmlns:tns="urn:WashOut">
  <soap:Body>
    <tns:timbrar_cfdi_response>
      <timbrar_cfdi_result xsi:type="tns:timbrar_cfdi_result">
        <xml xsi:type="xsd:string">
          <![CDATA[
            <cfdi:Comprobante Version="4.0" Total="5420.34">
              <cfdi:Complemento>
                <tfd:TimbreFiscalDigital UUID="5E2FE482-BDE7-43B2-96AF-D6B0FF161617" />
              </cfdi:Complemento>
            </cfdi:Comprobante>
          ]]>
        </xml>
      </timbrar_cfdi_result>
    </tns:timbrar_cfdi_response>
  </soap:Body>
</soap:Envelope>`;

export function TimbrarCfdi40() {
  return (
    <LayoutDocumentacionSoporte
      categoria="Timbrar"
      titulo="Método Timbrar CFDI 4.0"
      menu={menuTimbrar}
      activo="/timbrar-cfdi-4-0"
    >
      <BloqueContenidoSoporte titulo="CFDI versión 4.0">
        <p>
          CFDI 4.0 es la versión vigente del comprobante fiscal. Los servicios de timbrado de Timbox reciben la
          estructura del comprobante y detectan automáticamente la versión enviada.
        </p>
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Enlaces al servicio">
        <p>
          Pruebas:{" "}
          <a href="https://staging.ws.timbox.com.mx/timbrado_cfdi40/wsdl">
            https://staging.ws.timbox.com.mx/timbrado_cfdi40/wsdl
          </a>
        </p>
        <p>
          Producción:{" "}
          <a href="https://sistema.timbox.com.mx/timbrado_cfdi40/wsdl">
            https://sistema.timbox.com.mx/timbrado_cfdi40/wsdl
          </a>
        </p>
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Modificaciones a la vieja versión">
        <p>
          La versión 4.0 cambia atributos del comprobante y también actualiza la matriz de errores que publica el SAT.
          Para integraciones nuevas conviene revisar las guías oficiales antes de enviar comprobantes a timbrado.
        </p>
        <Box component="ul" sx={{ mt: 0, pl: 3 }}>
          <li>
            <a href="https://www.sat.gob.mx/consultas/92764/comprobante-de-ingresos">Portal del SAT</a>
          </li>
          <li>
            <a href="http://omawww.sat.gob.mx/tramitesyservicios/Paginas/documentos/GuiaAnexo20Global.pdf">
              Guía de llenado del CFDI global versión 4.0
            </a>
          </li>
          <li>
            <a href="https://www.sat.gob.mx/sitio_internet/cfd/4/cfdv40.xsd">Estructura CFDI 4.0 XSD</a>
          </li>
          <li>
            <a href="http://omawww.sat.gob.mx/tramitesyservicios/Paginas/documentos/MatrizDeErrores_CFDI_v40.xls">
              Matriz de errores CFDI 4.0
            </a>
          </li>
        </Box>
        <p>
          Para consumir los servicios se requiere una cuenta de Timbox. Las credenciales del web service se consultan en
          el dashboard por ambiente de pruebas y producción.
        </p>
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Petición al servicio">
        <p>
          El método <strong>timbrar_cfdi</strong> recibe el XML del comprobante en base64. Si el comprobante cumple las
          validaciones correspondientes, se timbra y se devuelve el XML con su complemento fiscal.
        </p>
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Parámetros de la petición">
        <TablaSoporte columnas={["Nombre", "Descripción", "Requerido"]} filas={parametrosPeticionCfdi} />
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Consumo de créditos">
        <p>Por cada petición de timbrado exitoso: 1 crédito.</p>
      </BloqueContenidoSoporte>

      <ContactoDudasSoporte imagen={imagenesDudasTimbrar.uno} />

      <BloqueContenidoSoporte titulo="Ejemplo de petición al servicio">
        <BloqueCodigoSoporte codigo={ejemploPeticionCfdi40} />
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Ejemplo de XML con estructura de CFDI versión 4.0">
        <p>
          El siguiente ejemplo muestra la cabecera y nodos principales de un CFDI 4.0. En una integración real el
          certificado, sello, conceptos, impuestos y complementos deben generarse con los datos fiscales correctos.
        </p>
        <BloqueCodigoSoporte codigo={ejemploXmlCfdi40} />
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Declaración de esquemas CFDI 4.0">
        <p>Los namespaces se declaran en el nodo Comprobante del XML.</p>
        <BloqueCodigoSoporte codigo={declaracionEsquemasCfdi40} />
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Respuesta del servicio">
        <p>Las respuestas del servicio se pueden agrupar en tres escenarios:</p>
        <Box component="ul" sx={{ mt: 0, pl: 3 }}>
          <li>Éxito: devuelve el comprobante con el Timbre Fiscal Digital.</li>
          <li>Errores de validación: corresponden a reglas de CFDI y complementos.</li>
          <li>Errores de estructura: aparecen cuando faltan atributos, namespaces o esquemas XSD.</li>
        </Box>
        <p>
          La respuesta se encuentra en el nodo <strong>timbrar_cfdi_response</strong>. Cuando existe rechazo, se devuelve
          un código y un mensaje descriptivo.
        </p>
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Parámetros de respuesta">
        <TablaSoporte columnas={["Nombre", "Descripción"]} filas={parametrosRespuestaXml} />
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Ejemplo de respuesta del servicio">
        <BloqueCodigoSoporte codigo={ejemploRespuestaCfdi40} />
      </BloqueContenidoSoporte>

      <ContactoDudasSoporte imagen={imagenesDudasTimbrar.dos} />

      <BloqueContenidoSoporte titulo="Códigos de error nivel petición">
        <TablaSoporte columnas={["Código", "Descripción"]} filas={erroresPeticionCfdi} />
      </BloqueContenidoSoporte>

      <ContactoDudasSoporte imagen={imagenesDudasTimbrar.tres} />

      <BloqueContenidoSoporte titulo="Matrices de error del SAT">
        <Typography sx={{ mb: 2, fontFamily: "var(--fuente-ligera)", fontSize: { xs: 18, md: 21 } }}>
          Estas matrices ayudan a identificar validaciones del SAT relacionadas con CFDI 4.0 y sus complementos.
        </Typography>
        <TablaSoporte
          columnas={["Código", "Descripción", "Descarga"]}
          filas={matricesSatCfdi40.map(([codigo, descripcion, texto, href]) => [
            codigo,
            descripcion,
            <Link href={href}>{texto}</Link>,
          ])}
        />
      </BloqueContenidoSoporte>

      <ContactoDudasSoporte imagen={imagenesDudasTimbrar.cuatro} />
    </LayoutDocumentacionSoporte>
  );
}
