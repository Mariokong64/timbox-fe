import { Link, Typography } from "@mui/material";
import { imagenesDudasTimbrar, menuTimbrar } from "./constantes";
import { BloqueCodigoSoporte } from "../../components/BloqueCodigoSoporte";
import { BloqueContenidoSoporte } from "../../components/BloqueContenidoSoporte";
import { ContactoDudasSoporte } from "../../components/ContactoDudasSoporte";
import { LayoutDocumentacionPublica } from "../../../../components/LayoutDocumentacionPublica";
import { TablaSoporte } from "../../components/TablaSoporte";

const ejemploPeticion = `<soapenv:Envelope
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xmlns:xsd="http://www.w3.org/2001/XMLSchema"
  xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
  xmlns:urn="urn:WashOut">
  <soapenv:Header/>
  <soapenv:Body>
    <urn:timbrar_cfdi soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
      <username xsi:type="xsd:string">AAA010101000</username>
      <password xsi:type="xsd:string">h6584D56fVdBbSmmnB</password>
      <sxml xsi:type="xsd:string">PD94bWwg...XML_EN_BASE64...</sxml>
    </urn:timbrar_cfdi>
  </soapenv:Body>
</soapenv:Envelope>`;

const ejemploRespuesta = `<soap:Envelope
  xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
  xmlns:xsd="http://www.w3.org/2001/XMLSchema"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xmlns:tns="urn:WashOut">
  <soap:Body>
    <tns:timbrar_cfdi_response>
      <timbrar_cfdi_result xsi:type="tns:timbrar_cfdi_result">
        <xml xsi:type="xsd:string">
          <![CDATA[
            <cfdi:Comprobante Version="3.3" Total="1751.60">
              <cfdi:Emisor Rfc="MISC491214B86" Nombre="CECILIA MIRANDA SANCHEZ" />
              <cfdi:Receptor Rfc="IAD121214B34" Nombre="IT SW Development Solutions de Mexico S de RL de CV" />
              <cfdi:Complemento>
                <tfd:TimbreFiscalDigital UUID="C8C1DAB5-B652-4E67-991B-7E085C1F7849" />
              </cfdi:Complemento>
            </cfdi:Comprobante>
          ]]>
        </xml>
      </timbrar_cfdi_result>
    </tns:timbrar_cfdi_response>
  </soap:Body>
</soap:Envelope>`;

export function TimbrarCfdi() {
  return (
    <LayoutDocumentacionPublica
      categoria="Timbrar"
      titulo="Método Timbrar CFDI"
      menu={menuTimbrar}
      activo="/timbrar-cfdi"
    >
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

      <BloqueContenidoSoporte titulo="Consumo de créditos">
        <p>Por cada petición de timbrado exitoso: 1 crédito.</p>
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Petición al servicio">
        <p>
          El servicio de <strong>timbrar_cfdi</strong> se utiliza para realizar el timbrado de un comprobante. Si el
          comprobante es válido, se timbra con éxito. Es requerido el usuario y contraseña para utilizar el servicio.
        </p>
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Parámetros de la petición">
        <TablaSoporte
          columnas={["Nombre", "Descripción", "Requerido"]}
          filas={[
            ["username", "Usuario del web service", "Sí"],
            ["password", "Contraseña del web service", "Sí"],
            ["sxml", "XML del comprobante convertido a una cadena en base64.", "Sí"],
          ]}
        />
      </BloqueContenidoSoporte>

      <ContactoDudasSoporte imagen={imagenesDudasTimbrar.uno} />

      <BloqueContenidoSoporte titulo="Ejemplo de petición al servicio">
        <BloqueCodigoSoporte codigo={ejemploPeticion} />
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Respuesta del servicio">
        <p>
          La respuesta se encuentra en el nodo <strong>timbrar_cfdi_response</strong>. Cuando el comprobante pasa las
          validaciones correspondientes, se devuelve el XML con el timbre fiscal digital. En caso contrario, el servicio
          regresa un código y un mensaje que describen el motivo de rechazo.
        </p>
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Parámetros de respuesta">
        <TablaSoporte
          columnas={["Nombre", "Descripción"]}
          filas={[["xml", "Campo que contiene el comprobante con el nodo TFD (Timbre Fiscal Digital)."]]}
        />
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Ejemplo de respuesta del servicio">
        <BloqueCodigoSoporte codigo={ejemploRespuesta} />
      </BloqueContenidoSoporte>

      <ContactoDudasSoporte imagen={imagenesDudasTimbrar.dos} />

      <BloqueContenidoSoporte titulo="Códigos de error nivel petición">
        <TablaSoporte
          columnas={["Código", "Descripción"]}
          filas={[
            ["101", "Los datos de autentificación enviados son incorrectos."],
            ["102", "Su plan ha caducado, favor de contratar un nuevo plan."],
            ["103", "Se han agotado la cantidad de timbres, favor de contratar un nuevo plan."],
            ["104", "El valor del parámetro external_id no es válido. Error exclusivo del método timbrar_cfdi_referencia."],
            ["200", "Resultado exitoso."],
            ["111", "Por el momento solo se acepta 1 comprobante en el ZIP. Error exclusivo del método timbrar_zip."],
            ["112", "Archivo ZIP corrupto, no se pudieron recuperar los comprobantes. Error exclusivo del método timbrar_zip."],
            ["301", "El XML recibido no contiene una estructura válida."],
            ["302", "El parámetro sxml no contiene información."],
          ]}
        />
      </BloqueContenidoSoporte>

      <ContactoDudasSoporte imagen={imagenesDudasTimbrar.tres} />

      <BloqueContenidoSoporte titulo="Matrices de error del SAT">
        <Typography sx={{ mb: 2, fontFamily: "var(--fuente-ligera)", fontSize: { xs: 18, md: 21 } }}>
          Estas matrices ayudan a identificar validaciones del SAT relacionadas con CFDI y complementos.
        </Typography>
        <TablaSoporte
          columnas={["Código", "Descripción", "Descarga"]}
          filas={[
            [
              "CFDI33101 - CFDI33196",
              "Matriz de validaciones para el Comprobante Fiscal Digital por Internet versión 3.3.",
              <Link href="http://omawww.sat.gob.mx/tramitesyservicios/Paginas/anexo_20_version3-3.htm">CFDI</Link>,
            ],
            [
              "CCE145 - CCE218",
              "Matriz de validaciones para complemento Comercio Exterior 1.1.",
              <Link href="https://www.sat.gob.mx/consultas/61165/comprobante-de-comercio-exterior">Comercio Exterior</Link>,
            ],
            [
              "ECC121 - ECC125",
              "Matriz de validaciones para complemento Estado de Cuenta de Combustibles de Monederos Electrónicos 1.2.",
              <Link href="https://www.sat.gob.mx/consulta/21885/genera-tus-facturas-electronicas-con-el-complemento-para-el-estado-de-cuenta-de-combustibles-para-monederos-electronicos">
                Estado de cuenta de combustibles
              </Link>,
            ],
            [
              "GCEH101 - GCEH133",
              "Matriz de validaciones para complemento de Gastos del Consorcio derivados de la Ejecución de un Contrato de Exploración o Extracción de Hidrocarburos 1.0.",
              <Link href="https://www.sat.gob.mx/consulta/50282/conoce-los-complementos-para-consorcios-en-materia-de-hidrocarburos">
                Gastos - Hidrocarburos
              </Link>,
            ],
            [
              "IEEH101 - IEEH105",
              "Matriz de validaciones para complemento de Ingresos atribuibles a los Integrantes de un Consorcio.",
              <Link href="https://www.sat.gob.mx/consulta/50282/conoce-los-complementos-para-consorcios-en-materia-de-hidrocarburos">
                Ingresos - Hidrocarburos
              </Link>,
            ],
            [
              "INE180 - INE188",
              "Matriz de validaciones para el CFDI versión 3.3 con complemento INE 1.1.",
              <Link href="https://www.sat.gob.mx/consulta/09695/genera-tus-facturas-con-el-complemento-del-ine-version-1.1">INE</Link>,
            ],
            [
              "NOM132 - NOM225",
              "Matriz de validaciones para complemento Nómina 1.2.",
              <Link href="http://omawww.sat.gob.mx/tramitesyservicios/Paginas/complemento_nomina.htm">Nómina</Link>,
            ],
            [
              "CRP101 - CRP239",
              "Matriz de validaciones del Complemento para Recepción de Pagos.",
              <Link href="http://omawww.sat.gob.mx/tramitesyservicios/Paginas/recepcion_de_pagos.htm">Recepción de Pagos</Link>,
            ],
          ]}
        />
      </BloqueContenidoSoporte>

      <ContactoDudasSoporte imagen={imagenesDudasTimbrar.cuatro} />
    </LayoutDocumentacionPublica>
  );
}
