import { Link, Typography } from "@mui/material";
import { BloqueCodigoSoporte } from "../../components/BloqueCodigoSoporte";
import { BloqueContenidoSoporte } from "../../components/BloqueContenidoSoporte";
import { ContactoDudasSoporte } from "../../components/ContactoDudasSoporte";
import { LayoutDocumentacionPublica } from "../../../../components/LayoutDocumentacionPublica";
import { TablaSoporte } from "../../components/TablaSoporte";
import {
  erroresPeticionReferencia,
  imagenesDudasTimbrar,
  matricesSatCfdi33,
  menuTimbrar,
  parametrosPeticionReferencia,
  parametrosRespuestaXml,
} from "./constantes";

const ejemploPeticionReferencia = `<soapenv:Envelope
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xmlns:xsd="http://www.w3.org/2001/XMLSchema"
  xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
  xmlns:urn="urn:WashOut">
  <soapenv:Header/>
  <soapenv:Body>
    <urn:timbrar_cfdi_referencia soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
      <username xsi:type="xsd:string">AAA010101000</username>
      <password xsi:type="xsd:string">h6584D56fVdBbSmmnB</password>
      <sxml xsi:type="xsd:string">COMPROBANTE_EN_BASE64</sxml>
      <external_id xsi:type="xsd:string">252510</external_id>
    </urn:timbrar_cfdi_referencia>
  </soapenv:Body>
</soapenv:Envelope>`;

const ejemploRespuestaReferencia = `<soap:Envelope
  xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
  xmlns:xsd="http://www.w3.org/2001/XMLSchema"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xmlns:tns="urn:WashOut">
  <soap:Body>
    <tns:timbrar_cfdi_referencia_response>
      <timbrar_cfdi_referencia_result xsi:type="tns:timbrar_cfdi_result">
        <xml xsi:type="xsd:string">
          <![CDATA[
            <cfdi:Comprobante Version="3.3" Total="1751.60">
              <cfdi:Complemento>
                <tfd:TimbreFiscalDigital UUID="C8C1DAB5-B652-4E67-991B-7E085C1F7849" />
              </cfdi:Complemento>
            </cfdi:Comprobante>
          ]]>
        </xml>
      </timbrar_cfdi_referencia_result>
    </tns:timbrar_cfdi_referencia_response>
  </soap:Body>
</soap:Envelope>`;

export function TimbrarRefencia() {
  return (
    <LayoutDocumentacionPublica
      categoria="Timbrar"
      titulo="Método Timbrar CFDI"
      menu={menuTimbrar}
      activo="/timbrar-referencia"
    >
      <BloqueContenidoSoporte titulo="Referencia Enlaces al servicio">
        <p>
          Pruebas:{" "}
          <a href="https://staging.ws.timbox.com.mx/timbrado_cfdi33/wsdl">
            https://staging.ws.timbox.com.mx/timbrado_cfdi33/wsdl
          </a>
        </p>
        <p>
          Producción:{" "}
          <a href="https://sistema.timbox.com.mx/timbrado_cfdi33/wsdl">
            https://sistema.timbox.com.mx/timbrado_cfdi33/wsdl
          </a>
        </p>
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Consumo de créditos">
        <p>Por cada petición de timbrado exitoso: 1 crédito.</p>
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Petición al servicio">
        <p>
          El método <strong>timbrar_cfdi_referencia</strong> timbra un comprobante usando un identificador externo del
          sistema integrador. Ese identificador permite relacionar el comprobante con registros propios para seguimiento
          o recuperación posterior.
        </p>
        <p>
          Se requiere usuario, contraseña, XML en base64 y el parámetro <strong>external_id</strong>. El identificador
          acepta hasta 30 caracteres numéricos.
        </p>
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Parámetros de la petición">
        <TablaSoporte columnas={["Nombre", "Descripción", "Requerido"]} filas={parametrosPeticionReferencia} />
      </BloqueContenidoSoporte>

      <ContactoDudasSoporte imagen={imagenesDudasTimbrar.uno} />

      <BloqueContenidoSoporte titulo="Ejemplo de petición al servicio">
        <BloqueCodigoSoporte codigo={ejemploPeticionReferencia} />
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Respuesta del servicio">
        <p>
          La respuesta se encuentra en el nodo <strong>timbrar_cfdi_referencia_response</strong>. Cuando el comprobante
          pasa validaciones, se devuelve el XML timbrado; en caso contrario se entrega un código y mensaje de rechazo.
        </p>
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Parámetros de respuesta">
        <TablaSoporte columnas={["Nombre", "Descripción"]} filas={parametrosRespuestaXml} />
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Ejemplo de respuesta del servicio">
        <BloqueCodigoSoporte codigo={ejemploRespuestaReferencia} />
      </BloqueContenidoSoporte>

      <ContactoDudasSoporte imagen={imagenesDudasTimbrar.dos} />

      <BloqueContenidoSoporte titulo="Códigos de error nivel petición">
        <TablaSoporte columnas={["Código", "Descripción"]} filas={erroresPeticionReferencia} />
      </BloqueContenidoSoporte>

      <ContactoDudasSoporte imagen={imagenesDudasTimbrar.tres} />

      <BloqueContenidoSoporte titulo="Matrices de error del SAT">
        <Typography sx={{ mb: 2, fontFamily: "var(--fuente-ligera)", fontSize: { xs: 18, md: 21 } }}>
          Estas matrices ayudan a revisar validaciones de CFDI 3.3 y complementos compatibles.
        </Typography>
        <TablaSoporte
          columnas={["Código", "Descripción", "Descarga"]}
          filas={matricesSatCfdi33.map(([codigo, descripcion, texto, href]) => [
            codigo,
            descripcion,
            <Link href={href}>{texto}</Link>,
          ])}
        />
      </BloqueContenidoSoporte>

      <ContactoDudasSoporte imagen={imagenesDudasTimbrar.cuatro} />
    </LayoutDocumentacionPublica>
  );
}
