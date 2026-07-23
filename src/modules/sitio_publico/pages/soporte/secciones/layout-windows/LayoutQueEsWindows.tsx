/* eslint-disable no-irregular-whitespace */
import { BloqueContenidoSoporte } from "../../components/BloqueContenidoSoporte";
import { LayoutDocumentacionSoporte } from "../../components/LayoutDocumentacionSoporte";
import { categoriaLayoutWindows, obtenerMenuLayoutWindows } from "./constantes";

export function LayoutQueEsWindows() {
  return (
    <LayoutDocumentacionSoporte
      categoria={categoriaLayoutWindows}
      titulo="Layout ¿Qué es?"
      menu={obtenerMenuLayoutWindows("/layout-que-es-windows/")}
      activo="/layout-que-es-windows/"
    >
      <BloqueContenidoSoporte titulo="¿Qué es el Servicio de Layout de Timbox?">
        <p>Es un servicio que genera y sella los XML’s desde una aplicación de Windows, diseñado para aquellos sistemas que no tienen integrado el proceso de construcción y sellado de comprobantes fiscales digitales a través de internet (CFDI) y que buscan consumir un servicio de timbrado de manera practica. Timbox desarrollo este servicio basado en archivos de texto como entrada de datos y que una vez procesados deposita el comprobante timbrado en formato XML con su correspondiente PDF.</p>
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="¿Cómo funciona el servicio?">
        <p>Está basado en plantillas de texto con una estructura definida que son comúnmente llamados “Layout” y que de manera fácil se puede generar desde un sistema, depositando estos archivos en un contenedor llamado (<strong>Procesar</strong>) donde el servicio consumirá esta información para generar el XML, sellarlo y posteriormente anexarle el Timbre Fiscal Digital. Si el comprobante no presento errores eliminara el archivo TXT y depositara el XML timbrado en el contenedor de CFDIS (<strong>Timbrados</strong>), en caso de que el archivo presente errores se moverá al contenedor de (<strong>Errores) </strong>y se agregaran los detalles a un archivo Log por cada día de la semana.</p>
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="¿Qué debemos de considerar para generar un archivo de texto?">
        <ol>
          <li>El archivo de texto debe de estar codificado en UTF-8</li>
          <li>El orden de los nodos deben de ir de acuerdo como se muestran en el Glosario de Nodos (Respetando los requeridos).</li>
          <li>Los nodos marcados de color <span style={{ color: "#ff0000" }}>ROJO</span> son Obligatorios.</li>
          <li> El archivo de texto debe de estar conformado por Etiquetas, <strong>Pipes “|”</strong> y la información de cada atributo.</li>
          <li>No está permitido registrar los Importes con separador de miles y símbolos de moneda.</li>
          <li>Los atributos requeridos no deben de estar vacíos y si el atributo es opcional y no hay información por registrar se debe dejar vacío entre cada pipe, sin agregar espacios, como se muestra a continuación <strong>“||”.</strong></li>
          <li>Los atributos que se encuentran en color <span style={{ color: "#ff0000" }}>ROJO</span> que no pertenecen a un nodo requerido, solo se convierten en requeridos cuando se agrega al archivo el nodo o la etiqueta, por ejemplo, @CFDIRELACION UUID. El nodo CFDI Relacionado no es un nodo obligatorio pero si se incluye el nodo en el archivo, el UUID se tiene que registrar.</li>
        </ol>
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Requerimientos para la implementación del servicio Timbox Layout">
        <ol>
          <li>Tener credenciales activas para poder hacer uso del servicio (implica adquirir un plan de Timbrado).</li>
          <li>CSD vigente del contribuyente emisor (Certificado, llave y password de la llave).</li>
          <li>Archivo TXT que contiene toda la información del comprobante.</li>
          <li>Tener la instalación de TimboxLayout ejecutando en su servidor o PC.</li>
          <li>Windows Server 2008+/Windows Vista o posterior.</li>
        </ol>
      </BloqueContenidoSoporte>
    </LayoutDocumentacionSoporte>
  );
}

