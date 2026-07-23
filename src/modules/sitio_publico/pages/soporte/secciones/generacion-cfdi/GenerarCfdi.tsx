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
import { namespaceCfdi } from "./ejemplos";

const enlaceCatalogos = "http://omawww.sat.gob.mx/tramitesyservicios/Paginas/anexo_20.htm";

const filasComprobante = [
  ["Version", "Atributo requerido en el cual debe de contener el valor 4.0 de acuerdo como lo indica el estándar del anexo 20.", "Version=”4.0″"],
  ["Fecha", "Es la fecha y hora de expedición del comprobante fiscal. Se expresa en la forma AAAA-MM-DD:Thh:mm:ss y debe de corresponder con la hora local donde se expide el comprobante.", "Fecha=”2022-10-02T12:51:09″"],
  ["Subtotal", "Es la suma de los importes de los conceptos antes de los descuentos e impuestos. No se permiten valores negativos.", "SubTotal=”1510.00″"],
  [
    "Moneda",
    <>Se debe registrar la clave de la moneda utilizada para expresar los montos. Catálogo CFDI: <a href="http://omawww.sat.gob.mx/tramitesyservicios/Paginas/anexo_20_version3-3.htm">c_Moneda</a></>,
    "Moneda=”MXN”",
  ],
  ["Total", "Es la suma del subtotal, menos los descuentos aplicables, más las contribuciones recibidas (impuestos traslados federales o locales, derechos, productos, aprovechamientos, aportaciones de seguridad social, contribuciones de mejoras) menos los impuestos retenidos federales o locales.", "Total=”1751.60″"],
  ["TipoDeComprobante", "Se debe registrar la clave con la que se identifica el tipo del comprobante fiscal para el contribuyente emisor ya sea Ingreso, Egreso, Traslado, Nómina y Pago.", "TipoDeComprobante=”I”"],
  ["LugarExpedicion", "Se debe registrar el código postal del lugar de expedición del comprobante (domicilio de la matriz o sucursal), debe de corresponder con una clave de código postal incluida en el catálogo.", "LugarExpedicion=”06300″"],
  ["Exportacion", "Se deberá señalar si el comprobante corresponde a una operación de exportación definitiva o temporal, o si el comprobante ampara o no una operación de exportación, las distintas claves vigentes se encuentran incluidas en el catálogo.", "Exportacion=”01”"],
  ["NoCertificado", "Es el número de serie del certificado de sello digital que ampara al comprobante del Emisor, de acuerdo con el acuse correspondiente a 20 posiciones otorgado por el sistema del  SAT.", <a href="/generar-certificado/">Ver ejemplo</a>],
  ["Certificado", "Es el contenido del certificado del sello digital del emisor y debe ser expresado en formato Base64.", <a href="/generar-certificado/">Ver ejemplo</a>],
  ["Sello", "Es el resultado de la ejecución de un mecanismo criptográfico a la cadena original del comprobante, representado en formato Base64.", <a href="/generar-sello/">Ver ejemplo</a>],
];

const filasEmisor = [
  ["RFC", "Se debe registrar la clave del Registro Federal de Contribuyente del emisor del comprobante", "Rfc=”MISC491214B86″"],
  ["Nombre", "Se debe registrar el nombre, denominación o razón social inscrito en el RFC del emisor del comprobante. El nombre debe corresponder a la clave de RFC registrado en el campo RFC del emisor del comprobante.", "Nombre=”CECILIA MIRANDA SANCHEZ”"],
  [
    "RegimenFiscal",
    <Box>Se debe de especificar la clave del régimen fiscal del contribuyente emisor bajo el cual se está emitiendo el comprobante.<p>Las claves de los diversos regímenes se encuentran incluidas en el <a href={enlaceCatalogos}>c_RegimenFiscal</a> publicado en el portal del SAT.</p></Box>,
    "RegimenFiscal=”605″",
  ],
];

const filasReceptor = [
  ["RFC", "Se debe registrar la Clave del Registro Federal de Contribuyentes del receptor del comprobante", "Rfc=”IXS7607092R5″"],
  ["Nombre", <Box>Se debe registrar el(los) nombre(s), primer apellido, segundo apellido, según corresponda denominación o razón social registrados en el RFC del contribuyente receptor del comprobante.<p>El Nombre debe corresponder a la clave de RFC.</p></Box>, "Nombre=”INTERNACIONAL XIMBO Y SABORES”"],
  [<Box>DomicilioFiscal<p>Receptor</p></Box>, <Box>Se debe registrar el código postal del domicilio fiscal del<p>receptor del comprobante. Debe estar asociado a la clave de RFC registrado en el campo Rfc de este Nodo.</p></Box>, "DomicilioFiscalReceptor= “01001”"],
  [<Box>RegimenFiscal<p>Receptor</p></Box>, <Box>Se debe de especificar la clave del régimen fiscal del contribuyente receptor.<p>Las claves de los diversos regímenes se encuentran incluidas en el c_RegimenFiscal publicado en el portal del SAT.</p></Box>, <Box>RegimenFiscal<p>Receptor=”626”</p></Box>],
  ["UsoCFDI", "Se debe registrar la clave que corresponda al uso que le dará al comprobante fiscal el receptor.", "UsoCFDI=”S01″"],
];

const filasConcepto = [
  ["ClaveProdServ", <>En este campo se debe registrar una clave que permita clasificar los conceptos del comprobante como productos o servicios; se debe de utilizar las claves de los diversos productos o servicios de conformidad con el catálogo <a href={enlaceCatalogos}>c_ClaveProdServ</a></>, "ClaveProdServ=”84111506″"],
  ["Cantidad", "Se debe registrar la cantidad de bienes o servicios que corresponden a cada concepto, puede contener de cero hasta seis decimales.", "Cantidad=”25″"],
  ["ClaveUnidad", <>Se debe registrar la clave de unidad de medida estandarizada de conformidad con el catálogo <a href={enlaceCatalogos}>c_ClaveUnidad</a> publicado en el Portal del SAT, aplicable para la cantidad expresada en cada concepto.</>, "ClaveUnidad=”E48″"],
  ["Descripcion", "En este campo se debe registrar la descripción del bien o servicio propia de la empresa por cada concepto.", ""],
  ["ValorUnitario", <Box>Se debe registrar el valor o precio unitario del bien o servicio por cada concepto, el cual puede contener de cero hasta seis decimales.<p>Si el tipo de comprobante es de “I”, “E” o “N” este valor debe ser mayor a cero, si es de “T” puede ser mayor o igual a cero y si es “P” debe ser igual a cero.</p></Box>, "ValorUnitario=”36″"],
  ["Importe", "En este campo se debe registrar el importe total de los bienes o servicios de cada concepto. Debe ser equivalente al resultado de multiplicar la cantidad por el valor unitario expresado en el concepto.", "Importe=”900″"],
  ["ObjetoImp", <Box>Se debe registrar la clave correspondiente para indicar si la operación comercial es objeto o no de impuesto.<p>Las claves vigentes se encuentran incluidas en el catálogo c_ObjetoImp.</p><p>Si el valor registrado en este campo es “02” (Sí objeto de impuesto), se deben desglosar los Impuestos a nivel de Concepto</p><p>Si el valor registrado en este campo es “01” (No objeto de impuesto) o “03” (Sí objeto del impuesto y no obligado al desglose) no se desglosan impuestos a nivel Concepto</p></Box>, "ObjetoImp=”02”"],
];

const filasImpuestos = [
  ["Base", <Box>Se debe registrar el valor para el cálculo del impuesto que se traslada, puede contener de cero hasta seis decimales.<p>El valor de este campo debe ser mayor que cero.</p></Box>, "Base=”500″"],
  ["Impuestos", <>Se debe registrar la clave del tipo de impuestos aplicable a cada concepto, las cuales se encuentran incluidas en el catálogo <a href={enlaceCatalogos}>c_Impuestos</a> publicado en el Portal del SAT.</>, "Impuesto=”002″"],
  ["TipoFactor", <>Se debe registrar el tipo de factor que se aplica a la base del impuesto, el cual se encuentra incluido en el catálogo <a href={enlaceCatalogos}>c_TipoFactor</a> publicado en el Portal del SAT.</>, "TipoFactor=”Tasa”"],
  ["TasaOCuota", <>Atributo requerido para señalar la tasa o cuota del impuesto que se retiene para el presente concepto<a href={enlaceCatalogos}> c_TasaOCuota</a> publicado en el Portal del SAT.</>, "TasaOCuota=”0.160000″"],
  ["Importe", <Box>Se puede registrar el importe del impuesto que aplica a cada concepto. Este campo es requerido cuando en el campo TipoFactor se haya registrado como Tasa o Cuota.<p>El valor de este campo será calculado por el sistema que genera el comprobante y considerará los redondeos que tenga registrado este campo.</p></Box>, "Importe=”80”"],
];

export function GenerarCfdi() {
  return (
    <LayoutDocumentacionSoporte categoria="Material de apoyo" titulo="Generar CFDI" menu={menuMaterialApoyo} activo="/generar-cfdi/">
      <BloqueContenidoSoporte titulo="¿Qué debemos considerar para generar un comprobante de CFDI?">
        <p>Los CFDI deben ser generados bajo el estándar XSD base y los XSD complementarios que requiera, validando su forma y sintaxis en el archivo con extensión XML, siendo éste el único formato para poder representar y almacenar comprobantes de manera electrónica o digital.</p>
        <BloqueCodigoSoporte codigo={namespaceCfdi} />
      </BloqueContenidoSoporte>

      <ContactoDudasSoporte imagen={imagenDudasMaterialApoyo} />

      <BloqueContenidoSoporte>
        <p>Una de las principales especificaciones que deben cumplir los comprobantes, son los namespace, en donde se hace referencia al Comprobante Fiscal Digital por Internet y a la validación del mismo en la ruta publicada por el SAT desde donde se valida el esquema <a href="http://www.sat.gob.mx/sitio_internet/cfd/3/cfdv33.xsd">XSD</a> y dichos namespace deben de estar dentro del nodo cfdi:Comprobante como se muestra en el siguiente ejemplo:</p>
        <ul>
          <li>Lineamientos técnicos de forma y sintaxis para la generación del XML especificados por <a href="https://www.w3.org/">W3C</a></li>
          <li>Validaciones adicionales establecidas en el Estándar del <a href="http://omawww.sat.gob.mx/informacion_fiscal/factura_electronica/Documents/cfdv33.pdf">Anexo 20</a></li>
          <li>Validaciones adicionales establecida en cada complemento que se integre en el XML.</li>
          <li>Las reglas de validaciones particulares publicadas en la Resolución Miscelánea Fiscal vigente.</li>
        </ul>
        <p>El XML debe expresarse bajo el estándar de codificación UTF-8 y en caso de contar con alguno de los siguientes casos especiales se debe usar la secuencia de escape como se muestra a continuación:</p>
        <TablaSoporte columnas={["Carácter Especial", "Secuencia a Usar"]} filas={filasCaracteresEspeciales} />
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="¿Cuáles son los atributos requeridos para el nodo comprobante?">
        <TablaSoporte columnas={columnasAtributos} filas={filasComprobante} />
      </BloqueContenidoSoporte>
      <BloqueContenidoSoporte titulo="¿Cuáles son los atributos requeridos en el nodo emisor de un CFDI?">
        <TablaSoporte columnas={columnasAtributos} filas={filasEmisor} />
      </BloqueContenidoSoporte>
      <BloqueContenidoSoporte titulo="¿Cuáles son los atributos requeridos en el nodo receptor de un CFDI?">
        <TablaSoporte columnas={columnasAtributos} filas={filasReceptor} />
      </BloqueContenidoSoporte>
      <BloqueContenidoSoporte titulo="¿Cuáles son los atributos requeridos en el nodo concepto de un CFDI?">
        <TablaSoporte columnas={columnasAtributos} filas={filasConcepto} />
      </BloqueContenidoSoporte>
      <BloqueContenidoSoporte titulo="¿Cuáles son los atributos requeridos en el nodo impuestos de un CFDI?">
        <TablaSoporte columnas={columnasAtributos} filas={filasImpuestos} />
      </BloqueContenidoSoporte>
    </LayoutDocumentacionSoporte>
  );
}
