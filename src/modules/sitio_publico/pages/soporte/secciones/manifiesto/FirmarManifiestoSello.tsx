import { Box } from "@mui/material";
import { BloqueCodigoSoporte } from "../../components/BloqueCodigoSoporte";
import { BloqueContenidoSoporte } from "../../components/BloqueContenidoSoporte";
import { ContactoDudasSoporte } from "../../components/ContactoDudasSoporte";
import { LayoutDocumentacionSoporte } from "../../components/LayoutDocumentacionSoporte";
import { TablaSoporte } from "../../components/TablaSoporte";
import { imagenesDudasManifiesto, menuManifiesto, urlManifiesto } from "./constantes";
import { ejemploPeticionManifiestoSello, ejemploRespuestaManifiestoSello } from "./ejemplos";

const detalleCadena = (
  <Box sx={{ "& p": { my: 1 } }}>
    Debe de contener la información requerida para realizar la firma del manifiesto como son:
    <p>•Nombre o Razón Social del Emisor</p>
    <p>•RFC Emisor</p>
    <p>•NoCertificado correspondiente al certificado de la FIEL</p>
    <p>•Fecha en que se esta emitiendo la firma</p>
    <p>•RFC PAC: IAD121214B34</p>
    <p>•NoAutorización: 0184</p>
  </Box>
);

const detalleSello = (
  <Box sx={{ "& p": { my: 1 } }}>
    Corresponde a la digestión de la cadena original y del certificado.
    <p>Para la generación del sello se requiere:</p>
    <p>•Cadena previamente generada.</p>
    <p>•Algoritmo de digestión SHA-1</p>
    <p>•Generar la encripción con la llave FIEL.</p>
    <p>•Resultado de la firma convertido en Base64, como se muestra en el ejemplo.</p>
  </Box>
);

const encabezadoFirma = (
  <Box sx={{ "& p": { my: 1 } }}>
    El encabezado contendrá:
    <p>•RFC del Emisor quien firmó el Manifiesto.</p>
    <p>•Fecha en que fue firmado el Manifiesto.</p>
    <p>•Asunto describe el contenido del documento que se firmo</p>
  </Box>
);

const certificadoFirma = (
  <Box sx={{ "& p": { my: 1 } }}>
    Contiene los datos del Certificado como:
    <p>•emitido_a: Nombre o Razón Social del certificado</p>
    <p>•emitido_por: Indica por quien fue emitido o autorizado el certificado.</p>
    <p>•no_serie: corresponde al número de serie del certidicado.</p>
    <p>•validez: Nos indica el periodo de validez del certificado.</p>
  </Box>
);

const detalleCadenaInvalida = (
  <Box sx={{ "& p": { my: 1 } }}>
    La Cadena es inválida revisar la siguiente estructura:
    <p>||Razón Social|RFC|NoCertificado|Fecha|RFC PAC|No.Autorización||</p>
  </Box>
);

export function FirmarManifiestoSello() {
  return (
    <LayoutDocumentacionSoporte categoria="Manifiesto" titulo="Método Firmar_Manifiesto_Sello" menu={menuManifiesto} activo="/firmar-manifiesto-sello/">
      <BloqueContenidoSoporte titulo="Enlaces al servicio">
        <p>Pruebas: <a href={urlManifiesto.pruebas}>{urlManifiesto.pruebas}</a></p>
        <p>Producción: <a href={urlManifiesto.produccion}>{urlManifiesto.produccion}</a></p>
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Consumo de créditos">
        <p>Por cada petición: <strong>No Aplica</strong></p>
      </BloqueContenidoSoporte>

      <ContactoDudasSoporte imagen={imagenesDudasManifiesto.uno} />

      <BloqueContenidoSoporte titulo="Petición al servicio">
        <p>El servicio de “firmar_manifiesto_sello”, provee la funcionalidad para recibir la firma del manifiesto de conocimiento y autorización de la entrega de comprobantes al SAT, esto en caso de que no se quiera compartir la información de la FIEL (por ser de carácter sensible) y para ello el servicio recibe la información necesaria para comprobar que el contribuyente realizó la firma del Manifiesto con Timbox.</p>
        <p>Se requiere usuario y contraseña para el uso del servicio, los datos del contribuyente y la firma digital.</p>
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Parámetros de la petición">
        <TablaSoporte columnas={["Nombre", "Descripción", "Requerido"]} filas={[
          ["username", "Usuario del web service", "Sí"],
          ["password", "Contraseña del web service", "Sí"],
          ["email", "Correo electrónico del Emisor", "Sí"],
          ["*cadena", detalleCadena, "Sí"],
          ["sello", detalleSello, "Sí"],
          ["certificado", "Contenido del certificado de la FIEL en formato pem", "Sí"],
        ]} />
        <p>*La cadena deberá cumplir con la siguiente estructura:</p>
        <ul>
          <li>El inicio de la cadena será marcado por los caracteres || (doble pleca).</li>
          <li>Los datos que conformen la cadena no deberán contener el carácter | (pleca sencilla) a excepción de los delimitadores de cada campo.</li>
          <li>Cada dato individual se separa por el carácter | (pleca sencilla).</li>
          <li>Toda la cadena se expresa en el formato de codificaciones UTF-8.</li>
          <li>El final de la cadena se expresa mediante los caracteres || (doble pleca).</li>
        </ul>
        <p>Ejemplo: ||ACCEM SERVICIOS EMPRESARIALES SC|EKU9003173C9|30001000000400002417|2019-08-19T18:13:13|IAD121214B34|0184||</p>
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Ejemplo de petición al servicio">
        <BloqueCodigoSoporte codigo={ejemploPeticionManifiestoSello} />
      </BloqueContenidoSoporte>

      <ContactoDudasSoporte imagen={imagenesDudasManifiesto.dos} />

      <BloqueContenidoSoporte titulo="Respuesta del servicio">
        <p>La respuesta del servicio de firmar manifiesto sello la contiene el nodo “firmar_manifiesto_sello_result” y este está formado por 3 nodos principales, code, message y manifiesto, los primeros 2 regresaran siempre que la respuesta sea exitosa un “200” y un mensaje de “Manifiesto firmado y enviado exitosamente” respectivamente. El nodo de manifiesto contiene la información del emisor que firmado el manifiesto, además de la información que contiene el documento de manifiesto y del certificado.</p>
        <p>Es importante colocar correctamente el correo electrónico en la petición, ya que se enviara el manifiesto firmado en formato PDF.</p>
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Parámetros de respuesta">
        <TablaSoporte columnas={["Nombre", "Descripción"]} filas={[
          ["encabezado_firma", encabezadoFirma],
          ["contenido", "Información del contenido del manifiesto."],
          ["firma", "Corresponde a la cadena original y el certificado."],
          ["cadena_original", "Corresponde a la información del nodo contenido."],
          ["certificado_firma", certificadoFirma],
        ]} />
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Ejemplo de respuesta exitosa del servicio">
        <BloqueCodigoSoporte codigo={ejemploRespuestaManifiestoSello} />
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Códigos de error a nivel petición">
        <p>En la siguiente sección se listan los códigos de error que puede regresar el servicio de firmar manifiesto sello a nivel petición:</p>
        <TablaSoporte columnas={["Código", "Descripción"]} filas={[
          ["MAN001", "Los datos de autentificación enviados son incorrectos."],
          ["MAN002", "Su plan ha caducado, favor de contratar un nuevo plan."],
          ["MAN003", "Parámetro Email inválido."],
          ["MAN004", "Parámetro Cadena inválido."],
          ["MAN005", "Parámetro Sello inválido."],
          ["MAN006", "Parámetro Certificado inválido."],
          ["MAN007", detalleCadenaInvalida],
          ["MAN008", "Razón Social dentro de la cadena es muy grande."],
          ["MAN009", "RFC Contribuyente dentro de la cadena es incorrecto."],
          ["MAN010", "NoCertificado dentro de la cadena es incorrecto."],
          ["MAN011", "Fecha dentro de la cadena es incorrecta."],
          ["MAN012", "RFC PAC dentro de la cadena es incorrecto."],
          ["MAN013", "Número de autorización dentro de la cadena es incorrecto."],
          ["MAN014", "NoCertificado de la cadena no corresponde con el certificado."],
          ["MAN015", "El certificado utilizado es un CSD, se requiere el certificado FIEL"],
          ["MAN016", "Resultado de la digestión del sello debe ser igual a la cadena."],
          ["MAN999", "Error de comunicación con el servicio."],
        ]} />
      </BloqueContenidoSoporte>
    </LayoutDocumentacionSoporte>
  );
}
