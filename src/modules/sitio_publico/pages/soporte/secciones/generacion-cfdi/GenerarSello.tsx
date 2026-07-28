/* eslint-disable no-irregular-whitespace */
import { BloqueCodigoSoporte } from "../../components/BloqueCodigoSoporte";
import { BloqueContenidoSoporte } from "../../components/BloqueContenidoSoporte";
import { ContactoDudasSoporte } from "../../components/ContactoDudasSoporte";
import { LayoutDocumentacionPublica } from "../../../../components/LayoutDocumentacionPublica";
import { imagenDudasMaterialApoyo, menuMaterialApoyo } from "./constantes";
import {
  cadenaOriginal33,
  cadenaOriginal40,
  comandosSello33,
  comandosSello40,
  sello33,
  sello40,
} from "./ejemplos";

type EjemploSelloProps = {
  version: "3.3" | "4.0";
};

function EjemploSello({ version }: EjemploSelloProps) {
  const es33 = version === "3.3";
  const cadena = es33 ? cadenaOriginal33 : cadenaOriginal40;
  const comandos = es33 ? comandosSello33 : comandosSello40;
  const sello = es33 ? sello33 : sello40;
  const xslt = es33
    ? "http://www.sat.gob.mx/sitio_internet/cfd/3/cadenaoriginal_3_3/cadenaoriginal_3_3.xslt"
    : "http://www.sat.gob.mx/sitio_internet/cfd/4/cadenaoriginal_4_0/cadenaoriginal_4_0.xslt";

  return (
    <>
      <BloqueContenidoSoporte titulo={`¿Cómo generar la cadena original para CFDI ${version}?`}>
        <p>Para poder extraer la cadena original de un XML (CFDI) es necesario hacer uso de un lenguaje de transformación de documentos como lo es el XSLT, en este caso nos permite obtener/trasnsformar la información contenida en el XML a una cadena de texto, con la secuencia de datos y lineamientos que la plantilla de Secuencia de CadenaOriginal (XSLT) del SAT especifica.</p>
        <p>Secuencia de CadenaOriginal (XSLT){es33 ? " " : "\u00a0"}<a href={xslt}>{xslt}</a></p>
        <p>Los elementos que debemos de considerar para la extracción de la cadena original son los siguientes:</p>
        <ul>
          <li>XML del CFDI a sellar.</li>
          <li><a href="http://omawww.sat.gob.mx/sitio_internet/cfd/3/cadenaoriginal_3_3/cadenaoriginal_3_3.xslt">Secuencia de Cadena Original (XSLT).</a></li>
          <li><a href="http://xslttest.appspot.com/">XSLT Test Tool </a>(Herramienta para poder extraer la cadena original).</li>
        </ul>
        <p>Para poder utilizar la herramienta XSLT, solo es necesario copiar y pegar el contenido del XML, en el recuadro donde lo indique y en el segundo cuadro se estará agregando el contenido del XSLT es decir secuencia de la cadena original.</p>
        <p><strong>Es importante mencionar que la cadena original se debe de extraer la misma cantidad de veces que dicho comprobante de CFDI sufra algún cambio.</strong></p>
        <p>El resultado de la extracción de la cadena original es el siguiente, el cual estaremos guardando en un archivo, en este paso para efecto del ejemplo le pondremos como nombre “Cadena_original.txt”:</p>
        <BloqueCodigoSoporte codigo={cadena} />
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo={`¿Cómo generar el sello para CFDI ${version}?`}>
        <p>Para la generación del sello digital de los comprobantes CFDI’s tal como lo especifica el anexo 20 en el inciso I Sección B. Los algoritmos a utilizar son los siguientes:</p>
        <ul>
          <li>SHA-2 o SHA-256, para el sellado del Comprobante Fiscal Digital a través de Internet.</li>
          <li>SHA-1, para sellar el Comprobante Fiscal Digital a través de Internet que ampara Retenciones e Información de Pagos.</li>
        </ul>
        <p>A continuación les mostraremos una serie de pasos que necesitamos hacer primero para poder obtener la digestión, utilizando los comandos de <a href="https://www.openssl.org/">OpenSSL.</a></p>
        <p>Paso 1.- Contar con el certificado convertido en formato PEM.</p>
        <BloqueCodigoSoporte codigo={comandos.certificado} />
        <p>Paso 2.-Contar con la llave convertida a PEM.</p>
        <BloqueCodigoSoporte codigo={comandos.llave} />
        <p>Paso 3.- Generar la Digestión o Hash</p>
        <BloqueCodigoSoporte codigo={comandos.digest} />
        <p>Paso 4.- Creación del archivo PEM de la llave privada</p>
        <BloqueCodigoSoporte codigo={comandos.sello} />
        <p>Ejemplo de la Generación del Sello</p>
        <BloqueCodigoSoporte codigo={sello} />
      </BloqueContenidoSoporte>
    </>
  );
}

export function GenerarSello() {
  return (
    <LayoutDocumentacionPublica categoria="Material de apoyo" titulo="Generar Sello" menu={menuMaterialApoyo} activo="/generar-sello/">
      <BloqueContenidoSoporte titulo="¿Qué es el sello?">
        <p>El sello es el resultado de la firma de la cadena original obtenida del Comprobante Fiscal Digital por Internet en base64. El propósito del sello es emitir comprobantes y acreditar al creador del comprobante fiscal digital con autenticidad, integridad, verificables y no repudiables por el emisor. Para poder generar el sello es necesario tener el resultado de la cadena original que es obtenido del xml del comprobante a sellar, también es necesario los certificados de sello digital (.cer y .key) convertidos a “pem”.</p>
        <p>El sello contiene la información del emisor e información del comprobante codificada, que si dicho comprobante por algún motivo sufre cambios y no se vuelve a generar un sello nuevo, nos arrojará error al tratar de realizar el timbrado.</p>
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="¿Qué se necesita para generar el sello?">
        <p>Para poder generar el sello es necesario contar con los siguientes elementos:</p>
        <ul>
          <li>Cadena Original del XML a sellar.</li>
          <li>Certificado de Sello Digital en formato PEM y su correspondiente llave privada tambien en formato PEM.</li>
          <li>Algoritmos de criptografía para la generación de la Digestión o Hash.</li>
          <li>Utilerias o funciones de criptografia (por  ej. OpenSSL)</li>
        </ul>
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="¿Qué es la cadena original?">
        <p>Se entiende como cadena original, a la secuencia de datos formada con la información contenida dentro del comprobante, establecida en el Rubro I.A. del <a href="http://omawww.sat.gob.mx/sitio_internet/cfd/3/cadenaoriginal_3_3/cadenaoriginal_3_3.xslt">Anexo 20 Estándar.</a></p>
        <p>Es importante mencionar que la secuencia de formación siempre se registra en el órdenes que se expresa en el apartado correspondiente a cada uno de los comprobantes fiscales, complementos y del timbre fiscal digital del SAT, tomando en cuenta las reglas generales que se muestran a continuación:</p>
      </BloqueContenidoSoporte>

      <ContactoDudasSoporte imagen={imagenDudasMaterialApoyo} />

      <BloqueContenidoSoporte titulo="¿Reglas generales para generar la cadena original?">
        <ul>
          <li>Al inicio y al finalizar la cadena original se encuentra marcado mediante una secuencia de caracteres <strong>||</strong> (doble pleca).</li>
          <li>Se debe de expresar únicamente la información del dato sin expresar el atributo al que hace referencia. Es decir, si el valor de un campo es “A” y el nombre del campo es “Concepto”, sólo se expresa |A| y nunca |Concepto A|.</li>
          <li>Cada dato individual se debe separar de su dato subsiguiente, en caso de existir, mediante un carácter <strong>|</strong> (pleca sencilla).</li>
          <li>Los espacios en blanco que se presenten dentro de la cadena original son tratados de la siguiente manera:
            <ul>
              <li>Se deben de reemplazar todos los tabuladores, retornos de carro y saltos de línea por el carácter espacio (ASCII 32).</li>
              <li>Acto seguido se elimina cualquier espacio al principio y al final de cada separador <strong>|</strong> (pleca).</li>
              <li>Finalmente, toda secuencia de caracteres en blanco se sustituye por un único carácter espacio (ASCII 32).</li>
            </ul>
          </li>
          <li>Los datos opcionales no expresados, no aparecen en la cadena original y no tienen delimitador alguno.</li>
          <li> Toda la cadena original se expresa en el formato de codificación UTF-8.</li>
          <li>El nodo o nodos adicionales se integra a la cadena original como se indica en la secuencia de formación en su numeral 10, respetando la secuencia de formación y número de orden del ComplementoConcepto.</li>
          <li>El nodo o nodos adicionales se integra al final de la cadena original respetando la secuencia de la formación para cada complemento y número de orden del Complemento</li>
        </ul>
      </BloqueContenidoSoporte>

      <EjemploSello version="3.3" />
      <EjemploSello version="4.0" />
    </LayoutDocumentacionPublica>
  );
}
