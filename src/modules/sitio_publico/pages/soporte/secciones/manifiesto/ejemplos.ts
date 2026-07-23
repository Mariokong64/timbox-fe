import { certificadoManifiesto, firmaManifiesto, llaveManifiesto } from "./constantes";

export const ejemploPeticionManifiesto = `<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:WashOut">
   <soapenv:Header/>
   <soapenv:Body>
      <urn:firmar_manifiesto soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
         <username xsi:type="xsd:string">AAA010101000</username>
         <password xsi:type="xsd:string">h6584D56fVdBbSmmnB</password>
         <rfc xsi:type="xsd:string">EKU9003173C9</rfc>
         <razon_social xsi:type="xsd:string">ACCEM SERVICIOS EMPRESARIALES SC</razon_social>
         <email xsi:type="xsd:string">contacto@timbox.com.mx</email>
         <cert_pem xsi:type="xsd:string">-----BEGIN CERTIFICATE-----
${certificadoManifiesto}
-----END CERTIFICATE----</cert_pem>
         <llave_pem xsi:type="xsd:string">-----BEGIN PRIVATE KEY-----
${llaveManifiesto}
-----END PRIVATE KEY-----</llave_pem>
      </urn:firmar_manifiesto>
   </soapenv:Body>
</soapenv:Envelope>`;

export const ejemploRespuestaManifiesto = `<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:tns="urn:WashOut">
   <soap:Body>
      <tns:firmar_manifiesto_response>
         <firma_manifiesto_result xsi:type="tns:firma_manifiesto_result">
            <code xsi:type="xsd:string">200</code>
            <message xsi:type="xsd:string">Manifiesto firmado y enviado exitosamente</message>
            <manifiesto xsi:type="tns:manifiesto">
               <encabezado xsi:type="tns:encabezado">
                  <rfc xsi:type="xsd:string">EKU9003173C9</rfc>
                  <fecha xsi:type="xsd:string">2019-09-10T13:57:53</fecha>
                  <asunto xsi:type="xsd:string">Manifiesto de conocimiento y autorización al PAC la entrega de los CFDI certificados al SAT</asunto>
               </encabezado>
               <contenido xsi:type="xsd:string"><![CDATA[Por medio del presente, <b>ACCEM SERVICIOS EMPRESARIALES SC</b>, con RFC <b>EKU9003173C9</b>, manifiesto mi conformidad y autorización para que la empresa IT & SW Development Solutions de México S. de R.L. de C.V. con RFC <b>IAD121214B34</b>, Proveedor Autorizado de Certificación debidamente acreditado y con número de autorización <b>0184</b>, proceda a entregar al Servicio de Administración Tributaria (SAT), copia de los comprobantes fiscales que me haya certificado, de acuerdo a lo establecido en la regla 2.7.2.7 de la Resolución Miscelánea Fiscal para el 2019, publicada en el Diario Oficial de la Federación el 22 de abril del 2019. Al mismo tiempo acepto que IT & SW Development Solutions de México S. de R.L. de C.V. sea quien me proporcione a mi nombre o al de mi representada, el Servicio de Certificación para todos los Comprobantes Fiscales Digitales por Internet (CFDI) que emita como persona física o como persona moral, que consiste en lo siguiente:
\u00a0
a) La validación de los requisitos del artículo 29-A del CFF;
b) La asignación de folios;
c) La incorporación del sello digital del SAT]]></contenido>
               <firma xsi:type="xsd:string">${firmaManifiesto}</firma>
               <cadena_original xsi:type="xsd:string">||ACCEM SERVICIOS EMPRESARIALES SC|EKU9003173C9|30001000000400002417|2019-09-10T13:57:53|IAD121214B34|0184||</cadena_original>
               <certificado xsi:type="tns:certificado">
                  <emito_a xsi:type="xsd:string">ESCUELA KEMPER URGATE SA DE CV</emito_a>
                  <emito_por xsi:type="xsd:string">SERVICIO DE ADMINISTRACION TRIBUTARIA</emito_por>
                  <no_serie xsi:type="xsd:string">30001000000400002417</no_serie>
                  <validez xsi:type="xsd:string">Desde 2019-06-14 21:05:15 Hasta 2023-06-13 21:05:15</validez>
               </certificado>
            </manifiesto>
         </firma_manifiesto_result>
      </tns:firmar_manifiesto_response>
   </soap:Body>
</soap:Envelope>`;

export const ejemploPeticionManifiestoSello = `<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:WashOut">
   <soapenv:Header/>
   <soapenv:Body>
      <urn:firmar_manifiesto_sello soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
         <username xsi:type="xsd:string">AAA010101000</username>
         <password xsi:type="xsd:string">h6584D56fVdBbSmmnB</password>
         <email xsi:type="xsd:string">contacto@timbox.com.mx</email>
         <cadena xsi:type="xsd:string">||ACCEM SERVICIOS EMPRESARIALES SC|EKU9003173C9|30001000000400002417|2019-09-10T13:57:53|IAD121214B34|0184||</cadena>
         <sello xsi:type="xsd:string">${firmaManifiesto}</sello>
         <certificado xsi:type="xsd:string">-----BEGIN CERTIFICATE-----
${certificadoManifiesto}
-----END CERTIFICATE----</certificado>
      </urn:firmar_manifiesto_sello>
   </soapenv:Body>
</soapenv:Envelope>`;

export const ejemploRespuestaManifiestoSello = `<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:tns="urn:WashOut">
   <soap:Body>
      <tns:firmar_manifiesto_sello_response>
         <firmar_manifiesto_sello_result xsi:type="tns:firmar_manifiesto_sello_result">
            <code xsi:type="xsd:string">200</code>
            <message xsi:type="xsd:string">Manifiesto firmado y enviado exitosamente</message>
            <manifiesto_sello xsi:type="tns:manifiesto_sello">
               <encabezado_firma xsi:type="tns:encabezado_firma">
                  <rfc xsi:nil="true"/>
                  <fecha xsi:type="xsd:string">2019-09-10T13:59:48</fecha>
                  <asunto xsi:type="xsd:string">Manifiesto de conocimiento y autorización al PAC la entrega de los CFDI certificados al SAT</asunto>
               </encabezado_firma>
               <contenido xsi:type="xsd:string"><![CDATA[Por medio del presente, <b>ACCEM SERVICIOS EMPRESARIALES SC</b>, con RFC <b>EKU9003173C9</b>, manifiesto mi conformidad y autorización para que la empresa IT & SW Development Solutions de México S. de R.L. de C.V. con RFC <b>IAD121214B34</b>, Proveedor Autorizado de Certificación debidamente acreditado y con número de autorización <b>0184</b>, proceda a entregar al Servicio de Administración Tributaria (SAT), copia de los comprobantes fiscales que me haya certificado, de acuerdo a lo establecido en la regla 2.7.2.7 de la Resolución Miscelánea Fiscal para el 2019, publicada en el Diario Oficial de la Federación el 22 de abril del 2019. Al mismo tiempo acepto que IT & SW Development Solutions de México S. de R.L. de C.V. sea quien me proporcione a mi nombre o al de mi representada, el Servicio de Certificación para todos los Comprobantes Fiscales Digitales por Internet (CFDI) que emita como persona física o como persona moral, que consiste en lo siguiente:

a) La validación de los requisitos del artículo 29-A del CFF;
b) La asignación de folios;
c) La incorporación del sello digital del SAT]]></contenido>
               <firma xsi:type="xsd:string">${firmaManifiesto}</firma>
               <cadena_original xsi:type="xsd:string">||ACCEM SERVICIOS EMPRESARIALES SC|EKU9003173C9|30001000000400002417|2019-09-10T13:57:53|IAD121214B34|0184||</cadena_original>
               <certificado_firma xsi:type="tns:certificado_firma">
                  <emito_a xsi:type="xsd:string">ESCUELA KEMPER URGATE SA DE CV</emito_a>
                  <emito_por xsi:type="xsd:string">SERVICIO DE ADMINISTRACION TRIBUTARIA</emito_por>
                  <no_serie xsi:type="xsd:string">30001000000400002417</no_serie>
                  <validez xsi:type="xsd:string">Desde 2019-06-14 21:05:15 Hasta 2023-06-13 21:05:15</validez>
               </certificado_firma>
            </manifiesto_sello>
         </firmar_manifiesto_sello_result>
      </tns:firmar_manifiesto_sello_response>
   </soap:Body>
</soap:Envelope>
`;
