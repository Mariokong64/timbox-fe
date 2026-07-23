/* eslint-disable no-irregular-whitespace */
import { Box } from "@mui/material";
import { BloqueCodigoSoporte } from "../../components/BloqueCodigoSoporte";
import { BloqueContenidoSoporte } from "../../components/BloqueContenidoSoporte";
import { ContactoDudasSoporte } from "../../components/ContactoDudasSoporte";
import { LayoutDocumentacionSoporte } from "../../components/LayoutDocumentacionSoporte";
import { TablaSoporte } from "../../components/TablaSoporte";
import {
  columnasAtributos,
  filasCaracteresEspeciales,
  imagenDudasMaterialApoyo,
  menuMaterialApoyo,
} from "./constantes";
import { namespaceRetenciones } from "./ejemplos";

const filasRetenciones = [
  ["Version", "Atributo requerido en el cual debe de contener el valor 2.0 de acuerdo como lo indica la versión estándar bajo el que se encuentra expresada la retención y/o comprobante de información de pagos.", "Version=”2.0″"],
  ["Sello", <Box>Es el resultado de la ejecución de un mecanismo criptográfico a la cadena original del comprobante, representado en formato Base64.<p>Debe de usarse la siguiente cadena original para los CFDI’s de retenciones <a href="http://www.sat.gob.mx/esquemas/retencionpago/2/retenciones.xslt">http://www.sat.gob.mx/esquemas/retencionpago/2/retenciones.xslt</a></p></Box>, <a href="/generar-sello/">Ver ejemplo</a>],
  ["NoCertificado", "Es el número de serie del certificado del sello digital que ampara al comprobante del Emisor de acuerdo con el acuse correspondiente a 20 posiciones otorgado por el sistema del SAT.", <a href="/generar-certificado/">Ver ejemplo</a>],
  ["FechaExp", "Se debe registrar la fecha y hora de expedición del comprobante fiscal digital a través de internet que ampara retenciones e información de pagos. Se expresa en la forma yyyy-mm-ddThh:mm:ssTZD-6, de acuerdo con la especificación ISO8601.", "FechaExp=”2019-05-27T17:18:01-07:00″"],
  ["CveRetenc", <>Se debe registrar la clave de la retención o información de pagos de acuerdo al catálogo 1.-Retencines contenido en el documento Catálogos del Documento de Retenciones e información de Pagos. <a href="https://www.sat.gob.mx/cs/Satellite?blobcol=urldata&blobkey=id&blobtable=MungoBlobs&blobwhere=1461173682753&ssbinary=true">c_CveRetenc</a></>, "CveRetenc=”25″"],
  ["Certificado", "Es el contenido del certificado del sello digital del emisor y debe ser expresado en formato Base64.", <a href="/generar-certificado/">Ver ejemplo</a>],
  ["LugarExpRetenc", "Se debe registrar el código postal del lugar de expedición del comprobante (domicilio de la matriz o sucursal), debe de corresponder con una clave de código postal incluida en el catálogo.", "LugarExpRetenc=”76266″"],
];

const filasEmisor = [
  ["RfcE", "Se debe registrar la clave del Registro Federal de Contribuyente del emisor del documento de retención e información de pagos.", "Rfc=”MISC491214B86″"],
  ["NomDenRazSocE", "Atributo requerido para registrar el nombre, denominación o razón social del contribuyente inscrito en el RFC, emisor del comprobante que ampara retenciones e información de pagos.", "NomDenRazSocE=”CECILIA MIRANDA SANCHEZ”"],
  ["RegimenFiscalE", "Atributo requerido para incorporar la clave del régimen del contribuyente emisor del comprobante que ampara retenciones e información de pagos.", "RegimenFiscal=”605″"],
];

const filasReceptor = [
  ["NacionalidadR", "Se debe expresar la información del contribuyente receptor, el cual acepta únicamente los calores “Nacional” o “Extranjero”.", "Nacionalidad=”Nacional”"],
];

const filasNacional = [
  ["RfcR", "Se debe registrar la clave del Registro Federal de Contribuyentes que ampara retenciones e información de pagos.", "NRFCRecep=”JES900109Q90″"],
  ["NomDenRazSocR", "Atributo requerido para registrar el(los) nombre(s), primer apellido, segundo apellido, según corresponda, denominación o razón social del contribuyente, inscrito en el RFC, del receptor del comprobante que ampara retenciones e información de pagos.", "NomDenRazSocR=”        JIMENEZ ESTRADA SALAS”"],
  ["DomicilioFiscalR", "Atributo requerido para registrar el código postal del domicilio fiscal del receptor del comprobante que ampara retenciones e información de pagos.", "DomicilioFiscalR=”76066”"],
];

const filasExtranjero = [
  ["NomDenRazSocR", "Se debe registrar el nombre, denominación o razón social del receptor del comprobante Fiscal Digital a través de Internet.", "NomDenRazSocR= “La Pallmmera”"],
];

const filasPeriodo = [
  ["MesIni", "Es el mes inicial, el cual se debe registrar de acuerdo al periodo en que se realizó la retención o información de pagos, mismo que debe de ser expresado del “1” al “12”.", "MesIni=”1″"],
  ["MesFin", "Es el mes final, en cual se debe registrar de acuerdo al periodo en que se realizó la retención o la información de pagos, mismo que debe de ser expresado del “1” al “12”.", "MesFin=”12″"],
  ["Ejercicio", "Se debe registrar el ejercicio fiscal (año) en el que se realizó la retención e información de pago.", "Ejercicio=”2023″"],
];

const filasTotales = [
  ["MontoTotOperacion", "Se debe registrar el monto total de la operación que se relaciona en el comprobante, el cual se puede expresar con importes numéricos hasta 6 decimales.", "MontoTotOperacion=”1600.00″"],
  ["MontoTotGrav", "Se debe registrar el monto total gravado de la operación que se relaciona en el comprobante.", "MontoTotGrav=”150.00″"],
  ["MontoTotExent", "Se debe registrar el monto total exento de la operación que se relaciona en el comprobante.", "MontoTotExent=”1450.00″"],
  ["MontoTotRet", "Se debe registrar el total de las retenciones efectuadas que se relacionan en el comprobante, es decir, la suma de los montos de retención del nodo ImpRetenidos.", "MontoTotRet=”150.00″"],
];

export function GenerarCfdiRetenciones() {
  return (
    <LayoutDocumentacionSoporte categoria="Material de apoyo" titulo="Generar CFDI Retenciones" menu={menuMaterialApoyo} activo="/generar-cfdi-retenciones/">
      <BloqueContenidoSoporte titulo="¿Qué debemos considerar para generar un comprobante de CFDI retenciones e información de pagos?">
        <p>Los CFDI deben ser generados bajo el estándar XSD base y los XSD complementarios que requiera, validando su forma y sintaxis en el archivo con extensión XML, siendo éste el único formato para poder representar y almacenar comprobantes de manera electrónica o digital.</p>
        <BloqueCodigoSoporte codigo={namespaceRetenciones} />
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte>
        <p>Una de las principales especificaciones que deben cumplir los comprobantes, son los namespace, en donde se hace referencia al Comprobante Fiscal Digital por Internet y a la validación del mismo en la ruta publicada por el SAT desde donde se valida el esquema <a href="http://www.sat.gob.mx/esquemas/retencionpago/2/retencionpagov2.xsd">XSD</a> y dichos namespace deben de estar dentro del nodo retenciones:Retenciones como se muestra en el siguiente ejemplo:</p>
        <ul>
          <li>Lineamientos técnicos de forma y sintaxis para la generación del XML especificados por <a href="https://www.w3.org/">W3C.</a> </li>
          <li>Validaciones adicionales establecidas en el Estándar del <a href="http://omawww.sat.gob.mx/tramitesyservicios/Paginas/documentos/Anexo20_2022.pdf">Anexo 20.</a></li>
          <li>Validaciones adicionales establecidas en cada complemento que se integre en el XML.</li>
          <li>Las reglas de validaciones particulares publicadas en la Resolución Miscelánea Fiscal vigente.</li>
        </ul>
        <p>El XML debe expresarse bajo el estándar de codificación UTF-8 y en caso de contar con alguno de los siguientes casos especiales se debe usar la secuencia de escape como se muestra a continuación:</p>
        <TablaSoporte columnas={["Carácter Especial", "Secuencia a Usar"]} filas={filasCaracteresEspeciales} />
      </BloqueContenidoSoporte>

      <ContactoDudasSoporte imagen={imagenDudasMaterialApoyo} />

      <BloqueContenidoSoporte titulo="¿Cuáles son los atributos requeridos para el nodo de retenciones?">
        <TablaSoporte columnas={columnasAtributos} filas={filasRetenciones} />
      </BloqueContenidoSoporte>
      <BloqueContenidoSoporte titulo="¿Cuáles son los atributos requeridos en el nodo emisor?">
        <TablaSoporte columnas={columnasAtributos} filas={filasEmisor} />
      </BloqueContenidoSoporte>
      <BloqueContenidoSoporte titulo="¿Cuáles son los atributos requeridos en el nodo Receptor?">
        <TablaSoporte columnas={columnasAtributos} filas={filasReceptor} />
      </BloqueContenidoSoporte>
      <BloqueContenidoSoporte titulo="¿Cuáles son los atributos requeridos en el nodo Nacional?">
        <TablaSoporte columnas={columnasAtributos} filas={filasNacional} />
      </BloqueContenidoSoporte>
      <BloqueContenidoSoporte titulo="¿Cuáles son los atributos requeridos en el nodo Extranjero?">
        <TablaSoporte columnas={columnasAtributos} filas={filasExtranjero} />
      </BloqueContenidoSoporte>
      <BloqueContenidoSoporte titulo="¿Cuáles son los atributos requeridos en el nodo Periodo?">
        <TablaSoporte columnas={columnasAtributos} filas={filasPeriodo} />
      </BloqueContenidoSoporte>
      <BloqueContenidoSoporte titulo="¿Cuáles son los atributos requeridos en el nodo Totales?">
        <TablaSoporte columnas={columnasAtributos} filas={filasTotales} />
      </BloqueContenidoSoporte>
    </LayoutDocumentacionSoporte>
  );
}
