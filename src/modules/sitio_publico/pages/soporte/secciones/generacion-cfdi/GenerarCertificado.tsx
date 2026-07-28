/* eslint-disable no-irregular-whitespace */
import { BloqueCodigoSoporte } from "../../components/BloqueCodigoSoporte";
import { BloqueContenidoSoporte } from "../../components/BloqueContenidoSoporte";
import { ContactoDudasSoporte } from "../../components/ContactoDudasSoporte";
import { LayoutDocumentacionPublica } from "../../../../components/LayoutDocumentacionPublica";
import { imagenDudasMaterialApoyo, menuMaterialApoyo } from "./constantes";
import {
  certificadoAtributo,
  certificadoPem,
  comandoCertificado,
  comandoNoCertificado,
  numeroCertificado,
  salidaNoCertificado,
} from "./ejemplos";

export function GenerarCertificado() {
  return (
    <LayoutDocumentacionPublica categoria="Material de apoyo" titulo="Generar Certificado" menu={menuMaterialApoyo} activo="/generar-certificado/">
      <BloqueContenidoSoporte titulo="¿Qué es el Certificado de Sello Digital (CSD)?">
        <p>Archivo digital otorgado por el Servicio de Administración Tributaria (SAT) para el uso específico de la generación de CFDI’s. El CSD se encuntra compuesto por los siguientes elementos:</p>
        <ul>
          <li>Clave publica: representada en un formato binario que contiene la información del Emisor, este puede distribuirse libremente para efectos de intercambio seguro de información y para ofrecer pruebas de auditoria y se obtiene en un archivo con extensión de tipo “.cer“</li>
          <li>Clave privada: información que esta expresada en una estructura de datos que contiene un modulo y un exponente; esta se conserva secreta y se obtiene en un archivo con extensión de tipo “.key“</li>
          <li>Contraseña: para proteger la clave privada</li>
        </ul>
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="¿Qué es el atributo certificado?">
        <p>El atributo certificado contiene la información del emisor correspondiente al .cer del CSD, dicho contenido debe de estar en texto en formato Base64 para posteriormente ser colocado en el comprobante.</p>
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="¿Cómo generar el atributo certificado?">
        <p>Para poder extraer el certificado en formato Base64, utilizaremos el proceso de convertir el certificado con extensión .cer a PEM con los comandos de OpenSSL, como se muestra a continuación:</p>
        <BloqueCodigoSoporte codigo={comandoCertificado} />
      </BloqueContenidoSoporte>

      <ContactoDudasSoporte imagen={imagenDudasMaterialApoyo} />

      <BloqueContenidoSoporte>
        <p>Dentro del archivo con terminación .cer.pem, encontraremos el contenido que se muestra a continuación y en el cual dicho resultado es el que colocaremos en el atributo <strong>Certificado</strong> del comprobante.</p>
        <p>Es importante mencionar que las etiquetas de inicio y final <strong>NO</strong> deben ser colocadas dentro del comprobante.</p>
        <BloqueCodigoSoporte codigo={certificadoPem} />
        <p>En el comprobante se colocara el atributo certificado de la siguiente forma</p>
        <BloqueCodigoSoporte codigo={certificadoAtributo} />
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="¿Qué es el atributo NoCertificado?">
        <p>Es el número que identifica al Certificado de Sello Digital (CSD) del emisor, este atributo es requerido para expresar el número del certificado de sello digital que ampara al comprobante fiscal, de acuerdo con el acuse correspondiente a 20 posiciones otorgado por el sistema del SAT.</p>
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="¿Cómo generar el atributo NoCertificado?">
        <p>Para poder obtener el número de certificado, es importante contar con el <strong>.cer</strong> del “Certificado de Sello Digital”.</p>
        <p>A continuación se muestra el ejemplo de cómo extraer el NoCertificado con los comandos de OpennSSL.</p>
        <BloqueCodigoSoporte codigo={comandoNoCertificado} />
        <p>Ejemplo Output:</p>
        <BloqueCodigoSoporte codigo={comandoNoCertificado} />
        <p>El valor obtenido con la ejecución del comando de OpenSSL, corresponde al número de serie del certificado expresado en hexadecimal, para agregarlo al atributo NoCertificado en el XML es necesario representarlo a 20 posiciones de acuerdo al acuse otorgado por el sistema del SAT, para obtener esto solo es necesario tomar los valores par de la cadena obtenida en la ejecución del comando de OpenSSL.</p>
        <p>En el siguiente ejemplo se muestra con espacios entre los pares para poder visualizar fácilmente los pasos a seguir:</p>
        <BloqueCodigoSoporte codigo={salidaNoCertificado} />
        <p>En el siguiente ejemplo muestra el resultado del Nocertificado</p>
        <BloqueCodigoSoporte codigo={numeroCertificado} />
      </BloqueContenidoSoporte>
    </LayoutDocumentacionPublica>
  );
}
